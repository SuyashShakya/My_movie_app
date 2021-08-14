import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

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

 const App = () => {
   return (
     <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <MainNav>
            <Route path='/' exact component={Trending} />  
            <Route path='/movies' exact component={Movies} />  
            <Route path='/tvseries' exact component={Tvseries} />     
            <Route path='/search' exact component={Search} />
          </MainNav>     
        </Switch>
      </Router>
     </ThemeProvider>
   )
 }

 export default App;