import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import style from './Chat.module.css';
const ENDPOINT = 'localhost:5000';

let socket;

const Chat = () => {
    const location = useLocation();
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
      
        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);
      
        socket.emit('join', { name, room }, (error) => {
          if (error) {
            alert(error); // Mostrar el error en una ventana de alerta o de otra manera
          }
        });
      }, [location.search]);

    useEffect(() => {
        socket.on('message' , (message) => {
            setMessages([...messages, message]);
        });
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message, messages);
    return (
        <div className={style.outerContainer}>
            <div className={style.container}>
                <input value={message} 
                onChange={(event) => setMessage(event.target.value)} 
                onKeyDown={event => event.key === 'Enter' ? sendMessage(event) : null} />
            </div>
        </div>
    )
};

export default Chat;