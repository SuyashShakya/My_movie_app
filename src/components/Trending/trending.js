import React from 'react';
import axios from 'axios';

const Trending = () => {
  const [data, setData] = React.useState({})
  const fetchTrending = async() => {
    console.log('data', process.env.REACT_APP_API_KEY)
    const data  = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}/1`
    );
    console.log('data', data)
  }
  
  React.useEffect(() => {
    console.log('component has mounted')
    fetchTrending()
  }, [])
  return (
    <>
      gandu  
    </>
  )
}

 export default Trending;