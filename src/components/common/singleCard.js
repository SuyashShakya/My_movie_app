import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {img_300, unavailable} from '../../config/config';
import ContentModal from '../common/modal'; 

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 5,
        marginBottom: 30,
        padding: 3,
        maxWidth: 200,
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.secondary.main
        }
    }
}))

const SingleCard = ({image, id, title, date, type, rating}) => {
    const classes = useStyles()
    return (
        <ContentModal type={type} id={id}>
            <Badge badgeContent={rating} color={rating >= 7 ? 'primary' : 'secondary'}>
                <Card
                    className={classes.root}
                >
                    <CardMedia
                        component="img"
                        alt=""
                        image={image ? `${img_300}${image}` : unavailable}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Box textAlign='center'>
                            <Typography variant='body1'><b>{title}</b></Typography>
                            <Box display='flex' justifyContent='space-between' mt={2}>
                                <Typography variant='body2'>{type === 'movie' ? 'Movie' : 'TV Series'}</Typography>
                                <Typography variant='body2'>{date}</Typography>
                            </Box>
                        </Box>
                    </CardContent>    
                </Card>
            </Badge>
        </ContentModal>
    )
}

export default SingleCard