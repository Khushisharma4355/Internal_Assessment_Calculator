import { useState } from 'react';
import { Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { gql, useMutation, useQuery } from '@apollo/client';

export const Modall = ({ show, onHide, formType }) => {
  // GraphQL queries & mutations
  const GET_DEPARTMENTS = gql`
    query GetDepartments {
       getDepartment {
         dep_id
         dept_name
       }
    }
  `;

  const ADD_TEACHER = gql`
    mutation AddTeacher(
      $emp_id: String!
      $emp_name: String!
      $emp_email: String!
      $emp_phone: String!
      $dep_id: String!
    ) {
      addTeacher(
        emp_id: $emp_id
        emp_name: $emp_name
        emp_email: $emp_email
        emp_phone: $emp_phone
        dep_id: $dep_id
      ) {
        emp_id
      }
    }
  `;

  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch department data for dropdown
  const { data, loading, error } = useQuery(GET_DEPARTMENTS);
  
  // Mutation to add teacher
  const [addTeacher] = useMutation(ADD_TEACHER);

  // Form schemas
  const formSchemas = {
    teacher: {
      title: 'Add New Teacher',
      fields: [
        { name: 'emp_id', label: 'Employee ID', type: 'text', required: true },
        { name: 'emp_name', label: 'Full Name', type: 'text', required: true },
        { name: 'emp_email', label: 'Email', type: 'email', required: true },
        { name: 'emp_phone', label: 'Phone', type: 'text', required: true },
        {
          name: 'dep_id',
          label: 'Department',
          type: 'select',
          select: true,
          required: true,
          optionsKey: 'departments',
        },
      ],
    },
    student: {
      title: 'Add New Student',
      fields: [
        { name: 'student_id', label: 'Student ID', type: 'text', required: true },
        { name: 'full_name', label: 'Full Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'class', label: 'Class', type: 'text', required: true },
      ],
    },
  };

  // Options for dropdowns
  const dropdownOptions = {
    departments: data?.getDepartment || [],
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear messages when user starts typing
    if (errorMessage) setErrorMessage(null);
    if (successMessage) setSuccessMessage(null);
  };

  // Handle form submit
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    
    try {
      if (formType === 'teacher') {
        const res = await addTeacher({ variables: formData });

        if (res?.data?.addTeacher?.emp_id) {
          setSuccessMessage('Teacher added successfully!');
          setFormData({});
          setTimeout(() => {
            onHide();
            setSuccessMessage(null);
          }, 1500);
        } else {
          throw new Error("Teacher not added properly.");
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage(error.message || 'Error occurred while saving.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = formSchemas[formType]?.fields || [];

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton className="border-bottom-0 pb-0">
        <Modal.Title className="fw-bold text-primary">
          {formSchemas[formType]?.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-1">
        {(errorMessage || successMessage) && (
          <Alert 
            variant={successMessage ? 'success' : 'danger'} 
            dismissible
            onClose={() => successMessage ? setSuccessMessage(null) : setErrorMessage(null)}
            className="mb-4"
          >
            {successMessage || errorMessage}
          </Alert>
        )}
        
        <Form>
          {formFields.map((field) => (
            <Form.Group className="mb-3" key={field.name}>
              <Form.Label className="fw-medium">{field.label}</Form.Label>
              {field.select ? (
                <Form.Select
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  required={field.required}
                  className="py-2"
                  disabled={loading}
                >
                  <option value="">Select {field.label}</option>
                  {dropdownOptions[field.optionsKey]?.map((option) => (
                    <option key={option.dep_id} value={option.dep_id}>
                      {option.dept_name}
                    </option>
                  ))}
                </Form.Select>
              ) : (
                <Form.Control
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  required={field.required}
                  placeholder={`Enter ${field.label}`}
                  className="py-2"
                />
              )}
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-top-0 pt-0">
        <Button 
          variant="outline-secondary" 
          onClick={onHide}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};