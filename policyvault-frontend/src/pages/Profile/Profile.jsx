import "./Profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        fullName: "User",
        email: ""
    });

    useEffect(() => {

        const token = localStorage.getItem("token");
        const storedEmail = localStorage.getItem("userEmail") || "";

        if (!token) {
            navigate("/login", { replace: true });
            return;
        }

        setUser({
            fullName: storedEmail ? storedEmail.split("@")[0] : "User",
            email: storedEmail
        });

    }, [navigate]);

    return (

        <div className="profile-page">

            <div className="profile-card">

                <h1>My Profile</h1>

                <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}`}
                    alt="profile"
                />

                <h2>{user.fullName}</h2>

                <p>{user.email || "No email available"}</p>

            </div>

        </div>

    );

}

export default Profile;