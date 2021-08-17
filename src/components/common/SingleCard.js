import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {makeStyles} from '@material-ui/core/styles';
import {img_300} from '../../config/config'

const useStyles = makeStyles(() => ({
    root: {
        padding: 2,
        height: 400,
        width: 220
    }
}))

const SingleCard = ({data}) => {
    const classes = useStyles()
    console.log('data', data)
    const singleData = data[0]
    console.log('singledata', singleData?.poster_path, `${img_300}${singleData?.poster_path}`)

    return (
        <Card
            className={classes.root}
        >
            <CardMedia
                component="img"
                alt="Contemplative Reptile"
                image={`${img_300}${singleData?.poster_path}`}
                title="Contemplative Reptile"
            />
        </Card>
    )
}

export default SingleCard