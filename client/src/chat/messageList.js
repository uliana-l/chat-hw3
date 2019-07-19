import React from 'react'
import Message from './message'
import '../styles/MessageList.css'
import MyMessage from './myMessage';
import DateFunctions from '../helpers/date'

export default function MessageList(props) {
    const compareDates = (i) => {
        const date = new DateFunctions();
        const data = props.data;
        if (data[i+1]) {
            const firstDate = new Date(data[i].created_at);
            const secondDate = new Date(data[i+1].created_at);
            if (!date.isEqual(firstDate, secondDate)) 
            return (
                <div className="date-separator">
                    <div className="date-separator-line"></div>
                    <div className="date-separator-text">
                        {date.getMonthAndDay(secondDate)}
                    </div>
                </div>
            );
            return null;
        } 
        return null;
    }

    const data = props.data;
    return (
        <div className="message-list">
            {data.map((message, i) => {
                if (message.user === props.userData.name) return (
                    <div key={i} className='message-list-item my'>
                        <MyMessage 
                            data={data[i]}
                            deleteMessage={props.deleteMessage}
                            showPage={props.showPage}
                            editMessage={props.editMessage}
                        />
                        {compareDates(i)}
                    </div>
                );
                return (
                    <div key={i} className='message-list-item'>
                        <Message 
                            data={data[i]}
                        />
                        {compareDates(i)}
                    </div>
                    );
                })
            }
        </div>
    );
}

