import "./PrivateRoom.css";
import { useState } from "react";
import Modal from "./../Modal/Modal";
import { useContext } from "react";
import RoomContext from "../../store/RoomContext";

export default function PrivateRoom(){
    const [visibleCreateModal, setVisibleCreateModal] = useState(false);
    const [visibleJoinModal, setVisibleJoinModal] = useState(false);
    const [visiblePrivate, setVisiblePrivate] = useState(false);


    const roomCtx = useContext(RoomContext);

    const showCreateModal = ()=>{
        setVisibleCreateModal(true);
    }
    const showJoinModal = ()=>{
        setVisibleJoinModal(true);
    }
    const hideModal = ()=>{
        setVisibleCreateModal(false);
        setVisibleJoinModal(false);
    }
    const createRoom = ()=>{
        showCreateModal();
    }
    const joinRoom = ()=>{
        showJoinModal();
    }
    const handleCreate = (room_name)=>{
        hideModal();
        setVisiblePrivate(true);
        roomCtx.createPrivateRoom(room_name);
    }
    const handleJoin = (room_name)=>{
        hideModal();
        setVisiblePrivate(true);
        roomCtx.findPrivateData(room_name);
    }
    return (
        <>
            {visibleCreateModal && <Modal onCancel={hideModal} onEnter={handleCreate} modalType="Create"/>}
            {visibleJoinModal && <Modal onCancel={hideModal} onEnter={handleJoin} modalType="Join"/>}
            {!visiblePrivate && 
                <div className="room-button-box">
                    <button onClick={createRoom}>Create Room</button>
                    <button onClick={joinRoom}>Join Room</button>
                </div>
            }
        </>
    );
}