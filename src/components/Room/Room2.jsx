import "./Room.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import RoomContext from "../../store/RoomContext";
import { useParams} from 'react-router-dom';

export default function Room2(props){
    const roomCtx = useContext(RoomContext);
    const [code, setCode] = useState("");

    const {roomName} = useParams();
    console.log(roomName);

    useEffect(()=>{
        roomCtx.findPrivateData(roomName);
        setCode(roomCtx.privateData);
    },[roomCtx, roomName])

    function updatePrivateData(){
        roomCtx.updatePrivateData(roomName, code);
    }

    return (
        <>
            <div className="room-heading">{props.roomType}</div>
            <div className="room-description">
                <textarea name="" id="" cols="30" rows="10" value={code} onChange={(e)=>{setCode(e.target.value)}}/>
            </div>
            <div className="button-box">
                <button className="save" onClick={updatePrivateData}>Save Changes</button>
                <Link className="back-link" to="/"> <button className="back">  Go Back </button> </Link>
            </div>
        </>
    );
}