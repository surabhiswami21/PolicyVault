import "./Navbar.css";

import { useEffect, useState } from "react";

function Navbar() {

    const [email, setEmail] = useState("");

    useEffect(() => {

        const storedEmail =
            localStorage.getItem("userEmail");

        if (storedEmail) {
            setEmail(storedEmail);
        }

    }, []);

    return (

        <header className="navbar">

            <div>

                <h2>
                    PolicyVault
                </h2>

                <p>
                    Manage your policies securely
                </p>

            </div>


            <div className="navbar-right">

                <button
                    className="notification-btn"
                    type="button"
                    title="Notifications"
                >
                    🔔
                </button>


                <div
                    className="user-avatar"
                    title={email || "User"}
                >
                    {email
                        ? email.charAt(0).toUpperCase()
                        : "U"}
                </div>

            </div>

        </header>

    );
}

export default Navbar;