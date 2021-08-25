import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TheatersIcon from '@material-ui/icons/Theaters';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles} from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tab : {
    color: `${theme.palette.secondary.main}`
  }
}))

const MainNav = ({children}) => {
  const classes = useStyles(0);
  const [tabValue, setTabValue] = React.useState()
  const history = useHistory();
  
  React.useLayoutEffect(() => {
    switch(history?.location?.pathname){
      case '/movies':
        setTabValue(1)
        break;
      case '/tvseries':
        setTabValue(2)
        break;
      case '/search':
        setTabValue(3)
        break;
      default:
        setTabValue(0) 
    }
  },[history?.location?.pathname])
  const handleChange = (event, newValue) => {
    switch(newValue){
      case 1:
        history.push('/movies')
        setTabValue(1)
        break;
      case 2:
        history.push('/tvseries')
        setTabValue(2)
        break;
      case 3:
        history.push('/search')
        setTabValue(3)
        break;
      default:
        history.push('/') 
        setTabValue(0)  
    }
    // setTabValue(newValue)
  }; 
  return (
    <>
      <Box display='flex' bgcolor='primary.main' border={1} justifyContent='center' alignItems='center' width='100%' p={1} position='fixed' top={0} zIndex={2}>
        <TheatersIcon color='secondary' /> &nbsp;
        <Typography color='secondary' variant='h6' onClick={() => window.scroll(0, 0)}> Movies and Tv Series </Typography> &nbsp;
        <TheatersIcon color='secondary' />
      </Box>
      {children}
      <br/> <br/>
      <Box display='flex' justifyContent='center' bgcolor='primary.main' border={1} textAlign='center' width='100%' position='fixed' bottom={0} zIndex={2}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
          className={classes.tab}
        >
          <Tab label='Trending' icon={<WhatshotIcon />}/>
          <Tab label='Movies' icon={<MovieIcon />} />
          <Tab label='Tv series' icon={<TvIcon />} />
          <Tab label='Search' icon={<SearchIcon />} />
        </Tabs>
      </Box>     
    </>
  )
}

 export default MainNav;