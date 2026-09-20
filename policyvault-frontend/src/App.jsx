import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddPolicy from "./pages/AddPolicy/AddPolicy";
import Policies from "./pages/Policies/Policies";
import PolicyDetails from "./pages/PolicyDetails/PolicyDetails";
import Profile from "./pages/Profile/Profile";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Login */}
                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* Register */}
                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />


                {/* Add Policy */}
                <Route
                    path="/add-policy"
                    element={<AddPolicy />}
                />


                {/* All Policies */}
                <Route
                    path="/policies"
                    element={<Policies />}
                />


                {/* Edit Policy */}
                <Route
                    path="/edit-policy/:id"
                    element={<AddPolicy />}
                />


                {/* Policy Details */}
                <Route
                    path="/policy/:id"
                    element={<PolicyDetails />}
                />


                {/* Profile */}
                <Route
                    path="/profile"
                    element={<Profile />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;