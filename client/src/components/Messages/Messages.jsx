import React from 'react';
import style from './Messages.module.css';
import Message from '../Message/Message';

import ScrollToBottom from 'react-scroll-to-bottom';

const Messages = ({messages, name}) => {
    return (
        <ScrollToBottom>
            {messages.map((message, i) => <div key={i}>
                <Message message={message} name={name}/>
            </div>)}
        </ScrollToBottom>
    )
}

export default Messages;