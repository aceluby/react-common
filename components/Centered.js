import React from 'react'
import Grid from '@material-ui/core/Grid/Grid'

const Centered = props => {
  return (
    <Grid
      container
      spacing={4}
      align={'center'}
      justify={'center'}
      alignContent={'center'}
      alignItems={'center'}
    >
      <Grid item>{props.children}</Grid>
    </Grid>
  )
}

export default Centered
