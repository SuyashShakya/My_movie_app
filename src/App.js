import React, {createContext} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Box } from '@material-ui/core';
import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Trending, Movies, Search, Tvseries, MainNav } from './components';

export const ThemeWrapper = createContext("theme");

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#404347',
    },
    secondary: {
      main: '#c9ccd1'
    },
  },
});

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#c9ccd1',
    },
    secondary: {
      main: '#404347'
    },
  },
});


const App = () => {
  const [lightMode, setLightMode] = React.useState(false)
  
  const toggleTheme = () => {
		setLightMode(!lightMode)
	};

  const theme = lightMode ? lightTheme : darkTheme

  const useStyles = makeStyles(() => ({
    containerStyle: {
      minHeight: '100vh',
      backgroundColor: `${theme.palette.primary.light}`
    }
  }))
  
  const classes = useStyles()

  return (
    <Router>
      <ThemeWrapper.Provider
        value={{
          toggleTheme: toggleTheme,
          lightMode,
          theme
        }}
		  >
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
      </ThemeWrapper.Provider>
     </Router>
   )
 }

 export default App;