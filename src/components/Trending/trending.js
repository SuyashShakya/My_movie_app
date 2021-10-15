import React from 'react';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import SingleCard from '../common/singleCard';
import PaginationComponent from '../common/pagination'
import LoadingComponent  from '../common/loadingComponent';

const Trending = () => {
	const [data, setData] = React.useState()
	const [currentPage, setCurrentPage] = React.useState(1)
	const fetchTrending = async() => {
		const {data}  = await axios.get(
		`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`
		);
		setData(data?.results)
	}
	React.useEffect(() => {
		try{
			fetchTrending()
		} catch(e) {
			console.log('Error:', e)
		}
		// eslint-disable-next-line
	}, [currentPage])
	
	if(isEmpty(data)) {
		return <LoadingComponent />
	}

	return (
		<Box p={5} textAlign='center' bgcolor='primary'>
		<Typography variant='h4' color='textSecondary' gutterBottom> Trending </Typography>
		<Box display='flex' flexWrap='wrap' justifyContent='space-around'>
			{data.map((item, key) => (
			<React.Fragment key={item?.id}>
				<SingleCard image={item?.poster_path} title={item?.title} type={item?.media_type} date={item?.release_date} rating={item?.vote_average} id={item?.id} />
			</React.Fragment>
			))}
		</Box>
		<PaginationComponent pageCount={10} setCurrentPage={setCurrentPage} /> 
		</Box>
	)
}

 export default Trending;