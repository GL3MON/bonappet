import { useState } from 'react';
import '../styles/ChatBot.css';
import { color, motion, useScroll, useTransform } from 'framer-motion';

const ChatBot = () => {
    const [Chats, setChats] = useState([]);
    const button_effect = {
        tap : {
            scale: 0.9,
        },
        hover : {
            scale: 1.1,
        }
    }

    const add_chat = () => {
        const user_text = document.getElementById("user-text");
        if (user_text.value){
            setChats([
                ...Chats,
                {
                    "role": "user",
                    "content": user_text.value,
                },
            ]);
            console.log(Chats);
            user_text.value = "";
        }
    }

    return <div className="chatbot-container">
        <h1 className="chatbot-title">Bon <span style={{color:"rgb(255, 255, 255)"}} >Appet</span></h1>
        <div className='chatbot-area'>
            <div className="chatbot-chatarea">
                {
                    Chats.map((item, index)=>(
                        <div key={index} className={item["role"]== "user" ? "user-chat" : "bot-chat"}>
                            <span>{item["content"]}</span>
                        </div>
                    ))
                }
            </div>
            <div className='chatbot-menu'>
                <motion.div variants={button_effect} whileHover={"hover"} whileTap={"tap"} onClick={() => {add_chat()}} className='send-button'>Send</motion.div>
                <textarea id="user-text"></textarea>
            </div>
        </div>
    </div>
}

export default ChatBot;