import React, {useState} from 'react'
import '../styles/Message.css'

export default function MyMessage(props) {
    const [isShown, setIsShown] = useState(false);
    const data = props.data;

    const onMouseEnter = () => {
        setIsShown(true);
    }

    const onMouseLeave = () => {
        setIsShown(false);
    }

    const onEdit = (e) => {
        const id = data.id;
        props.editMessage(id);
    }

    const getEditButton = () => {
        return isShown ? <i className='fa fa-cog' onClick={onEdit}></i> : null;
    }

    const onDelete = () => {
        props.deleteMessage(data.id);
    }

    return (
        <div className="my-message-container" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className='message-text'>{data.message}</div>
            <div className='message-date'>{data.created_at}</div>
            <i className='fa fa-heart'></i>
            <i className='fa fa-times' onClick={onDelete}></i>
            {getEditButton()}
        </div>
    );
}

