import React from 'react';
import style from './Message.module.css';


const Message = ({message : {user, text}, name}) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser ?
        (
        <div className={style.messageContainer}>
            <p className={style.sentText}>{trimmedName}</p>
            <div className={style.messageBox}>
                <p className={style.messageText}>{text}</p>
            </div>
        </div>
        ) : (
            <div className={style.messageContainer2}>
            <div className={style.messageBox2}>
                <p className={style.messageText2}>{text}</p>
            </div>
            <p className={style.sentText2}>{trimmedName}</p>
        </div>
        )
    )
}

export default Message;