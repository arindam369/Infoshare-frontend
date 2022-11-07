import "./Room.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import RoomContext from "../../store/RoomContext";

export default function Room(props){
    const [code, setCode] = useState("");
    const roomCtx = useContext(RoomContext);
    useEffect(()=>{
        roomCtx.findPublicData();
        setCode(roomCtx.publicData);
    },[roomCtx])

    function updatePublicData(){
        roomCtx.updatePublicData(code);
    }

    return (
        <>
            <div className="room-heading">{props.roomType}</div>
            <div className="room-description">
                <textarea name="" id="" cols="30" rows="10" value={code} onChange={(e)=>{setCode(e.target.value)}}/>
            </div>
            <div className="button-box">
                <button className="save" onClick={updatePublicData}>Save Changes</button>
                <Link className="back-link" to="/"> <button className="back">  Go Back </button> </Link>
            </div>
        </>
    );
}