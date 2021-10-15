import React from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    compoColor: {
        color: theme.palette.secondary.main
    }
}))

const LoadingComponent = () => {
    const classes = useStyles()
    return (
        <Box display='flex' height='100vh' flexDirection='row' justifyContent='center' alignItems='center'>
            <Typography variant='h3' className={classes.compoColor}>Loading &nbsp;</Typography>
            <CircularProgress className={classes.compoColor}/> 
        </Box>    
    )
}

export default LoadingComponent;