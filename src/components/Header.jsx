import React, { useRef, useState, useEffect } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineSearch, AiOutlineClose, AiOutlineSetting } from 'react-icons/ai';
import { IoIosRefresh } from 'react-icons/io';
import { PiDotsNineBold } from 'react-icons/pi';
import googleicon from '../google-keep-icon.svg';
import { fetchFromAPI } from "../backend-connect/api";
import { jwtDecode } from "jwt-decode";
import PopUpComponent from './PopUpComponent';

const Header = ({ getAllNotes, isLoggedIn, userLoggedInData, onLogin }) => {
  const listElement = useRef(null);
  const listElement2 = useRef(null);
  const loginElement = useRef(null);
  const registerElement = useRef(null);
  const [isLogin, setIsLogin] = useState(true);
  const [loginError, setloginError] = useState("");
  function openModal() {
    if (listElement2.current) {
      listElement2.current.classList.remove('hidden');
    }
  }
  useEffect(() => {
    if (isLoggedIn) {
      console.log(isLoggedIn);
      setIsLogin(true);
      onLogin();
    } else {
      console.log(isLoggedIn);
      setIsLogin(false);
    }
  }, [isLoggedIn])

  function closeModal() {
    listElement2.current.classList.add('hidden');
  }
  const [activeClass, setactiveClass] = useState(false);
  function registerModal() {
    loginElement.current.classList.add('hidden');
    registerElement.current.classList.remove('hidden');
    setactiveClass(true);
  }
  function loginModal() {
    loginElement.current.classList.remove('hidden');
    registerElement.current.classList.add('hidden');
    setactiveClass(false);
  }

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: ''
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const login = (e) => {
    e.preventDefault();
    console.log("RUnning");
    fetchFromAPI('user/login', 'post', JSON.stringify(formData)).then(({ data, status }) => {
      console.log(data);
      console.log(status);
      if (status === 200) {
        const token = data.accessToken;
        const decoded = jwtDecode(token);
        localStorage.setItem('token', token);
        listElement.current.classList.add('hidden');
        getAllNotes(data.accessToken);
      }
      else if (status >= 400) {
        let message = data.message;
        if (message === undefined) {
          message = "something went wrong";
        }
        setloginError(message);
      }


    }).catch(error => {
      console.log(error);
    });
  };

  const register = (e) => {
    e.preventDefault();
    fetchFromAPI('user/register', 'post', JSON.stringify(formData)).then(({ data, status }) => {
      const token = data.accessToken;
      localStorage.setItem('token', token);
      if (status === 200) {
        listElement.current.classList.add('hidden');
        getAllNotes(data.accessToken);
      }
    }).catch(error => {
      console.error('Error:', error);
    });
  };

  const signOut = (e) =>{
    localStorage.removeItem('token');
    window.location.reload(false);
  }

  return (

    <header className='bg-[#202124] sticky top-0 flex flex-row items-center justify-between'>

      <div className='flex items-center'>
        <RxHamburgerMenu className='text-white ml-7 my-auto text-2xl' />
        <img src={googleicon} alt="Your SVG" className='h-12 mx-7' />
        <p className='text-white mx-2 text-2xl' >Keep</p>
      </div>

      <div className="flex items-center my-2">
        <div className="flex items-center h-14 border-2 border-[#303030] rounded-xl  bg-[#525355]">
          <div className='w-10 items-center justify-center'>
            <AiOutlineSearch className="text-white text-2xl ml-2" />
          </div>
          <input type="text"
            // className='bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px] placeholder:text-slate-400 placeholder:text-base'
            className='placeholder:text-white  h-10 bg-transparent outline-none  lg:w-[750px] md:w-[400px] sm:w-[100px]'
            placeholder='Search'
          />
          <div className='w-10 items-center justify-center'>
            <AiOutlineClose className="text-white text-2xl ml-2 hidden" />
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <IoIosRefresh className='text-[#e2e2e3] text-3xl mx-4' />
        <AiOutlineSetting className='text-[#e2e2e3] text-3xl mx-4' />
        <PiDotsNineBold className='text-[#e2e2e3] text-3xl mx-7' />
        <div className="flex h-8 w-8 overflow-hidden rounded-full mx-9">
          <img onClick={openModal} src="https://i.pravatar.cc/200" alt='profilePic' />
        </div>
      </div>

      <div id="loginModal" ref={listElement} className={`${isLogin ? 'hidden' : ''} fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center`}>
        <div className="bg-white pt-2 px-8 pb-8 rounded shadow-lg w-96">


          <div className="flex justify-end items-center">
            {/* <h2 className="text-2xl font-semibold mb-4">keep</h2> */}

            {/* <button id="closeModalButton" onClick={closeModal} className=" text-zinc-950 text-3xl pb-3 hover:text-gray-800">&times;</button> */}
          </div>
          <div className="flex my-2 pb-2 pt-2 justify-between">
            <button onClick={loginModal} className={`text-lg font-medium ${activeClass === false ? 'text-slate-500' : 'text-slate-950'} `}>Sign In</button>
            <button onClick={registerModal} className={`text-lg font-medium ${activeClass === false ? 'text-slate-950' : 'text-slate-500'}`}>Sign Up</button>
          </div>

          {/* Login Modal */}
          <div className="login" ref={loginElement}>
            <form onSubmit={login}>
              {/* <div className="mb-4">
                    <label htmlFor="userName" className="block text-gray-600">Username</label>
                    <input type="text" name="userName" className="w-full px-3 py-2 border rounded"  onChange={handleChange}/>
                </div> */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-900">Email</label>
                <input type="email" name="email" className="w-full px-3 py-2 border rounded" onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-900">Password</label>
                <input type="password" name="password" className="w-full px-3 py-2 pb-2 border rounded" onChange={handleChange} />
              </div>
              <div className="mb-4 h-5">
                <label htmlFor="password" className="block text-red-500 font-bold">{loginError}</label>
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Login</button>
            </form>
            <div className="d-flex items-center text-center py-3">
              <span className="w-full relative inline-block px-10 font-bold text-sm text-main tracking-wide after:content-[''] after:flex after:relative  after:-mt-2.5 after:w-2/5 after:h-0.5 after:bg-[#4A55A2] after:left-0 before:content-[''] before:flex before:relative before:top-[13px] before:w-2/5 before:h-0.5 before:bg-[#4A55A2] before:mt-2.5 before:left-[60%]">or</span>
            </div>
            <div className="flex flex-col gap-y-3">
              <button className="flex justify-around items-center text-center w-full my-0 mx-auto py-2 px-2 font-medium shadow-lg rounded bg-[#4A55A2] hover:bg-[#7895CB]">
                <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png" className="relative w-10 h-10 ml-0 mr-2 bg-white rounded" alt="google logo" /> <span className="w-5/6 text-white">Login  with Google</span>
              </button>
              <button className="flex justify-around items-center text-center w-full my-0 mx-auto py-2 px-2 font-medium shadow-lg rounded bg-[#4A55A2] hover:bg-[#7895CB]">
                <img src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" className="relative w-10 h-10 ml-0 mr-2" alt="facebook logo" /> <span className="w-5/6 text-white">Login with Facebook</span>
              </button>
            </div>
          </div>

          {/* Register Modal */}
          <div className="register hidden" ref={registerElement}>
            <form onSubmit={register}>
              <div className="mb-4">
                <label htmlFor="userName" className="block text-gray-600">Username</label>
                <input type="text" name="userName" className="w-full px-3 py-2 border rounded" onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-900">Email</label>
                <input type="email" name="email" className="w-full px-3 py-2 border rounded" onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-900">Password</label>
                <input type="password" name="password" className="w-full px-3 py-2 border rounded" onChange={handleChange} />
              </div>
              <div className="mb-4 h-5">
                <label htmlFor="password" className="block text-red-500 font-bold">{loginError}</label>
              </div>

              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Sign Up</button>
            </form>
            <div className="d-flex items-center text-center py-3">
              <span className="w-full relative inline-block px-10 font-bold text-sm text-main tracking-wide after:content-[''] after:flex after:relative  after:-mt-2.5 after:w-2/5 after:h-0.5 after:bg-[#4A55A2] after:left-0 before:content-[''] before:flex before:relative before:top-[13px] before:w-2/5 before:h-0.5 before:bg-[#4A55A2] before:mt-2.5 before:left-[60%]">or</span>
            </div>
            <div className="flex flex-col gap-y-3">
              <button className="flex justify-around items-center text-center w-full my-0 mx-auto py-2 px-2 font-medium shadow-lg rounded bg-[#4A55A2] hover:bg-[#7895CB]">
                <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png" className="relative w-10 h-10 ml-0 mr-2 bg-white rounded" alt="google logo" /> <span className="w-5/6 text-white">Sign up with Google</span>
              </button>
              <button className="flex justify-around items-center text-center w-full my-0 mx-auto py-2 px-2 font-medium shadow-lg rounded bg-[#4A55A2] hover:bg-[#7895CB]">
                <img src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" className="relative w-10 h-10 ml-0 mr-2" alt="facebook logo" /> <span className="w-5/6 text-white">Sign up with Facebook</span>
              </button>
            </div>
          </div>



        </div>
      </div>



      <div id="modal" ref={listElement2} className="hidden fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full mt-14 ml-[-20px] flex justify-end items-baseline">
        <div className="bg-white pt-2 px-8 pb-8 rounded shadow-lg w-96">
        <div className="flex justify-end items-center">
            <button id="closeModalButton" onClick={closeModal} className=" text-zinc-950 text-3xl pb-3 hover:text-gray-800">&times;</button>
          </div>
          
          <div className="flex justify-center">
            <div className="flex h-14 w-14 overflow-hidden rounded-full mx-9">
              <img src="https://i.pravatar.cc/200" alt='profilePic' />
            </div>
          </div>
          {userLoggedInData && (
            <>
             <h1 className='text-center pt-2 text-2xl' >Hi {userLoggedInData.userName} !</h1>
             <h1 className='text-center pt-1 text-lg' >{userLoggedInData.email}</h1>
            </>
          )}
          <button type="submit" onClick={signOut} className="bg-blue-500 text-white px-4 py-2 my-4 rounded w-full">Sign Out</button>
        </div>
      </div>

      <div className="pop-up">
        <PopUpComponent />
      </div>

    </header>
  )
}

export default Header