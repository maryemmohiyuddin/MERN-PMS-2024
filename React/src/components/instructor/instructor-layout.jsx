
import Nav from '../navbar';
import Sidebar from './sidebar';
import Team from '../instructor/Team-management/team';
import Project from '../instructor/Project-management/project';
import Task from '../instructor/Task-management/task';
import Dashboard from '../dashboard';
import Stack from '../instructor/stack-management/stack';
import Trainee from '../instructor/Trainee-management/trainee';
import Request from './request-management/requests';
import { useState } from 'react'

function InstructorLayout() {
    const [component, setComponent] = useState("DASHBOARD");
    const updateState = (newState) => {
        setComponent(newState);
    }
    // const [isLogin, setIsLogin] = useState(true);
    // const updateState = (newState) => {
    //   setIsLogin(newState);
    // }
    return (
        <>
            <div className="bg-light-grey h-screen w-screen overflow-x-hidden">
                {/* {isLogin && <Login updateState={updateState} />}
      {!isLogin && <Signup updateState={updateState} />} */}
                <Nav />

                <Sidebar updateState={updateState} className={"shadow-xl"} />
                {component == "DASHBOARD" && <Dashboard updateState={updateState} />}
                {component == "STACKS" && <Stack updateState={updateState} />}
                {component == "PROJECTS" && <Project updateState={updateState} />}
                {component == "TEAMS" && <Team updateState={updateState} />}
                {component == "TASKS" && <Task updateState={updateState} />}
                {component == "TRAINEE" && <Trainee updateState={updateState} />}
                {component == "REQUESTS" && <Request updateState={updateState} />}




            </div>

        </>
    )
}

export default InstructorLayout
