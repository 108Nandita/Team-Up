import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import iconHome from '../../assets/HomeIcon.png';
import logo from '../../assets/TeamBuildingLogo.png';
import iconProfile from '../../assets/ProfilelIcon.png';
import iconLogout from '../../assets/LogOutIcon.png';

function NavBar() {
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('token');
        logout();
        navigate('/');
    }

    return (
        <nav>
            <div className='logo-container'>
                <img className='img' src={logo} alt='logo' />
                <h1>TEAM UP</h1>
            </div>

            <div className='logo-container'>
                <div>
                    <p>
                        <strong>{user.username}</strong>
                    </p>
                </div>

                <div>
                    <img src={iconProfile} alt='Profile' onClick={() => navigate('/profile')} />
                </div>

                <div>
                    <img src={iconHome} alt='Home' onClick={() => navigate('/home')} />
                </div>

                <div>
                    <img src={iconLogout} alt='Logout Icon' onClick={handleLogout} />
                </div>
            </div>
        </nav>
    );
}

export default NavBar;