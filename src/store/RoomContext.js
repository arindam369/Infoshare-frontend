import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const RoomContext = React.createContext({
    publicData: "",
    privateData: "",
    findPublicData: ()=>{},
    updatePublicData: (codeVal)=>{},
    findPrivateData: (room_name)=>{},
    updatePrivateData: (room_name, codeVal)=>{},
});

export const RoomContextProvider = (props)=>{
    const [publicData, setPublicData] = useState("");
    const [privateData, setPrivateData] = useState("");
    
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
    const findPrivateData = (room_name)=>{
        const SEARCH_URL = `http://localhost:5000/rooms/${room_name}`;
        axios.get(SEARCH_URL).then((response)=>{
            console.log(response.data[0]);
            setPrivateData(response.data[0].code);
            return response;
        }).catch((err)=>{
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
        findPublicData: findPublicData,
        updatePublicData: updatePublicData,
        findPrivateData: findPrivateData,
        updatePrivateData: updatePrivateData
    }

    return <RoomContext.Provider value={roomContext}> {props.children} </RoomContext.Provider>
}

export default RoomContext;