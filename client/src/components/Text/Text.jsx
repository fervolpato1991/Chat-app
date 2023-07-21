import React from 'react';
import style from './Text.module.css';

const Text = ({message, setMessage, sendMessage}) => {
    return (
      <form className={style.form}>
        <input className={style.input} value={message} type='text' placeholder='Type a message' onChange={(event) => setMessage(event.target.value)} 
                onKeyDown={event => event.key === 'Enter' ? sendMessage(event) : null} />
        <button className={style.sendButton} onClick={(event) => sendMessage(event)}>Send</button>
      </form>
    )
}

export default Text;