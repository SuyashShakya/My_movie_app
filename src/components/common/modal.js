import React from 'react';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Hidden from '@material-ui/core//Hidden';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {img_500, unavailable, unavailableLandscape} from '../../config/config';
import CauroselCompo from './caurosel';
import LoadingComponent from './loadingComponent';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '80%',
        height: "80%",
        borderRadius: 10,
        backgroundColor: theme.palette.primary.light,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        },
    },
    poster: {
        objectFit: 'contain',
        [theme.breakpoints.down('md')]: {
            width: '38%'
        },
    }
}));

const ContentModal = ({children, type, id}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState();
    const [video, setVideo] = React.useState();
    const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const fetchData = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setData(data);
    };

    const fetchVideo = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
    
        setVideo(data?.results[0]?.key);
      };
    
    React.useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if(isEmpty(data)) {
        return <LoadingComponent />
    }
    return (
        <>
            <Box onClick={handleOpen}>
                {children}
            </Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box className={classes.paper}>
                        <Hidden smDown>
                            <img src={data?.poster_path ? `${img_500}/${data?.poster_path}`: unavailable} className={classes.poster} alt={data?.name || data?.title} />
                        </Hidden>
                        <Hidden mdUp>
                            <img src={data?.backdrop_path ? `${img_500}/${data?.backdrop_path}`: unavailableLandscape} alt={data?.name || data?.title} />
                        </Hidden>
                        <Box display='flex' flexDirection='column' p={isSmallScreen ? 1 : 5} maxWidth={isSmallScreen ? '95%' : '65%'} minWidth={isSmallScreen ? '95%' : '30%'}>
                            <center>
                                <Typography variant={isExtraSmallScreen ? 'h6' : 'h3'} color='secondary'>
                                    {data?.title || data?.name} ({(data?.release_date || data?.first_air_date || '-----').substring(0, 4)})
                                </Typography>
                            </center>
                            <center>
                                <Typography color='secondary' varinat='subtitle2'>
                                    {data?.tagline}
                                </Typography>
                            </center>
                            <Box mt={2} p={1} borderColor='secondary.light' borderRadius={10} border={1} height={isSmallScreen ? '20%' : '40%'} overflow={isSmallScreen ? 'scroll' : ''} boxShadow={1}>
                                <Typography color='secondary'>
                                    {data?.overview}
                                </Typography>    
                            </Box>
                            <CauroselCompo type={type} id={id}/>  
                            <Button
                                variant="contained"
                                startIcon={<YouTubeIcon />}
                                color="primary"
                                target="__blank"
                                href={`https://www.youtube.com/watch?v=${video}`}
                            >
                                Watch the Trailer
                            </Button>            
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
  );
}

export default ContentModal 