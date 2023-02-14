import React, { useContext, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function SignIn() {

    const [ email, setEmail ] = useState( "" )
    const [ password, setPassword ] = useState( "" )

    const { login } = useContext( AuthContext )

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin',{
                "username": "user",
                "password" : "123456",
            })
            login( response.data.id )
        } catch ( e ) {
            console.error( e )
        }
    }

    return (
        <main className="container">
            <h1>Login</h1>
            <form onSubmit={ handleLogin }>
                <input placeholder="Email" type="email" value={ email } onChange={ e => setEmail( e.target.value ) }/>
                <input placeholder="Password" type="password" value={ password } onChange={ e => setPassword( e.target.value ) }/>
                <button type="submit">Login</button>
            </form>
        </main>
    );
}

export default SignIn;