import React from 'react';
import axios from 'axios';
import {isEmpty} from 'lodash/isEmpty'
import SingleCard from '../common/SingleCard';
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';

const Trending = () => {
  const [data, setData] = React.useState({})
  const fetchTrending = async() => {
    const data  = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`
    );
    console.log('data', data, process.env.REACT_APP_API_KEY)
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
  if(!data) {
    return <>Loading...</>
  }
  if(data) {
    return (
      <Box mt={5} p={5}>
        <SingleCard data={data}/>
        {/* yo */}
      </Box>
    )
  }
}

 export default Trending;