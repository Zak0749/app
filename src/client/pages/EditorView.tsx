import {
  Accordion,
  FloatingLabel,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Button,
  Badge,
} from 'react-bootstrap';
import * as yup from 'yup';
import { FieldArray, Formik } from 'formik';
import { DashLg, PlusLg } from 'react-bootstrap-icons';
import { FC } from 'react';
import { useAxios } from '../helpers/axios';
import { Category, Question } from '../..';

function EditorView({ editing }:{ editing: { title: string, emoji: string, description: string, categoryId: string, questions: Question[]}}) {
  const [{ data: categoryies, loading: categoryiesLoading, error: categoryiesError }] = useAxios<Category[]>({
    method: 'GET',
    url: '/categorys',
  });

  if (categoryiesLoading || categoryiesError) {
    return <></>;
  }

  const schema = yup.object().shape({
    title: yup.string().required().max(32).min(1),
    emoji: yup.string().required().matches(/\p{Emoji}/gu, 'must be an emoji'),
    description: yup.string().required().min(1).max(512),
    categoryId: yup.string().length(24).is(categoryies.map((cat) => cat._id)),
    questions: yup.array().of(yup.object().shape({
      body: yup.string().required().min(1).max(256),
      answers: yup.array().of(yup.object().shape({
        body: yup.string().required().min(1).max(64),
        correct: yup.bool().required(),
      })),
    })),
  });

  const submit = (values) => {
    console.log(values);
  };

  return (
    <Modal.Dialog style={{ maxWidth: '700px', width: '90%', minHeight: '90%' }}>
      <Modal.Header closeButton>Editor</Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={submit}
          initialValues={editing}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <FloatingLabel label="Emoji" className="my-3">
                <FormControl
                  type="string"
                  name="emoji"
                  placeholder="Emoji"
                  value={values.emoji}
                  onChange={handleChange}
                  isInvalid={!!errors.emoji}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.emoji}
                </Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel label="Title" className="my-3">
                <FormControl
                  type="string"
                  name="title"
                  placeholder="Title"
                  value={values.title}
                  onChange={handleChange}
                  isInvalid={!!errors.title}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel label="Description" className="my-3">
                <Form.Control
                  as="textarea"
                  type="string"
                  name="description"
                  placeholder="Descrtiption"
                  value={values.description}
                  onChange={handleChange}
                  isInvalid={!!errors.description}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel label="Category" className="my-3">
                <Form.Select
                  name="categoryId"
                  placeholder="Category"
                  value={values.categoryId}
                  onChange={handleChange}
                  isInvalid={!!errors.categoryId}
                >
                  {
                    categoryies.map((cat) => <option value={cat._id}>{cat.title}</option>)
                  }
                </Form.Select>
              </FloatingLabel>

              <FieldArray name="questions">
                {
                  ({ push, remove }) => (
                    <>
                      <h1 className="d-flex justify-content-between">
                        <div>Question</div>
                        <Badge bg="primary"><PlusLg onClick={() => push({ body: '', answers: [] })} /></Badge>
                      </h1>

                      <Accordion>
                        {
                          values.questions.map((val, index) => (
                            <Accordion.Item eventKey={index.toString()}>
                              <Accordion.Header className="d-flex justify-content-between">
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="string"
                                    name={`questions[${index}].body`}
                                    placeholder="Descrtiption"
                                    value={values.questions[index].body}
                                    onChange={handleChange}
                                  />

                                  <DashLg onClick={() => remove(index)} />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.description}
                                  </Form.Control.Feedback>
                                </InputGroup>

                              </Accordion.Header>
                            </Accordion.Item>
                          ))
                        }
                      </Accordion>
                    </>
                  )
                }
              </FieldArray>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal.Dialog>
  );
}

export default EditorView;
