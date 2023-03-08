import React, { useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState([""]);

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    async function registerUser(e) {
        e.preventDefault();
        console.log("De gebruiker is geregistreerd 👤");
        try {
            const response = await axios.post(
                "https://frontend-educational-backend.herokuapp.com/api/auth/signup",
                {
                    email: email,
                    username: username,
                    password: password,
                    role: ["user"],
                }
            );
            console.log("Response in register: " , response.data);
            navigate('/');

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <body className="outer-container">

                <form className="inner-container" onSubmit={registerUser}>

                    <h1>Registreren</h1>

                    <input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <br/>

                    <input
                        placeholder="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <br/>

                    <input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <br/>

                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="">Select a role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                    <br/>

                    <button type="submit">Sign Up</button>
                </form>
            </body>
        </>
    );
}

export default Register;