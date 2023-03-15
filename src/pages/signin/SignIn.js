import React, { useContext, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";
import teamBuildingLogo from '../../assets/TeamBuildingLogo.png'
import signInStyle from './SignIn.css'

function SignIn() {

    const [ username, setUsername ] = useState( "" )
    const [ password, setPassword ] = useState( "" )
    const [ error, setError ] = useState("")

    const navigate = useNavigate();

    const { login } = useContext( AuthContext )

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin',{
                username: username,
                password: password,
            })
            navigate('/home');
            console.log( response.data )
            login( response.data.accessToken )
        } catch ( e ) {
            console.error( e )
            setError("De opgegeven combinatie van loginnaam en wachtwoord is ongeldig.");
        }
    }

    return (
        <body >
        <header className="outer-container">
            <div className="inner-container">
                <img src={teamBuildingLogo} alt="Logo Building" id="logoBuilding"/>
            </div>
        </header>
        <br/>

        <main className="outer-container">
            <div className="inner-container">
                <h1>Login</h1>
                {error && <div className="error">{error}</div>}
                <form onSubmit={ handleLogin }>
                    <input placeholder="Username" type="username" value={ username } onChange={ e => setUsername( e.target.value ) }/>
                    <br/>
                    <input placeholder="Password" type="password" value={ password } onChange={ e => setPassword( e.target.value ) }/>
                    <br/>
                    <button type="submit">Login</button>
                </form>

                <p>Heb je nog geen account? <Link to="/register">Registreer</Link> je dan eerst.</p>
            </div>
        </main>
        </body>
    );
}

export default SignIn;