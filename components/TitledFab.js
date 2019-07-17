import React from 'react'
import Grid from '@material-ui/core/Grid/Grid'
import Fab from '@material-ui/core/Fab/Fab'
import Typography from '@material-ui/core/Typography/Typography'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  headerContainer: {
    width: '100%',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
}))

const TitledFab = props => {
  const classes = useStyles()
  const flex = props.rightJustified ? 'flex-end' : 'flex-start'
  return (
    <Grid
      container
      justify={flex}
      alignItems="center"
      spacing={3}
      direction="row"
      className={classes.headerContainer}
    >
      <Grid item>
        <Fab color="primary" aria-label="add" onClick={props.onClick}>
          {props.icon}
        </Fab>
      </Grid>
      <Grid item>
        <Typography variant="h5">{props.title}</Typography>
      </Grid>
    </Grid>
  )
}

export default TitledFab
