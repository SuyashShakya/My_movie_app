import React from 'react';
import axios from 'axios';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import isEmpty from 'lodash/isEmpty';

const useStyles = makeStyles(() => ({
    chip: {
        margin: 2
    }
}))

const ChipComponent = ({type, genre, setGenre, selectedGenre, setSelectedGenre, setCurrentPage}) => {
    console.log('genre', genre)
    const classes = useStyles();
    const fetchGenre = async() => {
        const {data}  = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setGenre(data?.genres)
    }
    React.useEffect(() => {
        try{
          fetchGenre()
        } catch(e) {
          console.log('Error:', e)
        }
        return () => {
            setGenre([]); // unmounting
        };
        // eslint-disable-next-line
    }, [])
    
    const handleClick = (g) => {
        setSelectedGenre([...selectedGenre, g])
        setGenre(genre.filter((item) => item?.id !== g?.id ))
        setCurrentPage(1)
    }

    const handleRemove = (g) => {
        setSelectedGenre(selectedGenre.filter((item) => item?.id !== g?.id ))
        setGenre([...genre, g])
        setCurrentPage(1)
    }

    if(isEmpty(genre)) {
        return <>Loading...</>
    }
    return (
        <Box p={3}>
            {!isEmpty(selectedGenre) && selectedGenre?.map((item, key) => (
                <Chip
                    className={classes.chip}
                    key={item?.id}
                    size="small"
                    label={item?.name}
                    onDelete={() => handleRemove(item)}
                    color='primary'
                />
            ))}
            {genre?.map((item, key) => (
                <Chip
                    className={classes.chip}
                    key={item?.id}
                    size="small"
                    label={item?.name}
                    onClick={() => handleClick(item)}
                    color='secondary'
                />
            ))}
        </Box> 
    )
}

export default ChipComponent;

