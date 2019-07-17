import React from 'react'
import Grid from '@material-ui/core/Grid/Grid'

const Rows = props => {
  const { children } = props
  return (
    <Grid container spacing={4}>
      {React.Children.map(children, child => (
        <Grid item xs={12}>
          {child}
        </Grid>
      ))}
    </Grid>
  )
}

export default Rows
