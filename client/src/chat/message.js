import React, {useState} from 'react'
import '../styles/Message.css'

export default function Message(props) {
    const [isLiked, setLike] = useState(false);
    const onClick = () => {
        setLike(!isLiked);
    };
    const data = props.data;
    const className = isLiked ? 'fa fa-heart is-liked' : 'fa fa-heart';
    return (
        <div className="message-container">
            <img src={data.avatar} alt=''/>
            <div className="message-text">{data.message}</div>
            <div className="message-date">{data.created_at}</div>
            <i className={className} onClick={onClick}></i>
        </div>
    )
}
