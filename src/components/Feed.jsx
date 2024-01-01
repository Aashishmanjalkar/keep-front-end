import React, { useState } from 'react';
import LeftNav from './LeftNav';
import NoteList from './NoteList';
import { fetchFromAPI } from '../backend-connect/api';

const Feed = ({ getNotes,getAllNotes }) => {
  const [hidden, setHidden] = useState(true);
  const hidInput = () => {
    setHidden(false);
  }

  const [noteData, setNoteData] = useState({
    title: '',
    note: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData({
      ...noteData,
      [name]: value,
    });
  }

  const addNote = () => {
    setHidden(true);
    let token = localStorage.getItem("token");
    fetchFromAPI('notes', 'post', JSON.stringify(noteData), token).then(({ data, status }) => {
      if(status === 200){
        getAllNotes(token);
        setNoteData({
          title: '',
          note: ''
        })
      }
    });
  }
  return (
    <>
      <div className='flex flex-row bg-[#202124]'>
        <LeftNav />

        <div className='grow flex flex-col border-t-[#525355] border-t-2 w-full bg-[#202124]'>
          <div className="h-52 pt-10 flex items-center justify-center">
            <input type="text" onClick={hidInput} className={`h-20 ${hidden === false ? "hidden" : ""} rounded-xl outline-none border text-white text-lg border-[white] w-[43rem] p-2 pl-4 placeholder:font-bold  bg-[#202124]`} placeholder='Take a note....' />
            <div className={`flex flex-col ${hidden ? "hidden" : ""} mt-4 border rounded-xl border-[#7c7a7a]`}>
              <div className="flex flex-col">
                <input type="text" className='text-white outline-none bg-transparent w-[43rem] h-14 rounded-xl m-2 p-2 placeholder:text-lg placeholder:font-bold' onChange={handleChange} value={noteData.title} name='title' placeholder='Title' />
                <input type="text" className='text-white outline-none bg-transparent w-[43rem] h-14 rounded-xl m-2 p-2 placeholder:font-bold' onChange={handleChange} name='note' value={noteData.note} placeholder='Take a note...' />
                <button type='submit' onClick={addNote} className='text-white pb-2 text-right mr-4 text-lg font-semibold'>Close</button>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <NoteList notes={getNotes.notes} getAllNotes={getAllNotes} />
          </div>
        </div>

      </div>
    </>
  )
}

export default Feed