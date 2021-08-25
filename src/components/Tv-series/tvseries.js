import React from 'react';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import SingleCard from '../common/singleCard';
import PaginationComponent from '../common/pagination'


const Tvseries = () => {
  const [data, setData] = React.useState({})
  const [currentPage, setCurrentPage] = React.useState(1)
  const [totalPages, setTotalPages] = React.useState()
  const fetchTvseries = async() => {
    const {data}  = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}`
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
  },[])
  if(isEmpty(data)) {
    return <>Loading...</>
  }
  const onPageChange = (event, page) => {
    setCurrentPage(page);
    window.scroll(0, 0)
  };
  return (
    <Box mt={5} p={5} textAlign='center'>
      <Typography variant='h4' color='textSecondary' gutterBottom> Tv series </Typography>
      <Box display='flex' flexWrap='wrap' justifyContent='space-around'>
        {data.map((item, key) => (
          <React.Fragment key={item?.id}>
            <SingleCard image={item?.poster_path} title={item?.title} type={item?.media_type} date={item?.first_air_date} rating={item?.vote_average} />
          </React.Fragment>
        ))}
      </Box>
      <PaginationComponent pageCount={totalPages} onPageChange={onPageChange} /> 
    </Box>
  )
}

 export default Tvseries;