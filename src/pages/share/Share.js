import React from "react";
import "./ShareStyle.css";
import NavBar from "../../components/nav-bar/NavBar";
import Widget from "../../components/chat/Chat";

const Share = () => {
    return (
        <>
            <NavBar/>
            <div className="outer-container">
                <main className="inner-container">
                    <div className="share-container">
                        <div className="share-content">
                            <h1>Share your thoughts</h1>
                            <p className="chat-direction">Click down below for chatting!</p>
                        </div>
                    </div>
                    <div className="chat-container">
                        <Widget/>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Share;