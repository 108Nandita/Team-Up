import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending"
    });

    const navigate = useNavigate()

    useEffect(() => {

        const storedToken = localStorage.getItem('token')

        if (storedToken) {
            console.log("De gebruiker is NOG STEEDS ingelogd")
            void fetchUserData(storedToken);
        } else {
            setAuth({
                ...auth,
                isAuth: false,
                user: null,
                status: "done"
            })
        }
    }, [])


    async function fetchUserData(jwt, redirect) {
        try {
            const response = await axios.get('https://frontend-educational-backend.herokuapp.com/api/user', {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`,
                }
            });

            setAuth({
                ...auth,
                isAuth: true,
                user: {
                    email: response.data.email,
                    id: response.data.id,
                    username: response.data.username
                },
                status: "done"
            })
            if (redirect) {
                navigate(redirect)
            }

        } catch (e) {
            console.error(e)
            setAuth({
                ...auth,
                isAuth: false,
                user: null,
                status: "done"
            })
        }
    }

    async function login(jwt) {
        console.log("Gebruiker is ingelogd!");
        localStorage.setItem("token", jwt);

        void await fetchUserData(jwt);
        navigate("/home");
    }


    function logout() {
        console.log("De gebruiker is uitgelogd")
        localStorage.removeItem('token')
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
            status: "done"
        })
        navigate("/signin")
    }

    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        status: auth.status,
        login: login,
        logout: logout
    }

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;


