import ReactDOM from "react-dom";
import "./Modal.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Backdrop(props) {
  return <div className="backdrop" onClick={props.onCancel} />;
}

function ModalOverlay(props) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleEnter(){
    if(name.trim().length === 0){
      return;
    }
    props.onEnter(name);
    navigate(`/private/${name}`);
  }

  return (
    <div className="modal-container">
        <div className="modal-input">
          <label htmlFor="room-name">Please enter unique room name</label>
          <input type="text" placeholder="Enter Room Name" id="room-name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
        </div>
        <div className="roomName-button-box">
          <button onClick={handleEnter} className="enter-room">Enter</button>
          <button onClick={props.onCancel} className="cancel-room">Cancel</button>
        </div>
    </div>
  );
}

export default function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onCancel={props.onCancel}/>, document.getElementById("backdrop"))}
      {ReactDOM.createPortal(
        <ModalOverlay onCancel={props.onCancel} onEnter={props.onEnter}/>,
        document.getElementById("overlay")
      )}
    </>
  );
}
