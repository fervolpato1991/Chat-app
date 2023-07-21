import React from 'react';
import style from './InfoBar.module.css';
import 'boxicons/css/boxicons.min.css';

const InfoBar = ({room}) => {
    return (
        <div className={style.infoBar}>
            <div className={style.leftInnerContainer}>
            <i className='bx bx-signal-5'></i>
                <h3>{room}</h3>
            </div>
            <div className={style.rightInnerContainer}>
                <a href="/"><i className='bx bx-window-close'></i></a>
            </div>
        </div>
    )
}

export default InfoBar;