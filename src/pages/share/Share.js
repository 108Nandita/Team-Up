import React from "react";
import ChatWidget from "../../components/chat/Chat";
import ShareStyle from "./ShareStyle.css";

const Share = () => {
    return (
        <div className="outer-container">
            <main className="inner-container">
                <h1>Share your thoughts</h1>
                <div className="chat-container">
                    <ChatWidget />
                </div>
            </main>
        </div>
    );
};
export default Share;
