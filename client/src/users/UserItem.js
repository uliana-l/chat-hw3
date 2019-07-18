import React from "react";

export default function UserItem (props) {
    const { id, name, avatar, email } = props;
    return (
        <div>
            <div>
                <div>
                    <img src={avatar} alt={name}/>
                    <span style={{ fontSize: "2em", margin: "2px" }}>{name}</span>
                    <span style={{ fontSize: "2em", margin: "2px" }}>{email}</span>
                </div>
                <div>
                    <button onClick={(e) => props.onEdit(id)}> Edit </button>
                    <button onClick={(e) => props.onDelete(id)}> Delete </button>
                </div>
            </div>
        </div>
    );
    
};