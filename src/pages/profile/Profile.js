import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import NavBar from "../../components/nav-bar/NavBar";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input"
import ProfilePicture from "./Profile.css";

function Profile() {
    const { user, setUser } = useContext(AuthContext);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setUsername(user.username);
        setEmail(user.email);
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
            const formData = new FormData();
            formData.append("username", username);
            formData.append("email", email);
            formData.append("password", newPassword);
            formData.append("image", profilePic);

            const response = await axios.put(
                `https://frontend-educational-backend.herokuapp.com/api/user`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setUser(response.data);
            setMessage("Profile updated successfully!");
        } catch (error) {
            console.error(error);
            setMessage("Something went wrong. Please try again later.");
        }
    }

    function handleImageUpload(e) {
        e.preventDefault();
        setProfilePic(e.target.files[0]);
    }

    return (
        <>
            <NavBar />
            <header className="outer-container">
                <div className="inner-container">
                    <h1>Profile</h1>
                    {message && <p className="message">{message}</p>}
                </div>
            </header>

            <main className="outer-container">
                <form className="inner-container1" onSubmit={updateUser}>
                    <div className="position">
                        <div>
                            <Input
                                label="Username"
                                name="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <br />
                            <br />

                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <br />
                        <br />

                        <div className=".profile-pic.inner-container1">
                            {profilePic && (
                                <img
                                    className="profile-picture"
                                    src={URL.createObjectURL(profilePic)}
                                    alt="Profielfoto"
                                />
                            )}
                        </div>
                    </div>
                    <br />
                    <br />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        label="New password"
                        name="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Input
                        label="Confirm new password"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <br />
                    <br />

                    <label style={{ display: "inline-block", width: "140px" }}>
                        Profielfoto:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </label>

                    <br />
                    <br />

                    <Button type="submit">Wijzigingen opslaan</Button>

                    <br />
                    <br />
                </form>
            </main>

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