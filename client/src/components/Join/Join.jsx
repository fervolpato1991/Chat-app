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
        <div className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                <h1 className='Heading'>Join</h1>
                <div><input placeholder='Name' type='text' onChange={nameHandler} className='joinInput'/></div>
                <div><input placeholder='Room' type='text' onChange={roomHandler} className='joinInput'/></div>
                <Link onClick={preventHandler} to={`/chat?name=${name}&room=${room}`}>
                <button className='button' type="submit">Sing In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;