import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Join.module.css';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

const nameHandler = (event) => setName(event.target.value);
const roomHandler = (event) => setRoom(event.target.value);
const preventHandler = (event) => {
    return (!name || !room ) ? event.preventDefault() : null
};

    return (
        <div className={style.joinOuterContainer}>
            <div className={style.joinInnerContainer}>
                <h1 className={style.Heading}>Join</h1>
                <div><input placeholder='Name' type='text' onChange={nameHandler} className={style.joinInput}/></div>
                <div><input placeholder='Room' type='text' onChange={roomHandler} className={style.joinInput}/></div>
                <Link onClick={preventHandler} to={`/chat?name=${name}&room=${room}`}>
                <button className={style.button} type="submit">Sing In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;