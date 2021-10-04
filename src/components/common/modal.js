import React from 'react';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'
import {img_500, unavailable, unavailableLandscape} from '../../config/config';
import CauroselCompo from './caurosel';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    paper: {
        display: 'flex',
        flexDirection: 'row',
        width: "90%",
        height: "80%",
        borderRadius: 5,
        backgroundColor: theme.palette.primary.light,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const ContentModal = ({children, type, id}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState();
    const [video, setVideo] = React.useState();

    const fetchData = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
    
        setData(data);
        // console.log(data);
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

    console.log('data',data, video)

    if(isEmpty(data)) {
        return <>Loading...</>
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
                        <img src={data?.poster_path ? `${img_500}/${data?.poster_path}`: unavailable} alt={data?.name || data?.title} />
                        {/* <img src={data?.backdrop_path ? `${img_500}/${data?.backdrop_path}`: unavailableLandscape} alt={data?.name || data?.title} /> */}
                        <Box display='flex' flexDirection='column' p={5} width='100%'>
                            <center>
                                <Typography variant='h3' color='secondary'>
                                    {data?.title || data?.name} ({(data?.release_date || data?.first_air_date || '-----').substring(0, 4)})
                                </Typography>
                            </center>
                            <center>
                                <Typography color='secondary' varinat='subtitle2'>
                                    {data?.tagline}
                                </Typography>
                            </center>
                            <Box mt={2} p={1}borderColor='secondary.light' borderRadius={5} border={1} height={300}>
                                <Typography color='secondary'>
                                    {data?.overview}
                                </Typography>    
                            </Box>            
                        </Box>
                        <CauroselCompo type={type} id={id}/>    
                    </Box>
                </Fade>
            </Modal>
        </>
  );
}

export default ContentModal 