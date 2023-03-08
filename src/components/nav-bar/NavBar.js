import React, {useContext, useEffect,} from 'react';
import axios from "axios";
import logo from '../../assets/TeamBuildingLogo.png';
import iconHome from '../../assets/HomeIcon.png';
import iconProfile from '../../assets/ProfilelIcon.png';
import iconLogout from '../../assets/LogOutIcon.png';
import ImageLink from '../../helper/ImageLink';
import {AuthContext} from "../../context/AuthContext";



function NavBar() {

    const {logout, user} = useContext(AuthContext);

    useEffect(() => {
        const controller = new AbortController();
        async function getPrivateContent() {
            try {
                const response = await axios.get(' https://frontend-educational-backend.herokuapp.com/api/user');
                console.log(response);

            } catch (e) {
                console.error(e)
            }
        }
        void getPrivateContent();
        return function cleanup() {
            controller.abort();
        }
    }, []);



    return (
        <>
            <nav>

          <span className="logo-container">
            <img className="img" src={logo} alt="logo"/>
            <h1>
              TEAM UP
            </h1>
          </span>

                <span className="logo-container">

                <div>
              <p><strong>{user.username}</strong></p>
                     </div>

                    <div>
            <ImageLink to="/profile" src={iconProfile} alt="Profile"/>
         </div>

                <div>
            <ImageLink to="/home" src={iconHome} alt="Home"/>
          </div>

                <div>
            <ImageLink to="/" src={iconLogout} alt="log Out Icon" onClick={logout}/>
          </div>

</span>
            </nav>
        </>
    )
}

export default NavBar;