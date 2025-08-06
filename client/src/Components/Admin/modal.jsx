import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
export const Modall=({show,onHide,formType})=>{
    
    //form schemas according to different users
    const formSchemas = {
    teacher: {
      title: "Add Teacher",
      fields: [
        { name: "emp_id", label: "Employee ID", type: "text", required: true },
        { name: "emp_name", label: "Full Name", type: "text", required: true },
        { name: "emp_email", label: "Email", type: "email", required: true },
        { name: "department", label: "Department", type: "text" }
      ]
    },
    student: {
      title: "Add Student",
      fields: [
        { name: "student_id", label: "Student ID", type: "text", required: true },
        { name: "full_name", label: "Full Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "class", label: "Class", type: "text" }
      ]
    }
  };


    const [formData,setFormData]=useState({});
    return(
        <>
          <Modal show={show} onHide={onHide}>
             <Modal.Header closeButton>
                <Modal.Title>
                    {formSchemas[formType]?.title}
                </Modal.Title>
             </Modal.Header>
             <Modal.Body>
                <Form>
                    {formSchemas[formType]?.fields.map(field=>(

                    <Form.Group className='mb-3' key={field.name}>
                        <Form.Label>{field.label}</Form.Label>
                        <Form.Control type={field.type} 
                        placeholder="name@example.com"
                        name={field.name}
                        autoFocus/>
                    </Form.Group>
                    ))}
                </Form>
             </Modal.Body>
             <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={onHide}>
                    Save
                </Button>
             </Modal.Footer>
          </Modal>
        </>
    )
}