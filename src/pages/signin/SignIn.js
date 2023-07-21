import React, { useContext, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";
import teamBuildingLogo from '../../assets/TeamBuildingLogo.png'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import signInStyle from './SignIn.css'


function SignIn() {

    const [ username, setUsername ] = useState( "" )
    const [ password, setPassword ] = useState( "" )
    const [ error, setError ] = useState("")

    const navigate = useNavigate();

    const { login } = useContext( AuthContext )


    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
                username: username,
                password: password,
            });
            navigate('/home');
            console.log(response.data);
            login(response.data.accessToken);
        } catch (e) {
            console.error(e);
            setError("De opgegeven combinatie van inlognaam en wachtwoord is ongeldig.");
        }
    }

    return (
        <>
            <header className="outer-container">
                <div className="inner-container">
                    <img src={teamBuildingLogo} alt="Logo Building" id="logoBuilding"/>
                </div>
            </header>

            <br/>

            <body>
            <main className="outer-container">
                <div className="inner-container">
                    <h1>Login</h1>
                    {error && <div className="error">{error}</div>}
                    <br/><br/>
                    <form onSubmit={handleLogin}>
                        <Input
                            label="Username"
                            name="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <br/>

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <br/>
                        <br/>

                        <Button type="submit" className="login-button">
                            Login
                        </Button>

                        <br/>
                        <br/>

                    </form>

                    <p>Heb je nog geen account? <Link to="/register">Registreer</Link> je dan eerst.</p>
                </div>
            </main>
            </body>
        </>
    );
}

export default SignIn;
