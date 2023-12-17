import React,{useState} from 'react';
import LeftNav from './LeftNav';

const Feed = () => {
  const [hidden, setHidden] = useState(true);
  const hidInput =()=>{
    console.log("clicked");
    setHidden(false);
  } 
  const addNote =()=>{
    setHidden(true);
  }
  return (
    <>
        <div className='flex flex-row h-[calc(100%-71px)] bg-[#202124]'>
            <LeftNav/>
            <div className='grow flex justify-center items-center border-2 border-[red] h-52 bg-[#202124]'>
                <input type="text" onClick={hidInput} className={`h-16 ${hidden===false ? "hidden" : ""} rounded-xl outline-none border text-white text-lg border-[white] w-[43rem] p-2 pl-4 placeholder:font-bold  bg-[#202124]`} placeholder='Take a note....' />
                <div className={`flex ${hidden ? "hidden" : ""} mt-4 border rounded-xl border-[#7c7a7a]`}>
                  <div className="flex flex-col">
                    <input type="text" className='text-white outline-none bg-transparent w-[43rem] h-14 rounded-xl m-2 p-2 placeholder:text-lg placeholder:font-bold' placeholder='Title' />
                    <input type="text" className='text-white outline-none bg-transparent w-[43rem] h-14 rounded-xl m-2 p-2 placeholder:font-bold' placeholder='Take a note...' />
                    <button type='submit' onClick={addNote} className='text-white text-right mr-4 text-lg font-semibold'>Close</button>
                  </div>
                </div>

            </div>
            
        </div>
     
    </>
  )
}

export default Feed