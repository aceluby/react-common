import React from 'react'
import Grid from '@material-ui/core/Grid/Grid'

const Cols = props => {
  const { children, gutters } = props
  let columnTotal = 0
  React.Children.forEach(children, child => {
    let columnSpan = child.props.columnSpan ? child.props.columnSpan : 1
    columnTotal = columnTotal + columnSpan
  })
  let columnLength
  if (gutters) {
    if (10 % columnTotal > 0) {
      throw new Error(
        'Number of columns not equally divisible by 10 with gutters'
      )
    }
    columnLength = 10 / columnTotal
  } else {
    if (12 % columnTotal > 0) {
      throw new Error(
        'Number of columns not equally divisible by 12 (gutters adds 2 columns)'
      )
    }
    columnLength = 12 / columnTotal
  }

  return (
    <Grid container spacing={4}>
      {gutters && <Grid item xs={1} />}
      {React.Children.map(children, child => {
        let columnSpan = child.props.columnSpan ? child.props.columnSpan : 1
        return (
          <Grid item xs={columnLength * columnSpan}>
            {child}
          </Grid>
        )
      })}
      {gutters && <Grid item xs={1} />}
    </Grid>
  )
}

export default Cols
