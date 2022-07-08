import React from "react";
import './CardModule.css';

const Card = (props) => {
    return(
        <div className='card'>
            {props.children}
        </div>

    );
};

export default Card;