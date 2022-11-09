import "./Room.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import RoomContext from "../../store/RoomContext";
import { useParams} from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaStarOfLife } from "react-icons/fa";
import {toast} from "react-toastify";

export default function Room2(props){
    const roomCtx = useContext(RoomContext);
    const [code, setCode] = useState("");
    const [visibleName, setVisibleName] = useState(false);
    const roomName = props.roomName;

    useEffect(()=>{
    //     roomCtx.findPrivateData(roomName);
        setCode(roomCtx.privateData);
    },[roomCtx])

    function updatePrivateData(){
        roomCtx.updatePrivateData(roomName, code);
        toast.success("Changes saved successfully");
    }

    const toggleRoomName = ()=>{
        setVisibleName(!visibleName);
    }

    return (
        <>
            {roomCtx.privateRoomFound && <div>
                <div className="room-heading">{props.roomType}</div>
                <div className="room-name">
                    <span className="room-name-roomName">{visibleName? roomName:<div className="pass-stars"><FaStarOfLife/><FaStarOfLife/><FaStarOfLife/><FaStarOfLife/><FaStarOfLife/></div>}</span>
                    <span className="room-name-icon">
                        {visibleName? <AiFillEye onClick={toggleRoomName}/>:<AiFillEyeInvisible onClick={toggleRoomName}/>}
                    </span>
                </div>
                <div className="room-description">
                    <textarea name="" id="" cols="30" rows="10" value={code} onChange={(e)=>{setCode(e.target.value)}} placeholder="Write your data here..."/>
                </div>
                <div className="button-box">
                    <button className="save" onClick={updatePrivateData}>Save Changes</button>
                    <Link className="back-link" to="/"> <button className="back">  Go Back </button> </Link>
                </div>
            </div>}

            {!roomCtx.privateRoomFound &&
                <div className="roomNotFound">
                    <img src={require("./../../assets/error.png")} alt="img" />
                    <div className="room-text">
                        <h3>Room Not Found</h3>
                        <h4>Sorry, but we can't find the room you are looking for...</h4>

                        <div className="button-box2">
                            <Link className="back-link" to="/"> <button className="back">  Go Back </button> </Link>
                        </div>
                    </div>
                </div>

            }
        </>
    );
}