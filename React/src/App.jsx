import AuthLayout from "./components/auth/auth-layout";
import OnBoarding from "./components/auth/on-boarding";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./middleware";
import InstructorLayout from "./components/instructor/instructor-layout";

function App() {
    return (
        <Routes path="/">
            <Route path="">
                <Route index element={<AuthLayout />} />
                <Route path="onBoarding" element={<OnBoarding />} />
            </Route>
            <Route
                path="instructor"
                element={
                    <ProtectedRoute>
                        <InstructorLayout />
                    </ProtectedRoute>
                }
            ></Route>
        </Routes>
    );
}

export default App;
