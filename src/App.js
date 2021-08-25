import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Box } from '@material-ui/core';
import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Trending, Movies, Search, Tvseries, MainNav } from './components';

const theme = createTheme({
  palette: {
    primary: {
      main: '#404347',
    },
    secondary: {
      main: '#c9ccd1'
    },
  },
});

const useStyles = makeStyles(() => ({
  containerStyle: {
    height: '100%',
    backgroundColor: `${theme.palette.primary.light}`
  }
})) 

const App = () => {
  const classes = useStyles()
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <MainNav>
          <Box className={classes.containerStyle}>
            <Container maxWidth='lg'>
            <Switch>
              <Route path='/' exact component={Trending} />  
              <Route path='/movies' component={Movies} />  
              <Route path='/tvseries' component={Tvseries} />     
              <Route path='/search' component={Search} />
              </Switch>
            </Container>
          </Box>
        </MainNav>     
      </ThemeProvider>
     </Router>
   )
 }

 export default App;