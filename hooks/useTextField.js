import { useState } from 'react'
import React from 'react'
import TextField from '@material-ui/core/TextField/TextField'
import makeStyles from '@material-ui/styles/makeStyles/index'

const useStyles = makeStyles(theme => {
  return {
    textField: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(1),
      width: '80%',
    },
  }
})

export const useTextField = (props, initialInput, callbackFunction) => {
  const classes = useStyles()
  const [field, setField] = useState(initialInput)

  const handleTextChange = event => {
    setField(event.target.value)
  }

  const component = (
    <TextField
      className={classes.textField}
      fullWidth
      value={field}
      onChange={callbackFunction ? callbackFunction : handleTextChange}
      margin="normal"
      {...props}
    />
  )

  return [field, setField, component]
}
