import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {toast} from "react-toastify";

const RoomContext = React.createContext({
    publicData: "",
    privateData: "",
    privateRoomFound: "",
    findPublicData: ()=>{},
    updatePublicData: (codeVal)=>{},
    createPrivateRoom: (room_name)=>{},
    findPrivateData: (room_name)=>{},
    updatePrivateData: (room_name, codeVal)=>{},
});

export const RoomContextProvider = (props)=>{
    const [publicData, setPublicData] = useState("");
    const [privateData, setPrivateData] = useState("");
    const [privateRoomFound, setPrivateRoomFound] = useState(false);
    
    const findPublicData = ()=>{
        const SEARCH_URL = `http://localhost:5000/public-room`;
        axios.get(SEARCH_URL).then((response)=>{
            console.log(response.data[0]);
            setPublicData(response.data[0].code);
            return response;
        }).catch((err)=>{
            return {err: err};
        })
    }
    const updatePublicData = (codeVal)=>{
        const UPDATE_URL = `http://localhost:5000/public-room`;
        axios.patch(UPDATE_URL, {code: codeVal}).then((response)=>{
            console.log(response.data);
            setPublicData(response.data.code);
            return response;
        }).catch((err)=>{
            return {err: err};
        })
    }
    const createPrivateRoom = (room_name)=>{
        const CREATE_URL = `http://localhost:5000/rooms`;
        axios.post(CREATE_URL, {roomName: room_name, code: ""}).then((response)=>{
            console.log(response.data[0]);
            setPrivateData(response.data[0].code);
            setPrivateRoomFound(true);
            return response;
        }).catch((err)=>{
            setPrivateRoomFound(false);
            toast.error("Room already registered");
            return {err: err};
        })
    }
    const findPrivateData = (room_name)=>{
        const SEARCH_URL = `http://localhost:5000/rooms/${room_name}`;
        axios.get(SEARCH_URL).then((response)=>{
            console.log(response.data[0]);
            setPrivateData(response.data[0].code);
            setPrivateRoomFound(true);
            return response;
        }).catch((err)=>{
            setPrivateRoomFound(false);
            return {err: err};
        })
    }
    const updatePrivateData = (room_name, codeVal)=>{
        const UPDATE_URL = `http://localhost:5000/rooms/${room_name}`;
        axios.patch(UPDATE_URL, {code: codeVal}).then((response)=>{
            console.log(response.data);
            setPrivateData(response.data.code);
            return response;
        }).catch((err)=>{
            return {err: err};
        })
    }

    const roomContext = {
        publicData: publicData,
        privateData: privateData,
        privateRoomFound: privateRoomFound,
        findPublicData: findPublicData,
        updatePublicData: updatePublicData,
        createPrivateRoom: createPrivateRoom,
        findPrivateData: findPrivateData,
        updatePrivateData: updatePrivateData
    }

    return <RoomContext.Provider value={roomContext}> {props.children} </RoomContext.Provider>
}

export default RoomContext;