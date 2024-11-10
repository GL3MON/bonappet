import { useEffect, useState, useRef } from 'react';
import '../styles/ChatBot.css';
import axios from 'axios';
import { color, motion, useScroll, useTransform } from 'framer-motion';

const ChatBot = () => {
    const [Chats, setChats] = useState([]);
    const [disableSend, setDisableSend] = useState(false);
    const button_effect = {
        tap : {
            scale: 0.9,
        },
        hover : {
            scale: 1.1,
        }
    }
    
    const chatBoxRef = useRef(null);

    const scrollToBottom = () => {
        const chatBox = chatBoxRef.current;
        if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [Chats]);
    
    const clear_chats = async () => {
        try {
            const clear_response = await axios.post("http://127.0.0.1:8000/clear/", {"action": "erase"});
            console.log("Cleared Successfull");
            setChats([]);
        }catch (e){
            console.log(e);
        }
    }

    const add_user_chat = async () => {
        const user_text = document.getElementById("user-text");
        const message = user_text.value;
    
        if (message) {
            setChats((prevChats) => [
                ...prevChats,
                { "role": "user", "content": message },
            ]);
            user_text.value = "";
        }
    
        setDisableSend(true);
    
        try {
            const bot_response = await axios.post("http://127.0.0.1:8000/chat/", { "query": message });
    
            if (bot_response.data.response) {
                setChats((prevChats) => [
                    ...prevChats,
                    { "role": "bot", "content": bot_response.data.response },
                ]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setDisableSend(false);
        }
    };
    
    useEffect(() => {clear_chats()}, []);


    return <div className="chatbot-container">
        <h1 className="chatbot-title">Bon <span style={{color:"rgb(255, 255, 255)"}} >Appet</span></h1>
        <div className='chatbot-area'>
            <div className="chatbot-chatarea" ref={chatBoxRef}>
                {
                    Chats.map((item, index)=>(
                        <div key={index} className={item["role"]== "user" ? "user-chat" : "bot-chat"}>
                            <span>{item["content"]}</span>
                        </div>
                    ))
                }
                {
                    disableSend && <div className="bot-chat">
                        <span>Thinking . . .</span>
                    </div>
                }
            </div>
            <div className='chatbot-menu'>
                <motion.div variants={button_effect} whileHover={"hover"} whileTap={"tap"} onClick={() => {add_user_chat()}} className='send-button'>{disableSend ? "Wait" : "Send"}</motion.div>
                <motion.div className="clear" variants={button_effect} whileHover={"hover"} whileTap={"tap"} onClick={() => {clear_chats()}}>Clear</motion.div>
                <textarea id="user-text"></textarea>
            </div>
        </div>
    </div>
}

export default ChatBot;