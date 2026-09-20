import "./Dashboard.css";

import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import DashboardCard from "../../Components/DashboardCard/DashboardCard";

import api from "../../api/axiosConfig";


function Dashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState({
        totalPolicies: 0,
        premiumDue: 0,
        maturitySoon: 0,
        totalInvestment: 0,
    });

    const [policies, setPolicies] = useState([]);


    // =========================
    // FETCH DASHBOARD DATA
    // =========================

    const fetchDashboard = useCallback(async () => {

        try {

            const response = await api.get(
                "/api/policies/dashboard"
            );

            setDashboard(response.data);

        } catch (error) {

            console.log(error);

            if (error.response?.status === 401) {

                localStorage.removeItem("token");
                localStorage.removeItem("userEmail");

                navigate("/login", {
                    replace: true
                });

            }

        }

    }, [navigate]);


    // =========================
    // FETCH POLICIES
    // =========================

    const fetchPolicies = useCallback(async () => {

        try {

            const response = await api.get(
                "/api/policies"
            );

            setPolicies(response.data);

        } catch (error) {

            console.log(error);

            if (error.response?.status === 401) {

                localStorage.removeItem("token");
                localStorage.removeItem("userEmail");

                navigate("/login", {
                    replace: true
                });

            }

        }

    }, [navigate]);


    // =========================
    // CHECK LOGIN
    // =========================

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {

            navigate("/login", {
                replace: true
            });

            return;
        }

        fetchDashboard();
        fetchPolicies();

    }, [fetchDashboard, fetchPolicies, navigate]);


    return (

        <div className="dashboard">

            <Sidebar />


            <main className="dashboard-content">

                <Navbar />


                <div className="dashboard-body">


                    {/* Welcome */}

                    <div className="welcome-section">

                        <div>

                            <p>
                                Welcome back 👋
                            </p>

                            <h1>
                                Your Policy Overview
                            </h1>

                            <span>
                                Track your policies, premiums and maturity dates.
                            </span>

                        </div>


                        <Link
                            to="/add-policy"
                            className="add-policy-btn"
                        >
                            + Add Policy
                        </Link>

                    </div>


                    {/* Dashboard Cards */}

                    <div className="cards">


                        <DashboardCard
                            icon="📄"
                            title="Total Policies"
                            value={dashboard.totalPolicies}
                        />


                        <DashboardCard
                            icon="💳"
                            title="Premium Due"
                            value={dashboard.premiumDue}
                        />


                        <DashboardCard
                            icon="⏳"
                            title="Maturity Soon"
                            value={dashboard.maturitySoon}
                        />


                        <DashboardCard
                            icon="₹"
                            title="Total Investment"
                            value={`₹ ${dashboard.totalInvestment}`}
                        />


                    </div>


                    {/* Recent Policies */}

                    <div className="recent-section">


                        <div className="recent-header">

                            <div>

                                <h2>
                                    Recent Policies
                                </h2>

                                <p>
                                    Your recently added policies
                                </p>

                            </div>


                            <Link to="/policies">
                                View All
                            </Link>

                        </div>


                        {policies.length === 0 ? (

                            <div className="empty-policies">

                                <div>
                                    📄
                                </div>

                                <h3>
                                    No policies added yet
                                </h3>

                                <p>
                                    Add your first policy to start tracking it.
                                </p>

                            </div>

                        ) : (

                            <div className="table-wrapper">

                                <table className="recent-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                Policy
                                            </th>

                                            <th>
                                                Company
                                            </th>

                                            <th>
                                                Type
                                            </th>

                                            <th>
                                                Premium
                                            </th>

                                            <th>
                                                Maturity
                                            </th>

                                            <th>
                                                Status
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {policies
                                            .slice(0, 5)
                                            .map((policy) => (

                                                <tr key={policy.id}>

                                                    <td className="policy-name">
                                                        {policy.policyName}
                                                    </td>

                                                    <td>
                                                        {policy.company}
                                                    </td>

                                                    <td>
                                                        {policy.policyType}
                                                    </td>

                                                    <td>
                                                        ₹ {policy.premiumAmount}
                                                    </td>

                                                    <td>
                                                        {policy.maturityDate}
                                                    </td>

                                                    <td>

                                                        <span className="status-badge">
                                                            {policy.status}
                                                        </span>

                                                    </td>

                                                </tr>

                                            ))}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>


                </div>

            </main>

        </div>

    );

}

export default Dashboard;