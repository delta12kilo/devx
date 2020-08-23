import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Navbar from './components/layout/navbar';
import Landing from './components/layout/landing';

import Login from './components/auth/login';
import Register from './components/auth/register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import EditProfile from './components/profile-forms/edit-profile';
import AddExperience from './components/profile-forms/add-experience';
import AddEducation from './components/profile-forms/add-education';
import Profiles from './components/profiles/profiles';
import Profile from './components/profile/profile';
import Posts from './components/Posts/Posts';
import Post from './components/Post/post';
import NotFound from './components/layout/NotFound';


//Redux
import { Provider } from 'react-redux';
import store from './store';
import addExperience from './components/profile-forms/add-experience';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}


const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (

    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className="container">
            <Alert />
            <switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/create-profile' component={CreateProfile} />
              <PrivateRoute exact path='/edit-profile' component={EditProfile} />
              <PrivateRoute exact path='/add-experience' component={AddExperience} />
              <PrivateRoute exact path='/add-education' component={AddEducation} />
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/posts/:id' component={Post} />
            </switch>
          </section>
        </Fragment>
      </Router>
    </Provider>


  )
};


export default App;