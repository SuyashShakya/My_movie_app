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
    height: '100vh',
    backgroundColor: `${theme.palette.primary.main}`
  }
})) 

const App = () => {
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <MainNav>
            <Box className={classes.containerStyle}>
              <Container maxWidth='lg'>
                <Route path='/' exact component={Trending} />  
                <Route path='/movies' exact component={Movies} />  
                <Route path='/tvseries' exact component={Tvseries} />     
                <Route path='/search' exact component={Search} />
              </Container>
            </Box>
          </MainNav>     
        </Switch>
      </Router>
     </ThemeProvider>
   )
 }

 export default App;