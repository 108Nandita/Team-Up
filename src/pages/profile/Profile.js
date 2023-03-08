import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import NavBar from "../../components/nav-bar/NavBar";
import ProfilePicture from "./Profile.css"

function Profile() {
    const { user, setUser } = useContext(AuthContext);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState(user.image);
    const [message, setMessage] = useState("");
    const [profilePic, setProfilePic] = useState("");




    useEffect(() => {
        setUsername(user.username);
        setEmail(user.email);
        setImagePreview(user.image);
    }, [user]);

    async function updateUser(e) {
        e.preventDefault();
        if (password !== "") {
            if (newPassword === "") {
                setMessage("Please enter a new password");
                return;
            } else if (newPassword !== confirmPassword) {
                setMessage("New passwords do not match");
                return;
            }
        }

        try {
            const response = await axios.put(
                `https://frontend-educational-backend.herokuapp.com/api/users/${user._id}`,
                {
                    username: username,
                    email: email,
                    password: newPassword,
                },
                { withCredentials: true }
            );
            setUser(response.data.user);
            setMessage("Profile updated successfully!");
        } catch (e) {
            console.error(e);
            setMessage("Something went wrong. Please try again later.");
        }
    }

    async function handleImageUpload(e) {
        e.preventDefault();
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        try {
            const response = await axios.post(
                `https://frontend-educational-backend.herokuapp.com/api/users/${user._id}/image`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setImagePreview(response.data.image);
            setUser(response.data.user);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <NavBar/>
            <header className="outer-container">
                <div className="inner-container">
                    <h1>Profile</h1>
                    {message && <p className="message">{message}</p>}
                </div>
            </header>

            <main className="outer-container">
                <form className="inner-container1, " onSubmit={updateUser}>
                    <label style={{ display: "inline-block", width: "140px" }}>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>

                    <br/>
                    <br/>

                    <label style={{ display: "inline-block", width: "140px" }}>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    <br/>
                    <br/>

                    <label style={{ display: "inline-block", width: "140px" }}>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <label style={{ display: "inline-block", width: "140px" }}>
                        New password:
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </label>
                    <label style={{ display: "inline-block", width: "140px" }}>
                        Confirm new password:
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </label>

                    <br/>
                    <br/>

                    <label style={{ display: "inline-block", width: "140px" }}>
                        Profielfoto:
                        <input
                            type="file"
                            onChange={(e) => setProfilePic(e.target.files[0])}
                        />
                    </label>

                    <br/>
                    <br/>

                    <button type="submit">Wijzigingen opslaan</button>

                    <br/>
                    <br/>
                </form>
            </main>



            <div className="profile-pic, inner-container1">
                {profilePic && (
                    <img className="profile-picture" src={URL.createObjectURL(profilePic)} alt="Profielfoto" />
                )}
            </div>


            <footer className="outer-container">
                <div className="inner-container1">
                    <h2>Gekoppelde klanten</h2>
                    <ul>
                        <li>Klant 1</li>
                        <li>Klant 2</li>
                        <li>Klant 3</li>
                    </ul>
                </div>
            </footer>
        </>
    );
}

export default Profile;

