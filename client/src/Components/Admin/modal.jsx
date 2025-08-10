import { useState } from 'react';
import { Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';
import { formSchemas } from './formSchema';
import { GET_ADMIN_DATA } from '../../GraphQL/Queries';

export const Modall = ({ show, onHide, formType }) => {
  const client = useApolloClient();
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Safely get current schema or default to empty
  const currentSchema = formSchemas[formType] || { 
    title: 'Form',
    fields: [],
    mutation: null,
    query: null
  };

  // Fetch dependent data only if query exists
  const { data, loading: isQueryLoading, error: queryError } = useQuery(
    currentSchema.query || '', 
    { skip: !currentSchema.query }
  );

  const [mutate] = useMutation(currentSchema.mutation || '', {
    update: (cache, { data: mutationData }) => {
      try {
        // Only update for teacher form with expected response
        if (formType === 'teacher' && mutationData?.addTeacher) {
          const existingData = client.readQuery({
            query: GET_ADMIN_DATA,
            variables: { empid: "T001" }
          });

          if (existingData?.getAdmin) {
            client.writeQuery({
              query: GET_ADMIN_DATA,
              variables: { empid: "T001" },
              data: {
                getAdmin: {
                  ...existingData.getAdmin,
                  teacherCount: mutationData.addTeacher.teacherCount
                }
              }
            });
          }
        }
      } catch (error) {
        console.error('Cache update failed:', error);
      }
    },
    onCompleted: () => {
      setSuccessMessage(`${formType} added successfully!`);
      setFormData({});
      setTimeout(onHide, 1500);
    },
    onError: (error) => {
      setErrorMessage(error.message || 'Operation failed. Please try again.');
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear messages when user edits
    if (errorMessage) setErrorMessage(null);
    if (successMessage) setSuccessMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentSchema.mutation) return;

    setIsSubmitting(true);
    try {
      await mutate({ variables: formData });
    } catch (error) {
      // Error handled in onError callback
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({});
    setErrorMessage(null);
    setSuccessMessage(null);
    onHide();
  };

  const renderField = (field) => {
    const commonProps = {
      name: field.name,
      value: formData[field.name] || '',
      onChange: handleChange,
      required: field.required,
      disabled: isSubmitting || (field.select && isQueryLoading),
      className: "py-2"
    };

    if (field.select) {
      return (
        <Form.Select {...commonProps}>
          <option value="">Select {field.label}</option>
          {(data?.getDepartment || []).map(option => (
            <option key={option.dep_id} value={option.dep_id}>
              {option.dept_name}
            </option>
          ))}
        </Form.Select>
      );
    }

    return (
      <Form.Control
        {...commonProps}
        type={field.type}
        placeholder={`Enter ${field.label}`}
      />
    );
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton className="border-bottom-0 pb-0">
        <Modal.Title className="fw-bold" style={{ color: '#1d3557' }}>
          {currentSchema.title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-1">
        {/* Query loading/error states */}
        {isQueryLoading && <Spinner animation="border" size="sm" className="mb-3" />}
        {queryError && (
          <Alert variant="danger" className="mb-3">
            Failed to load department data
          </Alert>
        )}

        {/* Mutation result messages */}
        {successMessage && (
          <Alert variant="success" dismissible onClose={() => setSuccessMessage(null)} className="mb-3">
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert variant="danger" dismissible onClose={() => setErrorMessage(null)} className="mb-3">
            {errorMessage}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          {currentSchema.fields.map(field => (
            <Form.Group className="mb-3" key={field.name}>
              <Form.Label className="fw-medium">{field.label}</Form.Label>
              {renderField(field)}
            </Form.Group>
          ))}

          <div className="d-flex justify-content-end gap-2 pt-2">
            <Button 
              variant="outline-secondary" 
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              style={{ backgroundColor: "#1d3557" }}
              disabled={isSubmitting || !currentSchema.mutation || isQueryLoading}
            >
              {isSubmitting ? (
                <>
                  <Spinner as="span" size="sm" animation="border" className="me-2" />
                  Saving...
                </>
              ) : 'Save Changes'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};