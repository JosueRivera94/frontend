import React,{useEffect, useState} from 'react';
import CreateNote from '../modals/CreateNote';
import Card from './Card';
import axios from "axios";
import { Link } from 'react-router-dom';


const URI ='http://localhost:4000/notes/'

const NotesList = () => {
    const [modal,setModal]= useState(false);
    const [noteList,setNoteList]=useState([]);

    useEffect(()=>{
     getNotes()
  
    },[])

    //Show the notes
    const getNotes = () => {
      fetch(URI)
        .then((res) => res.json())
        .then((res) => setNoteList(res));
    };



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


    const toggle = () => {
        setModal(!modal);
    }

    //Add new note
    const saveNote=(noteObj)=>{
        try {
            axios.post(URI,noteObj).then((res)=>{
              const newNotes = [noteObj, ...noteList];
              setModal(false)
              setNoteList(newNotes);
              getNotes()
            })
          } catch (error) {
            console.log(error)
          }
    }

   
     //Archive
  const archiveNote = (id) => {
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
            <button className='btn btn-primary mt-2' onClick={()=>setModal(true)} > <i className='fa-solid fa-circle-plus'></i>  Create note</button> <br/>
            <Link to="archive"> <button as={Link} className='btn btn-secondary mt-2' > <i className='fa-solid fa-angles-right'></i>  Archived notes</button> </Link>
           
        </div>
        <div className="mynotes-container">
            <h3>My notes</h3>
        </div>
        <div className="note-container">
            {noteList.map((obj,index)=> <Card key={index} noteObj={obj} index={index} deleteNote={deleteNote} updateListArray={updateListArray} archiveNote={archiveNote}/>)}
        </div>
        <CreateNote toggle={toggle} modal={modal} save={saveNote}></CreateNote>




        </>
    );
};

export default NotesList;
