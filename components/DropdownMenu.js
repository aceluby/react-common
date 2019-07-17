import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles(theme => {
  return {
    select: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(1),
      display: 'flex',
      flexWrap: 'wrap',
      width: '80%',
    },
  }
})

const DropdownMenu = props => {
  const { label, onChange, children, value } = props
  const classes = useStyles()
  const [selectedValue, setSelectedValue] = useState(value)

  const handleSelectedValue = event => {
    setSelectedValue(event.target.value)
    onChange(event.target.value)
  }

  return (
    <FormControl className={classes.select}>
      <InputLabel htmlFor="dropdown-select">{label}</InputLabel>
      <Select
        value={selectedValue}
        onChange={handleSelectedValue}
        inputProps={{
          name: 'selectedValue',
          id: 'dropdown-select',
        }}
      >
        {children}
      </Select>
    </FormControl>
  )
}

// {dcList
//   ? dcList.sort().map(dc => (
//     <MenuItem value={dc} key={dc}>
//                 {dc}
//               </MenuItem>
//   ))
//   : null}

export default DropdownMenu
