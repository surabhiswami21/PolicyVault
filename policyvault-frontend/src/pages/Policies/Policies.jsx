import "./Policies.css";

import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";

import api from "../../api/axiosConfig";


function Policies() {

    const navigate = useNavigate();

    const [policies, setPolicies] = useState([]);


    // Fetch all policies
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

                navigate("/login", { replace: true });

            }

        }

    }, [navigate]);


    // Delete policy
    const deletePolicy = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this policy?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await api.delete(
                `/api/policies/${id}`
            );

            alert(response.data);

            fetchPolicies();

        } catch (error) {

            console.log(error);

            if (error.response?.status === 401) {

                localStorage.removeItem("token");
                localStorage.removeItem("userEmail");

                navigate("/login", { replace: true });

                return;
            }

            alert("Failed to delete policy");

        }

    };


    // Check login and load policies
    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {

            navigate("/login", { replace: true });

            return;
        }

        fetchPolicies();

    }, [fetchPolicies, navigate]);


    return (

        <div className="dashboard">

            <Sidebar />

            <main className="dashboard-content">

                <Navbar />

                <div className="policies-container">


                    {/* Header */}

                    <div className="policy-header">

                        <div>

                            <h1>
                                All Policies
                            </h1>

                            <p>
                                Manage and track all your policies
                            </p>

                        </div>


                        <Link to="/add-policy">

                            <button>
                                + Add Policy
                            </button>

                        </Link>

                    </div>


                    {/* No policies */}

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

                            <Link to="/add-policy">

                                <button>
                                    Add Your First Policy
                                </button>

                            </Link>

                        </div>

                    ) : (


                        /* Policies Table */

                        <div className="table-wrapper">

                            <table>

                                <thead>

                                    <tr>

                                        <th>
                                            Policy
                                        </th>

                                        <th>
                                            Company
                                        </th>

                                        <th>
                                            Policy No.
                                        </th>

                                        <th>
                                            Type
                                        </th>

                                        <th>
                                            Premium
                                        </th>

                                        <th>
                                            Premium Date
                                        </th>

                                        <th>
                                            Maturity
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {policies.map((policy) => (

                                        <tr key={policy.id}>


                                            <td>
                                                {policy.policyName}
                                            </td>


                                            <td>
                                                {policy.company}
                                            </td>


                                            <td>
                                                {policy.policyNumber}
                                            </td>


                                            <td>
                                                {policy.policyType}
                                            </td>


                                            <td>
                                                ₹ {policy.premiumAmount}
                                            </td>


                                            <td>
                                                {policy.premiumDate}
                                            </td>


                                            <td>
                                                {policy.maturityDate}
                                            </td>


                                            <td>

                                                <span className="status-badge">
                                                    {policy.status}
                                                </span>

                                            </td>


                                            <td>

                                                <div className="action-buttons">


                                                    {/* View */}

                                                    <Link
                                                        to={`/policy/${policy.id}`}
                                                    >

                                                        <button
                                                            className="view-btn"
                                                        >
                                                            View
                                                        </button>

                                                    </Link>


                                                    {/* Edit */}

                                                    <Link
                                                        to={`/edit-policy/${policy.id}`}
                                                    >

                                                        <button
                                                            className="edit-btn"
                                                        >
                                                            Edit
                                                        </button>

                                                    </Link>


                                                    {/* Delete */}

                                                    <button
                                                        className="delete-btn"
                                                        onClick={() =>
                                                            deletePolicy(policy.id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>


                                                </div>

                                            </td>


                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </main>

        </div>

    );

}


export default Policies;