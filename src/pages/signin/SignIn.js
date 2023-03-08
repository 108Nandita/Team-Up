import React, { useContext, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {Link} from "react-router-dom";
import teamBuildingLogo from '../../assets/TeamBuildingLogo.png'

function SignIn() {

    const [ username, setUsername ] = useState( "" )
    const [ password, setPassword ] = useState( "" )

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
        }
    }

    return (
        <body >
<header class="outer-container">
    <div class="inner-container">
            <img src={teamBuildingLogo} alt="Logo Building" />
    </div>
</header>
<br/>

<main class="outer-container">
    <div class="inner-container">
            <h1>Login</h1>
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