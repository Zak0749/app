import { Form, Modal, Button } from 'react-bootstrap';
// import { Formik } from 'formik';
// import * as yup from 'yup';
import { Check } from 'react-bootstrap-icons';

// const schema = yup.object().shape({
//   username: yup
//     .string()
//     .required()
//     .matches(RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]$'))
//     .min(1)
//     .max(32),
//   password: yup
//     .string()
//     .required()
//     .matches(RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]$'))
//     .min(8)
//     .max(32),
// });

function LoginView() {
  return (
    <Modal.Dialog style={{
      maxWidth: '700px', width: '90%', height: '90%',
    }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <Formik
          validationSchema={schema}
          onSubmit={console.log}
          initialValues={{
            username: '',
            password: '',
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="validationFormik01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isValid={touched.username && !errors.username}
                />
                <Form.Control.Feedback><Check color="green" /></Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="validationFormik02">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                />
                <Form.Control.Feedback><Check color="green" /></Form.Control.Feedback>
              </Form.Group>

              <Button type="submit">Submit form</Button>
            </Form>
          )}
        </Formik> */}
      </Modal.Body>
    </Modal.Dialog>
  );
}

export default LoginView;
