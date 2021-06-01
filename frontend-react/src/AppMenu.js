import React from 'react';
import { Switch, Route, withRouter, useLocation, useHistory, NavLink } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Positon from './pages/Position';
import Navigation from './components/Navigation';
import * as transportLayer from './share/TransportLayer';


function AppMenu(props) {
  let location = useLocation();
  let history = useHistory();
  React.useEffect(() => {
    // (async function isAuth() {
    //   let result = await transportLayer.isAuth();
    //   if (!result.ret) {
    //     history.push('/login');
    //   }
    // })();
    if (!localStorage.getItem('admin-token')) {
      history.push('/login');
    }
  }, [location]);

  return (
    <div className='app-container'>
      <div className='route-wrapper'>
        {
          localStorage.getItem('admin-token') && <Navigation />
        }       
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/position'>
              <Positon />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        
      </div>
    </div>
  )
}

export default withRouter(AppMenu);
