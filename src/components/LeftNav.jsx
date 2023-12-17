import React from 'react';
import {AiOutlineBulb} from "react-icons/ai";
import {BsBell} from "react-icons/bs";
import {HiOutlinePencil} from "react-icons/hi";
import {RiDeleteBinLine,RiInboxArchiveFill} from "react-icons/ri";


const LeftNav = () => {
  return (
    <div className='flex flex-col h-[100vh] overflow-y-auto bg-[#202124] w-20 border-t-[#525355] border-t-2'>
        
       <div className="flex flex-row items-center">
        <AiOutlineBulb className='text-white text-4xl m-4'/>
        {/* <p className='text-white ml-4 text-2xl'>Notes</p> */}
       </div>
        <BsBell className='text-white text-4xl m-4'/>
        <HiOutlinePencil className='text-white text-4xl m-4'/>
        <RiInboxArchiveFill className='text-white text-4xl m-4'/>
        <RiDeleteBinLine className='text-white text-4xl m-4'/>
        <div className='bottom-0'>
            .
        </div>
    </div>
  )
}

export default LeftNav