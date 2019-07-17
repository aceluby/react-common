import React from 'react'
import ReactTable from 'react-table'
import Button from '@material-ui/core/Button/Button'
import TextField from '@material-ui/core/TextField/TextField'
import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  table: {
    border: 'unset',
    rtTbody: {
      rtTd: {
        borderRight: 'unset',
      },
    },
  },
}))

const navigationButton = props => {
  return (
    <Button
      onClick={props.onClick}
      disabled={props.disabled}
      fullWidth
      data-testid={props.children}
    >
      {props.children}
    </Button>
  )
}

const CustomTable = props => {
  const { classes } = useStyles

  return (
    <ReactTable
      className={classes.table}
      defaultPageSize={props.pageSize ? props.pageSize : 25}
      minRows={3}
      noDataText={props.noDataText}
      data={props.data}
      defaultSorted={props.defaultSorted}
      PreviousComponent={navigationButton}
      NextComponent={navigationButton}
      defaultFilterMethod={(filter, row, column) => {
        const id = filter.pivotId || filter.id
        return row[id] !== undefined
          ? String(row[id])
              .toLowerCase()
              .includes(filter.value.toLowerCase())
          : true
      }}
      columns={props.columns}
    />
  )
}

export default CustomTable

export const getFilter = testId => {
  return ({ filter, onChange }) => (
    <TextField
      placeholder="Filter"
      fullWidth
      onChange={event => onChange(event.target.value)}
      value={filter ? filter.value : ''}
      autoComplete="off"
      data-testid={testId}
    />
  )
}
