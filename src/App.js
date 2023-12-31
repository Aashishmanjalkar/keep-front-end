import './App.css';
import { fetchFromAPI } from './backend-connect/api';
import Feed from './components/Feed';
import Header from './components/Header';
import { useState , useEffect} from 'react';
import { jwtDecode } from "jwt-decode";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLoggedInData, setuserLoggedInData] = useState({});
  const [fetchNote, setfetchNotes] = useState('');

  const getAllNotes =(token)=>{
    fetchFromAPI('notes','get','',token).then(({data , status})=>{
      if(status === 200){
        if(typeof data !== "undefined"){
          setfetchNotes(data);
        }
      }else if (status >= 400){
        let message = data.message;
        if(message === undefined){
            message = "something went wrong";
        }
      }
     
    }); 
  }

 
  
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token !== null) {
      getAllNotes(token);
      const decoded = jwtDecode(token);
      if(decoded){
        let user = decoded.user;
        setIsLoggedIn(true);
        setuserLoggedInData(user);
      }
    }
  }, [])
  
  const handleLogin = () => {
    let token = localStorage.getItem("token");
    if (token !== null) {
      const decoded = jwtDecode(token);
      if(decoded){
        let user = decoded.user;
        console.log(user);
        setIsLoggedIn(true);
        setuserLoggedInData(user);
      }
    }
  };

  

  return (
    <>
      <Header getAllNotes={getAllNotes} onLogin={handleLogin} isLoggedIn={isLoggedIn} userLoggedInData={userLoggedInData} />
      <Feed getAllNotes={getAllNotes}  getNotes={fetchNote} />
    </>
  );
}

export default App;
