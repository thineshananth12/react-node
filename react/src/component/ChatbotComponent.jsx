import { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import socket from './services/socket';
import {userList,useMe} from "../queries/userQueries";
function ChatbotComponent() {
    const {data: loginuser, isuserLoading } = useMe();
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState(0);
    const [searchTerm, setsearchTerm] = useState('');
    const { data: user, isLoading } = userList(page, 10, filter, searchTerm);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [roomId, setroomId] = useState(loginuser?._id);
   
    const handleChange = (selectedOption) => {
        setroomId([selectedOption?.value,loginuser?._id]
        .sort()
        .join('_'));
        socket.emit('join_room', [selectedOption?.value,loginuser?._id]
        .sort()
        .join('_'));
    };
    const loadOptions = async (inputValue) => {
        setsearchTerm(inputValue);
         return (
            user?.data?.data?.map((item) => ({
                value: item._id,
                label: item.name,
            })) || []
            );
    }
    const sendMessage = () => {
        if(message.trim()) {
            socket.emit('send_message', {
                message,
                roomId,
                //name: loginuser?.name,
                senderId: loginuser?._id,
                senderName: loginuser?.name,
            });
            setMessage('');
        }
    };
    useEffect(() => {
        socket.on('receive_message', (data) => {
             console.log('current roomId',roomId);
             setChat((prev) => [...prev, data]);
        });

        return () => {
            socket.off('receive_message');
        };

    }, []);

    return (
        <div>
            <h1>Chat App</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
            <AsyncSelect
                cacheOptions
                defaultOptions
                inputValue={searchTerm}
                loadOptions={loadOptions}
                isLoading={isLoading}
                onChange={handleChange}
                placeholder="Search User..."
            />
            )}
            <input
                type="text"
                value={message}
                onChange={(e) =>
                    setMessage(e.target.value)
                }
            />

            <button onClick={sendMessage}>
                Send
            </button>

            {
                chat.map((msg, index) => (
                    <p key={index}>
                        {msg.senderName}:{msg.message}
                    </p>
                ))
            }
        </div>
    );
}

export default ChatbotComponent;