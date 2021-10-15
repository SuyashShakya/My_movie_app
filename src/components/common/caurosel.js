
import axios from "axios";
import React, { useEffect, useState } from "react";
import {makeStyles} from '@material-ui/core/styles';
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../config/config";

const useStyles = makeStyles(() => ({
    carouselItem: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        objectFit: 'contain',
    },
    carouselItemImg: {
        borderRadius: 10,
        marginBottom: 5,
        boxShadow: '0px 0px 5px black',
        maxHeight: 150,
        maxWidth: 75
    }
}))

const handleDragStart = (e) => e.preventDefault();

const CauroselCompo = ({ id, type }) => {
    const [credits, setCredits] = useState([]);
    const classes = useStyles()

    const items = credits.map((c) => (
        <div className={classes.carouselItem}>
            <img
                src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
                alt={c?.name}
                onDragStart={handleDragStart}
                className={classes.carouselItemImg}
            />
            <b className="carouselItem__txt">{c?.name}</b>
        </div>
    ));

    const responsive = {
        0: {
            items: 3,
        },
        512: {
            items: 5,
        },
        1024: {
            items: 7,
        },
    };

    const fetchCredits = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setCredits(data.cast);
    };

    useEffect(() => {
        fetchCredits();
        // eslint-disable-next-line
    }, []);
    return (
    <AliceCarousel
        mouseTracking
        infinite
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
    />
    );
};

export default CauroselCompo;