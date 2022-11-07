import "./PrivateRoom.css";
import { useState } from "react";
import Modal from "./../Modal/Modal";
import Room from "../Room/Room";
import { useContext } from "react";
import RoomContext from "../../store/RoomContext";

export default function PrivateRoom(){
    const [visibleModal, setVisibleModal] = useState(false);
    const [visiblePrivate, setVisiblePrivate] = useState(false);


    const roomCtx = useContext(RoomContext);

    const showModal = ()=>{
        setVisibleModal(true);
    }
    const hideModal = ()=>{
        setVisibleModal(false);
    }
    const handleOnEnter = (room_name)=>{
        hideModal();
        setVisiblePrivate(true);
        roomCtx.findPrivateData(room_name);
    }
    const joinRoom = ()=>{
        showModal();
    }
    return (
        <>
            {visibleModal && <Modal onCancel={hideModal} onEnter={handleOnEnter}/>}
            {!visiblePrivate && 
                <div className="room-button-box">
                    <button onClick={showModal}>Create Room</button>
                    <button onClick={joinRoom}>Join Room</button>
                </div>
            }
            {/* {visiblePrivate && <Room roomType="Private Room"/>} */}
        </>
    );
}