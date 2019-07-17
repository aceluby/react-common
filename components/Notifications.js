import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { addCallback, useGlobal } from 'reactn'

const Notifications = () => {
  const [, setNotificationMessage] = useGlobal('notificationMessage')
  const [message, setMessage] = useState()

  addCallback(global => {
    if (global.notificationMessage) {
      setMessage(global.notificationMessage)
      setNotificationMessage(undefined)
    }
  })

  const handleRequestClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setMessage(undefined)
  }

  return (
    <Snackbar
      open={!!message}
      message={message}
      onClose={handleRequestClose}
      autoHideDuration={4000}
    />
  )
}

export default Notifications
