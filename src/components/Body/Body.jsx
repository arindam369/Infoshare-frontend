import "./Body.css";
import { HiArrowCircleRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import RoomContext from "../../store/RoomContext";
import { useContext } from "react";

export default function Body(){
    const roomCtx = useContext(RoomContext);

    const findPublicData = ()=>{
        roomCtx.findPublicData();
    }

    return (
        <>
            <div className="body-container">
                <div className="body-heading">
                    Welcome to InfoShare
                </div>
                <div className="body-desc-img">
                    <div className="body-img">
                        <img src={require("./../../assets/front.png")} alt="" />
                    </div>
                    <div className="body-description">
                        <li> <div className="point"> <HiArrowCircleRight/> </div> <span> Share your data with everyone in Public Room </span></li>
                        <li> <div className="point"> <HiArrowCircleRight/> </div> <span> Share your data personally in Private Room </span> </li>
                    </div>
                </div>
                <div className="rooms">
                    <Link className="link" to="/public" > <div className="public-room" onClick={findPublicData}>  Public Room  </div> </Link>
                    <Link className="link" to="/private"> <div className="private-room">  Private Room </div> </Link>
                </div>
            </div>
        </>
    );
}