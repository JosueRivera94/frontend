import React,{useState} from 'react';
import {Button,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'

const CreateNote = ({modal,toggle,save}) => {
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

    const handleSave=()=>{
        let noteObj={}
        noteObj["title"]=noteName
        noteObj["content"]=content
        save(noteObj)
    }


    return (
        <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle}>Create Note</ModalHeader>
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
                <Button color='primary' onClick={handleSave}>Create</Button>{' '}
                <Button color='secondary' onClick={toggle}>Cancel</Button>
            </ModalFooter>

        </Modal>

      

      
    );
};

export default CreateNote;