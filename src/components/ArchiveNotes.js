import React,{useEffect, useState} from 'react';
import ArchiveCard from './ArchiveCard';
import axios from "axios";
import { Link } from 'react-router-dom';

const URI ='http://localhost:4000/notes/'

const ArchiveNotes = () => {
    const [noteList,setNoteList]=useState([]);

    useEffect(()=>{
        getNotes()
     
       },[])
   
       //Show the notes
       const getNotes = () => {
         fetch('http://localhost:4000/archive/')
           .then((res) => res.json())
           .then((res) => setNoteList(res));
       };

       //Edit note
    const updateListArray=(obj,index)=>{
        try {
            axios.put(`${URI}${obj}`,index).then((res)=>{
               setNoteList((prev) =>
               prev.map((item) => (item.id === obj ? index : item))
               );
               
            })
          } catch (error) {
            console.log(error)
          }
    }

    //Delete note
    const deleteNote=(index)=>{
        try {
            axios.delete(`${URI}${index}` ).then((res)=>{  
              const removedArr = [...noteList].filter((note) => note.id !== index);
              setNoteList(removedArr);
            })

          } catch (error) {
            console.log(error);
          }
    }



        //Un-Archive
  const unarchiveNote = (id) => {
    try {
        noteList.map((note)=>{
        if(note.id===id){
          axios.put(`${URI}${id}`,{
            title:note.title,
            content:note.content,
            archive:!note.archive
          }).then(()=>{
            getNotes()
          })
        }
        return note;
      })
      
    } catch (error) {
      console.log(error);
    }
  };


    return (
        <>
        <div className='header text-center' >
            <h3>Notes App</h3>
            <Link to="/"> <button className=' btn btn-secondary mt-2 ' > <i className='fa-solid fa-angles-left'></i> Unarchived notes</button> </Link>
        </div>
        <div className="mynotes-container">
            <h3>My archived notes</h3>
        </div>
        <div className="note-container">
            {noteList.map((obj,index)=> <ArchiveCard key={index} noteObj={obj} index={index} deleteNote={deleteNote} updateListArray={updateListArray} archiveNote={unarchiveNote}/>)}
        </div>
        

        </>
    );
};

export default ArchiveNotes;