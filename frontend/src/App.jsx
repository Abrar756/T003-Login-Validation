import { useState } from "react";
import "./App.css";

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        // Clear previous messages
        setError("");
        setSuccess("");


        // 1. Check empty email
        if (!email) {
            setError("Please enter your email.");
            return;
        }


        // 2. Check email format
        if (!email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }


        // 3. Check empty password
        if (!password) {
            setError("Please enter your password.");
            return;
        }


        // 4. Send login information to backend
        try {
            const response = await fetch(
                "http://localhost:5000/api/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );


            // Convert response into JSON
            const data = await response.json();


            // 5. Login failed
            if (!response.ok) {
                setError(
                    data.message || "Invalid email or password."
                );
                return;
            }


            // 6. Login successful
            setSuccess(data.message);

        } catch (error) {

            // 7. Backend/server unavailable
            setError(
                "Unable to connect to the server. Please try again."
            );
        }
    };


    return (
        <div className="login-container">

            <div className="login-box">

                <h1>Login</h1>

                <p className="subtitle">
                    T-003 Login Validation Demo
                </p>


                <form onSubmit={handleLogin}>

                    <label>Email</label>

                    <input
                      type="text"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                       />


                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />


                    {/* Error message */}

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}


                    {/* Success message */}

                    {success && (
                        <p className="success-message">
                            {success}
                        </p>
                    )}


                    <button type="submit">
                        Login
                    </button>

                </form>


                <div className="test-account">

                    <p>Test Account</p>

                    <p>
                        Email: test@gmail.com
                    </p>

                    <p>
                        Password: 123456
                    </p>

                </div>

            </div>

        </div>
    );
}

export default App;