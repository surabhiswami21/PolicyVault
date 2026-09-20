import "./AddPolicy.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../api/axiosConfig";

import Sidebar from "../../Components/Sidebar/Sidebar";

function AddPolicy() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [policy, setPolicy] = useState({
        policyName: "",
        company: "",
        policyNumber: "",
        premiumAmount: "",
        premiumDate: "",
        maturityDate: "",
        policyType: "",
        status: "Active"
    });

    // Check login
    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login", { replace: true });
        }

    }, [navigate]);


    // Handle input changes
    const handleChange = (e) => {

        setPolicy({
            ...policy,
            [e.target.name]: e.target.value
        });

    };


    // Fetch policy when editing
    useEffect(() => {

        if (!id) {
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

                }

            }

        };

        fetchPolicy();

    }, [id, navigate]);


    // Add / Update policy
    const savePolicy = async (e) => {

        e.preventDefault();

        try {

            if (id) {

                const response = await api.put(
                    `/api/policies/${id}`,
                    policy
                );

                alert(response.data);

            } else {

                const response = await api.post(
                    "/api/policies",
                    policy
                );

                alert(response.data);

            }

            navigate("/policies");

        } catch (error) {

            console.log(error);

            if (error.response?.status === 401) {

                localStorage.removeItem("token");
                localStorage.removeItem("userEmail");

                alert("Session expired. Please login again.");

                navigate("/login", { replace: true });

                return;
            }

            alert("Operation Failed");

        }

    };


    return (

        <div className="add-policy-layout">

            <Sidebar />

            <main className="add-policy-content">

                <header className="add-policy-topbar">

                    <div>

                        <p className="eyebrow">
                            Policy workspace
                        </p>

                        <h1>
                            {id ? "Edit policy" : "Add a new policy"}
                        </h1>

                        <p className="topbar-copy">
                            Keep your coverage, investments, and important dates in one place.
                        </p>

                    </div>

                    <button
                        className="back-link"
                        type="button"
                        onClick={() => navigate("/policies")}
                    >
                        <span aria-hidden="true">←</span>
                        Back to policies
                    </button>

                </header>


                <div className="add-policy-grid">


                    <section className="policy-card">


                        <div className="form-heading">

                            <div
                                className="form-icon"
                                aria-hidden="true"
                            >
                                ✦
                            </div>

                            <div>

                                <h2>Policy details</h2>

                                <p>
                                    Start with the basics, then add the dates and payment details.
                                </p>

                            </div>

                        </div>


                        <form onSubmit={savePolicy}>


                            <div className="form-section">

                                <p className="section-label">
                                    Identification
                                </p>


                                <div className="form-fields">


                                    <label>

                                        Policy name

                                        <input
                                            type="text"
                                            name="policyName"
                                            placeholder="e.g. Family Protection Plan"
                                            value={policy.policyName}
                                            onChange={handleChange}
                                            required
                                        />

                                    </label>


                                    <label>

                                        Provider / company

                                        <input
                                            type="text"
                                            name="company"
                                            placeholder="e.g. Life Insurance Corp."
                                            value={policy.company}
                                            onChange={handleChange}
                                            required
                                        />

                                    </label>


                                    <label>

                                        Policy number

                                        <input
                                            type="text"
                                            name="policyNumber"
                                            placeholder="Enter policy number"
                                            value={policy.policyNumber}
                                            onChange={handleChange}
                                            required
                                        />

                                    </label>


                                    <label>

                                        Policy type

                                        <select
                                            name="policyType"
                                            value={policy.policyType}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option
                                                value=""
                                                disabled
                                            >
                                                Select type
                                            </option>

                                            <option value="Life Insurance">
                                                Life Insurance
                                            </option>

                                            <option value="Health Insurance">
                                                Health Insurance
                                            </option>

                                            <option value="LIC">
                                                LIC
                                            </option>

                                            <option value="PPF">
                                                PPF
                                            </option>

                                            <option value="FD">
                                                Fixed Deposit
                                            </option>

                                            <option value="Other">
                                                Other
                                            </option>

                                        </select>

                                    </label>

                                </div>

                            </div>


                            <div className="form-section">

                                <p className="section-label">
                                    Money & timeline
                                </p>


                                <div className="form-fields">


                                    <label>

                                        Premium amount

                                        <div className="input-with-prefix">

                                            <span>₹</span>

                                            <input
                                                type="number"
                                                min="0"
                                                name="premiumAmount"
                                                placeholder="0.00"
                                                value={policy.premiumAmount}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                    </label>


                                    <label>

                                        Premium date

                                        <input
                                            type="date"
                                            name="premiumDate"
                                            value={policy.premiumDate}
                                            onChange={handleChange}
                                            required
                                        />

                                    </label>


                                    <label>

                                        Maturity date

                                        <input
                                            type="date"
                                            name="maturityDate"
                                            value={policy.maturityDate}
                                            onChange={handleChange}
                                            required
                                        />

                                    </label>


                                    <label>

                                        Current status

                                        <select
                                            name="status"
                                            value={policy.status}
                                            onChange={handleChange}
                                        >

                                            <option value="Active">
                                                Active
                                            </option>

                                            <option value="Matured">
                                                Matured
                                            </option>

                                            <option value="Closed">
                                                Closed
                                            </option>

                                        </select>

                                    </label>

                                </div>

                            </div>


                            <div className="form-actions">

                                <button
                                    className="cancel-button"
                                    type="button"
                                    onClick={() => navigate("/policies")}
                                >
                                    Cancel
                                </button>


                                <button
                                    className="save-button"
                                    type="submit"
                                >
                                    {id ? "Update policy" : "Save policy"}

                                    <span aria-hidden="true">
                                        →
                                    </span>

                                </button>

                            </div>


                        </form>

                    </section>


                    <aside className="policy-preview">

                        <div
                            className="preview-orbit"
                            aria-hidden="true"
                        >
                            P
                        </div>

                        <p className="eyebrow">
                            Quick preview
                        </p>

                        <h2>
                            {policy.policyName || "Your policy"}
                        </h2>

                        <p className="preview-company">
                            {policy.company || "Provider name"}
                        </p>


                        <div className="preview-divider" />


                        <div className="preview-row">

                            <span>Policy type</span>

                            <strong>
                                {policy.policyType || "Not selected"}
                            </strong>

                        </div>


                        <div className="preview-row">

                            <span>Premium</span>

                            <strong>
                                {policy.premiumAmount
                                    ? `₹ ${policy.premiumAmount}`
                                    : "₹ 0"}
                            </strong>

                        </div>


                        <div className="preview-row">

                            <span>Maturity</span>

                            <strong>
                                {policy.maturityDate || "Not set"}
                            </strong>

                        </div>


                        <div className="preview-status">

                            <span className="status-dot" />

                            {policy.status} policy

                        </div>

                    </aside>


                </div>

            </main>

        </div>

    );

}

export default AddPolicy;