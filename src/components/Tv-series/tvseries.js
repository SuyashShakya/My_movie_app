import React from 'react';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import SingleCard from '../common/singleCard';
import PaginationComponent from '../common/pagination';
import ChipComponent from '../common/chipComponent';
import useGenre from '../../hooks/useGenre';

const Tvseries = () => {
  const [data, setData] = React.useState({})
  const [currentPage, setCurrentPage] = React.useState(1)
  const [totalPages, setTotalPages] = React.useState()
  const [genre, setGenre] = React.useState([])
  const [selectedGenre, setSelectedGenre] = React.useState([])
  const genreForUrl = useGenre(selectedGenre)
  console.log('genre', genreForUrl)  

  const fetchTvseries = async() => {
    const {data}  = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}&with_genres=${genreForUrl}`
    );
    setData(data?.results)
    setTotalPages(data?.total_pages)
  }
  React.useEffect(() => {
    try{
      fetchTvseries()
    } catch(e) {
      console.error('Error:', e)
    }
    // eslint-disable-next-line
  },[currentPage, genreForUrl])
  if(isEmpty(data)) {
    return <>Loading...</>
  }
  console.log('data', data)
  return (
    <Box p={5} textAlign='center'>
      <Typography variant='h4' color='textSecondary' gutterBottom> Tv series </Typography>
      <ChipComponent type='tv' genre={genre} setGenre={setGenre} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} setCurrentPage={setCurrentPage} />
      <Box display='flex' flexWrap='wrap' justifyContent='space-around'>
        {data.map((item, key) => (
          <React.Fragment key={item?.id}>
            <SingleCard image={item?.poster_path} title={item?.name} type={item?.media_type} date={item?.first_air_date} rating={item?.vote_average} id={item?.id} type='tv' />
          </React.Fragment>
        ))}
      </Box>
      <PaginationComponent pageCount={totalPages} setCurrentPage={setCurrentPage} /> 
    </Box>
  )
}

 export default Tvseries;