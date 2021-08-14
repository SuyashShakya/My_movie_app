import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Trending, Movies, Search, Tvseries } from './components';

 const App = () => {
   return (
     <Router>
      <Switch>
        <Route path='/' exact component={Trending} />  
        <Route path='/movies' exact component={Movies} />  
        <Route path='/tvseries' exact component={Tvseries} />     
        <Route path='/search' exact component={Search} />     
      </Switch>
     </Router>
   )
 }

 export default App;