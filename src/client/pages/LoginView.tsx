import {
  Form, Modal, Button, FloatingLabel,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { FC, useContext, useEffect } from 'react';
import { axios } from '../helpers/axios';
import loggedInContext from '../helpers/logged-in-context';
import modalContext from '../helpers/modal-context';
import SignUpView from './SignUpView';
import SessionView from './SessionView';

const schema = yup.object().shape({
  username: yup
    .string()
    .required()
    .min(1)
    .max(32),
  password: yup
    .string()
    .required()
    .min(1)
    .max(32),
});

const LoginView: FC = () => {
  const { refresh, status } = useContext(loggedInContext);
  const [modal, setModal] = useContext(modalContext);

  useEffect(() => {
    if (status) {
      setModal({ show: true, element: SessionView });
    }
  }, []);

  return (
    <Modal.Dialog style={{
      maxWidth: '700px', width: '90%', minHeight: '90%',
    }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Login
        </Modal.Title>

        <Button variant="info" className="ms-3" onClick={() => setModal({ show: true, element: SignUpView })}>Signup</Button>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={async (values, set) => {
            try {
              await axios({
                url: '/session',
                method: 'POST',
                data: values,
              });
              refresh();
              setModal({ show: false, element: modal.element });
            } catch (err) {
              set.setErrors({ username: '  ', password: 'Your email or password was incorrent please check the feilds and try again' });
            }
          }}
          initialValues={{
            username: '',
            password: '',
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <FloatingLabel label="Username" className="mb-3" controlId="validationFormik01">
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
                  isValid={touched.username && !errors.username}
                  isInvalid={!!errors.username}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel label="Password" className="mb-3" controlId="validationFormik02">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                  isInvalid={!!errors.password}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </FloatingLabel>

              <Button type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal.Dialog>
  );
};

export default LoginView;
