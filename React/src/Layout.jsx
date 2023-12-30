import Login from './components/auth/login'
import Signup from './components/auth/signup'
import Nav from './components/navbar';
import Sidebar from './components/instructor/sidebar';
import Team from './components/instructor/Team-management/team';
import Project from './components/instructor/Project-management/project';
import Task from './components/instructor/Task-management/task';
import Dashboard from './components/dashboard';
import Stack from './components/instructor/stack-management/stack';
import Trainee from './components/instructor/Trainee-management/trainee';
import { useState } from 'react'

function Layout() {
 
  const [isLogin, setIsLogin] = useState(true);
  const updateState = (newState) => {
    setIsLogin(newState);
  }
  return (
    <>
        {isLogin && <Login updateState={updateState} />}
      {!isLogin && <Signup updateState={updateState} />}

        

    </>
  )
}

export default Layout
