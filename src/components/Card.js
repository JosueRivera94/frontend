import React,{useState} from 'react';
import EditNote from '../modals/EditNote';
import swal from 'sweetalert'

const Card = ({noteObj,index,deleteNote,updateListArray,archiveNote}) => {

    const [modal,setModal]=useState(false);

    const handleDelete=()=>{
        deleteNote(noteObj.id)
    }

    const handleArchive=()=>{
        archiveNote(noteObj.id)
    }

    const toggle=()=>{
        setModal(!modal);
    }

    const updateNote=(obj)=>{
        updateListArray(noteObj.id,obj,index)
        setModal(false)
    }

    const alerta=()=>{
        swal({
            title:"Delete",
            text:"Are you sure you want to delete this note?",
            icon:"warning",
            buttons:["No","Yes"]
        }).then(answer=>{
            if(answer){
                swal({text:"The note has been deleted successfully!",
            icon:"success"})
            handleDelete()
            }
        })
    }


    return (
        <div className='card-wrapper mr-5'>
            <div className='card-top' style={{"backgroundColor":"#5282B4"}}></div>
            <div className='note-holder'>
                <span className='card-header' style={{"backgroundColor":"#A6CEF8","borderRadius":"10px"}}>{noteObj.title}</span>
                <p className = "mt-3">{noteObj.content}</p>

                <div style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>

                    <i className='fa-solid fa-box-archive mr-3' style={{"color":"#5282B4","marginRight":"10px","cursor":"pointer"}} onClick={handleArchive} ></i>
                    <i className='far fa-edit mr-3' style={{"color":"#5282B4","marginRight":"10px","cursor":"pointer"}} onClick={()=>setModal(true)} ></i>
                    <i className='fas fa-trash-alt' style={{"color":"#5282B4","cursor":"pointer"}} onClick={()=>alerta()} ></i>
                </div>

            </div>
            <EditNote modal={modal} toggle={toggle} updateNote={updateNote} noteObj={noteObj}/>
        </div>
    );
};

export default Card;