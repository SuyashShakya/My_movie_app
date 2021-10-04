import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';
import PaginationComponent from '../common/pagination';
import SingleCard from '../common/singleCard';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '100%',
    borderRadius: 5,
  },
  tab: {
    width: '50%',
    color: theme.palette.secondary.dark,
    fontSize: 20,
    fontWeight: 600
  }
}))

  const Search = () => {
    const classes = useStyles()
    const [tabValue, setTabValue] = React.useState(0)
    const [searchText, setSearchText] = React.useState('')
    const [data, setData] = React.useState()
    const [totalPages, setTotalPages] = React.useState()
    const [currentPage, setCurrentPage] = React.useState(1)

    useEffect(() => {
      window.scroll(0,0)
      onSearch()
      // eslint-disable-next-line
    },[tabValue, currentPage])

    const onChange = (e) => {
      setSearchText(e.target.value)
    }
    
    const onSearch = () => {
      const searchData = async () => {
        try {
          const {data} = await axios.get(`https://api.themoviedb.org/3/search/${tabValue ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${currentPage}&include_adult=false`)
          setTotalPages(data?.total_pages)
          setData(data?.results)
        } catch(e) {
            console.error('Error:', e)
        }
      }
      searchData();
    }

    const handleChange = (event, newValue) => {
      setTabValue(newValue)
    };
    console.log('tab value', tabValue, searchText, data)
    return (
      <Box p={5}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <TextField
            className={classes.textField}
            color='secondary'
            label='Search'
            defaultValue=''
            variant='filled'
            onChange={onChange}
          />
          <Box ml={2}>
            <Button variant='outlined' color='secondary' onClick={onSearch}>
              <SearchIcon fontSize='large'/>
            </Button>
          </Box>
        </Box>
        <Box mt={5} mb={5}>
          <Tabs
            textColor="secondary"
            value={tabValue}
            onChange={handleChange}
            centered
          >
            <Tab className={classes.tab} label='Movie' />
            <Tab className={classes.tab} label='Tv Series' />
          </Tabs>
        </Box>
        <Box display='flex' flexWrap='wrap' justifyContent='space-around'>
          {data && data.map((item, key) => (
            <React.Fragment key={item?.id}>
              <SingleCard 
                image={item?.poster_path} 
                title={item?.title || item?.name} 
                type={tabValue ? 'tv' : 'movie'} 
                date={item?.release_date || item?.first_air_date} 
                rating={item?.vote_average} 
                id={item?.id} 
                type={tabValue ? 'tv' : 'movie'}
              />
            </React.Fragment>
          ))}
        </Box>
        <PaginationComponent pageCount={totalPages} setCurrentPage={setCurrentPage} />    
      </Box>
   )
 }

 export default Search;