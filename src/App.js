import './App.css';
import { Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Body from './components/Body/Body';
import Room from './components/Room/Room';
import Room2 from './components/Room/Room2';
import PrivateRoom from './components/PrivateRoom/PrivateRoom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App(){
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Body/>}/>
        <Route path="/public" element={<Room roomType="Public Room"/>}/>
        <Route path="/private" element={<PrivateRoom/>}/>
        <Route path="/private/:roomName" element={<Room2 roomType="Private Room" />}/>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
    </>
  );
}