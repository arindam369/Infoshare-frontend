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
    
    console.log(privateRoomFound);
    
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
    const createPrivateRoom = (room_name, room_pass)=>{
        const CREATE_URL = `http://localhost:5000/rooms`;
        axios.post(CREATE_URL, {roomName: room_name, roomPass: room_pass, code: ""}).then((response)=>{
            console.log(response.data);
            console.log(room_pass);         // why this is undefined ??
            if(response.data.code && response.data.code===11000){
                throw new Error("Room already Registered");
            }
            console.log("Room not registered");
            // setPrivateData(response.data[0].code);
            // setPrivateRoomFound(true);
            findPrivateData(room_name, room_pass);
            return response;
        }).catch((err)=>{
            console.log("Room Already registered ---------------------");
            setPrivateRoomFound(false);
            setPrivateData("");
            toast.error("Room already registered");
            return {err: err};
        })
    }
    const findPrivateData = (room_name, room_pass)=>{
        const SEARCH_URL = `http://localhost:5000/rooms/${room_name}`;
        axios.get(SEARCH_URL).then((response)=>{
            console.log(response.data);
            console.log(room_pass);     // why this is undefined ??
            if(response.data[0].roomPass === room_pass){
                setPrivateData(response.data[0].code);
                setPrivateRoomFound(true);
                console.log("no error: everything fine");
                return response;
            }
            else{
                console.log("error: room pass mismatched");
                setPrivateRoomFound(false);
                setPrivateData("");
                return new Error("Room Password Mismatched");
            }
        }).catch((err)=>{
            setPrivateRoomFound(false);
            setPrivateData("");
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