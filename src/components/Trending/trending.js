import React from 'react';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty'
import SingleCard from '../common/SingleCard';
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';

const Trending = () => {
  const [data, setData] = React.useState({})
  const fetchTrending = async() => {
    const data  = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`
    );
    setData(data?.data?.results)
  }
  // const classes = useStyles()
  React.useEffect(() => {
    try{
      fetchTrending()
    } catch(e) {
      console.log('Error:', e)
    }
  }, [])
  console.log('data', data, process.env.REACT_APP_API_KEY)
  if(isEmpty(data)) {
    return <>Loading...</>
  }
  return (
    <Box mt={5} p={5} display='flex' flexWrap='wrap' justifyContent='space-around' bgcolor='primary.main'>
      {data.map((item, key) => (
        <React.Fragment key={item?.id}>
          <SingleCard image={item?.poster_path} title={item?.title} type={item?.media_type} date={item?.release_date}/>
        </React.Fragment>
      ))}
      {/* <SingleCard data={data}/> */}
      {/* yo */}
    </Box>
  )
}

 export default Trending;