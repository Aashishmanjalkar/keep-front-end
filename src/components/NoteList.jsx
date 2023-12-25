import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { fetchFromAPI } from '../backend-connect/api';

const NoteList = ({ notes ,getAllNotes}) => {
    const [showNote, setShowNote] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

    // State for input values
    const [noteData, setNoteData] = useState({
        title: '',
        note: '',
    });
    // Event handler for input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNoteData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setSelectedNote((prevNote) => ({
            ...prevNote,
            [name]: value,
          }));
    }
 
    const openSelectedData = (note) => {
        setShowNote(true);
        setSelectedNote(note);
    }
    const updateNote = (selectedNote) => {
        let token = localStorage.getItem("token");
        fetchFromAPI(`notes/${selectedNote?._id}`, 'put', JSON.stringify(noteData), token).then(({ data, status }) => {
          if(status === 200){
            getAllNotes(token);
            setNoteData({
              title: '',
              note: ''
            })
          }
        });
        setShowNote(false);
    }
    const deleteNote = (selectedNote) => {
        let token = localStorage.getItem("token");
        fetchFromAPI(`notes/${selectedNote?._id}`, 'delete', JSON.stringify(noteData), token).then(({ data, status }) => {
          if(status === 200){
            getAllNotes(token);
            setNoteData({
              title: '',
              note: ''
            })
          }
        });
        setShowNote(false);
    }

    return (

        <div className="grid grid-cols-4 gap-10 ml-20 px-4 text-white">
            {notes?.map((note) => {
                return <div onClick={() => openSelectedData(note)} className='flex flex-col rounded-lg border border-[#e8eaed]' key={note?._id}>
                    <p className='pl-4 py-2  font-bold' onChange={handleChange} name="note"  >{note?.title}</p>
                    <p className='pl-4 py-2 font-bold' onChange={handleChange} name='title' >{note?.note}</p>
                    {/* <input type="hidden" name="note" onChange={handleChange}  value={note?.title} /> */}
                </div>
            }
            )}

            <div className={`${showNote ? '' : 'hidden'} relative z-10`} aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className={` fixed inset-0 bg-[#202124] bg-opacity-75 transition-opacity`}></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className="relative transform overflow-hidden rounded-lg bg-[#202124] text-white  border border-[#e8eaed] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="flex flex-col">
                                <input type="text" onChange={handleChange} className='text-white outline-none bg-transparent w-[43rem] h-14 rounded-xl m-2 p-2 placeholder:text-lg placeholder:font-bold' value={selectedNote?.title} name='title' placeholder='Title' />
                                <input type="text" onChange={handleChange} className='text-white outline-none bg-transparent w-[43rem] h-14 rounded-xl m-2 p-2 placeholder:font-bold' name='note' value={selectedNote?.note} placeholder='Note' />
                                <div className="flex flex-row justify-end">
                                <MdDelete onClick={() => deleteNote(selectedNote)} className='text-[red] mt-1 mr-2 text-2xl' />
                                    {/* <button onClick={() => deleteNote(selectedNote)} className='text-[red] pb-2 text-right mr-4 text-lg font-semibold'>Delete</button> */}
                                    <button onClick={() => updateNote(selectedNote)} className='text-white pb-2 text-right mr-4 text-lg font-semibold'>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default NoteList
