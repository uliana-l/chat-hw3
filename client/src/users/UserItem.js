import React from "react";
import '../styles/userItem.css';

export default function UserItem (props) {
    const { id, name, avatar, email } = props;
    return (
        <div className="user-item">
            <img src={avatar} alt={name}/>
            <div className="user-info">
                <div style={{ fontSize: "2em", margin: "2px" }}>username: {name}</div>
                <div style={{ fontSize: "2em", margin: "2px" }}>email: {email}</div>
            </div>
            <div className="user-buttons">
                <button onClick={(e) => props.onEdit(id)}> Edit </button>
                <button onClick={(e) => props.onDelete(id)}> Delete </button>
            </div>
        </div>
    );
    
};