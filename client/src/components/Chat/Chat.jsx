import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import style from './Chat.module.css';
import InfoBar from '../InfoBar/InfoBar';
import Text from '../Text/Text';
import Messages from '../Messages/Messages';
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

    return (
        <div className={style.outerContainer}>
        <div className={style.container}>
          <InfoBar room={room} />
          <div className={style.messageContainer}>
            <Messages messages={messages} name={name} />
          </div>
          <Text message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
      </div>
    )
};

export default Chat;