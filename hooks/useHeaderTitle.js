import { useEffect, useCallback } from 'react'
import { useGlobal } from 'reactn'

export const useHeaderTitle = inputHeaderTitle => {
  const [headerTitle, setHeaderTitle] = useGlobal('headerTitle')

  const setHeaderTitleCallback = useCallback(setHeaderTitle, [])

  useEffect(() => {
    if (inputHeaderTitle) {
      setHeaderTitleCallback(inputHeaderTitle)
    }
  }, [inputHeaderTitle, setHeaderTitleCallback])

  return [headerTitle, setHeaderTitle]
}
