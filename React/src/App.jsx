import AuthLayout from "./components/auth/auth-layout";
import OnBoarding from "./components/auth/on-boarding";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./middleware";
import InstructorLayout from "./components/instructor/instructor-layout";
import TraineeLayout from "./components/trainee/trainee-layout";
import EditTeam from "./components/instructor/Team-management/editTeam";
import Sidebar from "./components/instructor/sidebar";
function App() {
    return (
        <Routes path="/">
            <Route path="">
                <Route index element={<AuthLayout />} />
                <Route path="onBoarding" element={<OnBoarding />} />
            </Route>

            <Route path="instructor" element={<InstructorLayout />}>

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
