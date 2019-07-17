import axios from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useGlobal } from 'reactn'

/*

Interceptor adds useful handlers to axios requests and responses.

If the user has an accessToken, it is used as the value for the
Authorization header. This applies to all requests to .target.com and
.tgt domains. You can disable this per request by passing in this config:
{headers: {Authorization: false}}

If an axios response is an error, it is handled based on the error code:
- 401: prompt the user to sign in
- 403: notify the user that they don't have permission to do that
- Other: show the axios error message to the user

When the component unmounts, the interceptors are removed.

*/
const Interceptor = props => {
  const [authInterceptor, setAuthInterceptor] = useState(undefined)
  const [errorInterceptor, setErrorInterceptor] = useState(undefined)
  const [, setNotificationMessage] = useGlobal('notificationMessage')
  const setNotificationMessageCallback = useCallback(setNotificationMessage, [])
  let latestAuthInterceptor = useRef(authInterceptor)
  let latestErrorInterceptor = useRef(errorInterceptor)

  useEffect(() => {
    latestAuthInterceptor.current = authInterceptor
    latestErrorInterceptor.current = errorInterceptor
  })

  useEffect(() => {
    const handleShowNotification = message => {
      setNotificationMessageCallback(message)
    }

    const addAuthInterceptor = props => {
      const localAuthInterceptor = axios.interceptors.request.use(
        config => {
          if (!config.headers.hasOwnProperty('Authorization')) {
            if (props.accessToken) {
              config.headers.Authorization = props.accessToken
            }
          } else if (!config.headers.Authorization) {
            delete config.headers.Authorization
          }
          return config
        },
        error => {
          return Promise.reject(error)
        }
      )
      setAuthInterceptor(localAuthInterceptor)
    }

    const addErrorInterceptor = () => {
      const localErrorInterceptor = axios.interceptors.response.use(
        response => response,
        error => {
          if (error.response) {
            const code = error.response.status
            if (code === 429) {
              console.log(error)
            } else if (code === 401) {
              handleShowNotification('Error')
            } else {
              console.log(error)
              let message = 'Something went wrong.'
              if (code === 403) {
                message = 'You’re not authorized to do that.'
              } else if (error.response.data.message) {
                message = error.response.data.message
              } else if (error.message) {
                message = error.message
              }
              handleShowNotification(message)
            }
          }
          // return Promise.reject(error)
        }
      )
      setErrorInterceptor(localErrorInterceptor)
    }

    addAuthInterceptor(props)
    addErrorInterceptor()

    const removeAuthInterceptor = () => {
      axios.interceptors.request.eject(latestAuthInterceptor.current)
      setAuthInterceptor(undefined)
    }
    const removeErrorInterceptor = () => {
      axios.interceptors.request.eject(latestErrorInterceptor.current)
      setErrorInterceptor(undefined)
    }

    return () => {
      removeAuthInterceptor()
      removeErrorInterceptor()
    }
  }, [props, setNotificationMessageCallback])

  // hostname ends with .target.com or .tgt
  // const isTargetDomain = url => {
  //   return /^([^/]+:)?\/{2,3}[^/]+?(\.target\.com|\.tgt)(:|\/|$)/i.test(url)
  // }

  return null
}

export default Interceptor
