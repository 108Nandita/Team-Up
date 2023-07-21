import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../../components/input/Input'
import registerStyle from './Register.css';


function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const navigate = useNavigate();

    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    async function registerUser(e) {
        e.preventDefault();

        try {
            if (!email.includes('@')) {
                setEmailError('Email mist een @');
                return;
            } else {
                setEmailError('');
            }

            if (username.includes('@')) {
                setUsernameError('Gebruikersnaam mag geen @ bevatten');
                return;
            } else {
                setUsernameError('');
            }

            if (password.length < 6) {
                setPasswordError('Gebruik voor het wachtwoord minimaal 6 tekens');
                return;
            } else {
                setPasswordError('');
            }

            const response = await axios.post(
                'https://frontend-educational-backend.herokuapp.com/api/auth/signup',
                {
                    email: email,
                    username: username,
                    password: password,
                    role: [role],
                }
            );
            console.log('Response in register:', response.data);
            navigate('/');

            console.log('De gebruiker is geregistreerd 👤');
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <body className="outer-container">
            <form className="inner-container-register" onSubmit={registerUser}>
                <h1>Registreren</h1>

                <br />

                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={emailError} // Gebruik de "error" prop voor het weergeven van foutmeldingen
                />

                <br />

                <Input
                    label="Gebruikersnaam"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={usernameError} // Gebruik de "error" prop voor het weergeven van foutmeldingen
                />

                <br />

                <Input
                    label="Wachtwoord"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordError} // Gebruik de "error" prop voor het weergeven van foutmeldingen
                />

                <br />

                <br />

                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Select a role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <br />

                <button type="submit">Sign Up</button>
            </form>
            </body>
        </>
    );
}

export default Register;