import "./PolicyDetails.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";

import api from "../../api/axiosConfig";


function PolicyDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [policy, setPolicy] = useState(null);

    const [loading, setLoading] = useState(true);


    // =========================
    // FETCH POLICY
    // =========================

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {

            navigate("/login", { replace: true });

            return;
        }


        const fetchPolicy = async () => {

            try {

                const response = await api.get(
                    `/api/policies/${id}`
                );

                setPolicy(response.data);

            } catch (error) {

                console.log(error);

                if (error.response?.status === 401) {

                    localStorage.removeItem("token");
                    localStorage.removeItem("userEmail");

                    navigate("/login", { replace: true });

                    return;
                }


                if (error.response?.status === 404) {

                    alert("Policy Not Found");

                    navigate("/policies");

                    return;
                }

            } finally {

                setLoading(false);

            }

        };


        fetchPolicy();

    }, [id, navigate]);


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (

            <div className="dashboard">

                <Sidebar />

                <main className="dashboard-content">

                    <Navbar />

                    <div className="policy-details-container">

                        <h2>
                            Loading policy...
                        </h2>

                    </div>

                </main>

            </div>

        );

    }


    // =========================
    // POLICY NOT FOUND
    // =========================

    if (!policy) {

        return (

            <div className="dashboard">

                <Sidebar />

                <main className="dashboard-content">

                    <Navbar />

                    <div className="policy-details-container">

                        <h2>
                            Policy not found
                        </h2>

                        <Link to="/policies">
                            Back to Policies
                        </Link>

                    </div>

                </main>

            </div>

        );

    }


    // =========================
    // POLICY DETAILS
    // =========================

    return (

        <div className="dashboard">

            <Sidebar />

            <main className="dashboard-content">

                <Navbar />


                <div className="policy-details-container">


                    {/* Header */}

                    <div className="policy-details-header">

                        <div>

                            <p className="eyebrow">
                                Policy details
                            </p>

                            <h1>
                                {policy.policyName}
                            </h1>

                            <p>
                                {policy.company}
                            </p>

                        </div>


                        <div className="policy-details-actions">

                            <Link
                                to="/policies"
                                className="back-button"
                            >
                                ← Back
                            </Link>


                            <Link
                                to={`/edit-policy/${policy.id}`}
                                className="edit-button"
                            >
                                Edit Policy
                            </Link>

                        </div>

                    </div>


                    {/* Status */}

                    <div className="policy-status-card">

                        <span className="status-dot" />

                        <div>

                            <span>
                                Current Status
                            </span>

                            <strong>
                                {policy.status}
                            </strong>

                        </div>

                    </div>


                    {/* Main Details */}

                    <div className="policy-details-grid">


                        {/* Identification */}

                        <section className="details-card">

                            <h2>
                                Policy Information
                            </h2>


                            <div className="detail-row">

                                <span>
                                    Policy Name
                                </span>

                                <strong>
                                    {policy.policyName || "-"}
                                </strong>

                            </div>


                            <div className="detail-row">

                                <span>
                                    Company
                                </span>

                                <strong>
                                    {policy.company || "-"}
                                </strong>

                            </div>


                            <div className="detail-row">

                                <span>
                                    Policy Number
                                </span>

                                <strong>
                                    {policy.policyNumber || "-"}
                                </strong>

                            </div>


                            <div className="detail-row">

                                <span>
                                    Policy Type
                                </span>

                                <strong>
                                    {policy.policyType || "-"}
                                </strong>

                            </div>

                        </section>


                        {/* Financial Details */}

                        <section className="details-card">

                            <h2>
                                Financial Details
                            </h2>


                            <div className="detail-row">

                                <span>
                                    Premium Amount
                                </span>

                                <strong>
                                    {policy.premiumAmount != null
                                        ? `₹ ${policy.premiumAmount}`
                                        : "-"}
                                </strong>

                            </div>


                            <div className="detail-row">

                                <span>
                                    Premium Date
                                </span>

                                <strong>
                                    {policy.premiumDate || "-"}
                                </strong>

                            </div>


                            <div className="detail-row">

                                <span>
                                    Maturity Date
                                </span>

                                <strong>
                                    {policy.maturityDate || "-"}
                                </strong>

                            </div>


                            <div className="detail-row">

                                <span>
                                    Status
                                </span>

                                <strong>
                                    {policy.status || "-"}
                                </strong>

                            </div>

                        </section>


                    </div>


                    {/* Bottom Action */}

                    <div className="policy-details-footer">

                        <Link
                            to="/policies"
                            className="footer-back-button"
                        >
                            ← Back to All Policies
                        </Link>


                        <Link
                            to={`/edit-policy/${policy.id}`}
                            className="footer-edit-button"
                        >
                            Edit This Policy →
                        </Link>

                    </div>


                </div>

            </main>

        </div>

    );

}


export default PolicyDetails;