import React, {useEffect } from 'react';
import {
  Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { popupActions } from './redux/actions';
import { history } from './helpers';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import HeaderDashboard from './components/header/HeaderDashboard';
import Home from './components/home/Home'
import About from './pages/About';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import LoginForm from './components/forms/LoginForm';
import JoinNow from './components/forms/JoinUs';
import EmployerSignUpForm from './components/forms/EmployerSignUpForm';
import JobSeekerSignUpForm from './components/forms/JobseekerSignUpForm';

import { CommonDashboard } from './components/dashboards/CommonDashboard';
import { MyProfile } from './components/dashboards/profile/MyProfile';
import { ChangePassword } from './components/dashboards/myaccount/ChangePassword';

import PrivateRoute from './common/PrivateRoute';
import { isLoggedIn , currentUser} from './helpers';
import { alertActions } from './redux/actions';
import MyEmployers from './components/dashboards/consultant/MyEmployers';
import AddEmployer from './components/dashboards/consultant/AddEmployer';
import { userActions } from './redux/actions';
import EditEmployer from './components/dashboards/consultant/EditEmployer';
import { JobsPosted } from './components/dashboards/jobs/JobsPosted';
import { AddJob } from './components/dashboards/jobs/AddJob';
import { EditJob } from './components/dashboards/jobs/EditJob';
import { ViewJob } from './components/jobs/ViewJob';
import { Joblist } from './components/jobs/JobList';
import { JobApplications } from './components/dashboards/consultant/JobApplications';
import { ProfileGlobal } from './components/dashboards/jobseeker/ProfileGlobal';
import { Checkout } from './pages/Checkout';
import { EditProfile } from './components/dashboards/profile/EditProfile';


export default function App() {
  //const alert = useSelector(state => state.alert);
  const isModel = useSelector(state => state.popup);
  const dispatch = useDispatch();      

  useEffect(() => {
    
    history.listen((location, action) => {
        //clear alert on location change
        dispatch(alertActions.clear());
        dispatch(popupActions.close());
    });
}, []);

  const renderNav = () => {
    if (isLoggedIn())
    return (
      <HeaderDashboard/>
    )
    else {
      return (
        <Header/>
      )
    }
  }
 
  return (
    <Router history={history}>
      <>
        { renderNav() } 
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} exact />
          <Route path="/pricing" component={Pricing} exact />
          <Route path="/contact" component={Contact} exact />
          <PrivateRoute component={CommonDashboard} path="/dashboard" exact />
          <PrivateRoute component={MyProfile} path="/profile" exact />
          <PrivateRoute component={ChangePassword} path="/change-password" exact />
          <PrivateRoute component={MyEmployers} path="/my-employers" exact />
          <PrivateRoute component={AddEmployer} path="/add-employer" exact />
          <PrivateRoute component={EditEmployer} path="/edit-employer/:id" exact />
          <PrivateRoute component={JobsPosted} path="/jobs-posted" exact />
          <PrivateRoute component={AddJob} path="/add-job" exact />
          <PrivateRoute component={EditJob} path="/edit-job/:id" exact />
          <Route component={Joblist} path="/jobs" exact />
          <Route component={ViewJob} path="/job/:id" exact />
          <Route component={ProfileGlobal} path="/user-profile/:id" exact />
          <Route component={Checkout} path="/checkout/:id" exact />
          <PrivateRoute component={JobApplications} path="/job-applications/:id" exact />
          <PrivateRoute component={EditProfile} path="/edit-profile/:id" exact />
          {/* <Redirect from="*" to="/" /> */}
        </Switch>
        <Footer /> 
        {isModel.type == 'login' && <LoginForm />}        
        {isModel.type == 'joinnow' && <JoinNow/>}        
        {isModel.type == 'employer' && <EmployerSignUpForm />}
        {isModel.type == 'jobseeker' && <JobSeekerSignUpForm/>}  
        {isModel.type == 'test' && <testSignUpForm />}      
      </>
    </Router>
  );
}
