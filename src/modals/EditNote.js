import React,{useEffect, useState} from 'react';
import {Button,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'

const EditNote = ({modal,toggle,updateNote,noteObj}) => {
    const [noteName,setNoteName]=useState('')
    const [content,setContent]=useState('')

    const handleChange=(e)=>{
        const {name,value}=e.target

        if(name === "title"){
            setNoteName (value)
        }else{
            setContent(value)
        }
    }

    useEffect(()=>{
        setNoteName(noteObj.title)
        setContent(noteObj.content)
    },[])

    const handleUpdate=(e)=>{
        e.preventDefault()
        let tempObj={}
        tempObj['title']=noteName
        tempObj['content']=content
        updateNote(tempObj)
    }


    return (
        <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle}>Edit Note</ModalHeader>
            <ModalBody>
                <form>
                    <div className='form-group'>
                        <label>Title</label>
                        <input type="text" className='form-control' value={noteName} onChange={handleChange} name="title"/>
                    </div>

                    <div className='form-group'>
                        <label>Content</label>
                        <textarea rows="5" className='form-control' value={content} onChange={handleChange} name="content"></textarea>
                    </div>

                </form>
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={handleUpdate}>Edit</Button>{' '}
                <Button color='secondary' onClick={toggle}>Cancel</Button>
            </ModalFooter>

        </Modal>

      

      
    );
};

export default EditNote;