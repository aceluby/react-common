import { useState } from 'react'
import React from 'react'
import { DatePicker } from '@material-ui/pickers'
import moment from 'moment/moment'
import useTheme from '@material-ui/core/styles/useTheme'

export const useDatePicker = (initialDate, label) => {
  const theme = useTheme()
  const [date, setDate] = useState(
    moment(initialDate ? initialDate : '2019-05-19')
  )
  const [formattedDate, setFormattedDate] = useState(date.format('YYYY-MM-DD'))

  const handleNextDay = () => {
    let newDate = moment(date).add(1, 'day')
    setDate(newDate)
    setFormattedDate(newDate.format('YYYY-MM-DD'))
  }

  const handlePreviousDay = () => {
    let newDate = moment(date).subtract(1, 'day')
    setDate(newDate)
    setFormattedDate(newDate.format('YYYY-MM-DD'))
  }

  const handleDateChange = inputDate => {
    setDate(moment(inputDate))
    setFormattedDate(moment(inputDate).format('YYYY-MM-DD'))
  }

  const component = (
    <DatePicker
      autoOk
      label={label ? label : 'Select Date'}
      value={date}
      onChange={handleDateChange}
      format={'iii MMM d yyyy'}
      style={{
        marginLeft: theme.spacing(4),
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
        width: '80%',
      }}
    />
  )

  return [formattedDate, component, handlePreviousDay, handleNextDay]
}
