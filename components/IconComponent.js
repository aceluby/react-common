import React from 'react'
import Grid from '@material-ui/core/Grid/Grid'

const IconComponent = props => {
  return (
    <Grid container>
      <Grid item xs={1}>
        {props.icon}
      </Grid>
      <Grid item xs={11}>
        {props.component}
      </Grid>
    </Grid>
  )
}

export default IconComponent
