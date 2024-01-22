import AuthLayout from "./components/auth/auth-layout";
import OnBoarding from "./components/auth/on-boarding";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./middleware";
import ProtectedRouteLogin from "./middleware-login";
import InstructorLayout from "./components/instructor/instructor-layout";
import TraineeLayout from "./components/trainee/trainee-layout";
import Sidebar from "./components/instructor/sidebar";
function App() {
    // const[Component,setComponent]=useState(false);
    return (
        <Routes path="/">
            <Route path="">
                <Route index element={

                    <ProtectedRouteLogin Component={AuthLayout} />


                } />

                <Route path="onBoarding" element={<OnBoarding />} />
            </Route>

            <Route path="instructor" element={
            
                <ProtectedRoute Component={InstructorLayout} />


            }>

            </Route>

            <Route
                path="trainee"
                element={
                    // <ProtectedRoute>
                    <TraineeLayout />
                    // </ProtectedRoute>
                }
            ></Route>
        </Routes>


    );
}

export default App;
