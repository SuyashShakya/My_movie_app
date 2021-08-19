import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {img_300} from '../../config/config'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 5,
        padding: 2,
        // height: 450,
        maxWidth: 200,
        backgroundColor: theme.palette.secondary.main
    }
}))

const SingleCard = ({image, title, date, type}) => {
    const classes = useStyles()
    return (
        <Card
            className={classes.root}
        >
            <CardMedia
                component="img"
                alt=""
                image={`${img_300}${image}`}
                title="Contemplative Reptile"
            />
            <CardContent>
                <Box textAlign='center'>
                    <Typography variant='body1' color='primary'>{title}</Typography>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant='body2'>{type}</Typography>
                        <Typography variant='body2'>{date}</Typography>
                    </Box>
                </Box>
            </CardContent>    
        </Card>
    )
}

export default SingleCard