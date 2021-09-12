import {
  Form, Modal, Button, FloatingLabel,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useContext } from 'react';
import { axios } from '../helpers/axios';
import modalContext from '../helpers/modal-context';
import LoginView from './LoginView';

const schema = yup.object().shape({
  email: yup.string().email().required().max(320),
  username: yup.string().required().max(32),
  password: yup.string().required().min(8),
  passwordDub: yup.string().required().min(8).oneOf([yup.ref('password'), null], "Passwords don't match"),
  emoji: yup.string().required().matches(/\p{RI}\p{RI}|\p{Emoji}(\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?(\u{200D}\p{Emoji}(\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?)+|\p{EPres}(\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?|\p{Emoji}(\p{EMod}+|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})/gu, 'must be an emoji'),
});

function SignUpView() {
  const [, setModal] = useContext(modalContext);

  return (
    <Modal.Dialog style={{
      maxWidth: '700px', width: '90%', height: '90%',
    }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Signup
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={async (values, set) => {
            try {
              await axios({
                method: 'POST',
                url: '/user',
                data: {
                  emoji: values.emoji,
                  username: values.username,
                  email: values.email,
                  password: values.password,
                },
              });
              setModal({ show: true, element: LoginView });
            } catch (err) {
              set.setErrors({ username: '  ', password: 'There was an error' });
            }
          }}
          initialValues={{
            email: '',
            username: '',
            password: '',
            passwordDub: '',
            emoji: '',
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
              <FloatingLabel label="Emoji" className="mb-3" controlId="validationFormik01">
                <Form.Control
                  type="text"
                  name="emoji"
                  placeholder="Emoji"
                  value={values.emoji}
                  onChange={handleChange}
                  isValid={touched.emoji && !errors.emoji}
                  isInvalid={!!errors.emoji}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.emoji}
                </Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel label="Email" className="mb-3" controlId="validationFormik02">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={!!errors.email}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel label="Username" className="mb-3" controlId="validationFormik03">
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Email"
                  value={values.username}
                  onChange={handleChange}
                  isValid={touched.username && !errors.username}
                  isInvalid={!!errors.username}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel label="Password" className="mb-3" controlId="validationFormik03">
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

              <FloatingLabel label="Repeat Password" className="mb-3" controlId="validationFormik03">
                <Form.Control
                  type="password"
                  name="repeatpassword"
                  placeholder="Password"
                  value={values.passwordDub}
                  onChange={handleChange}
                  isValid={touched.passwordDub && !errors.passwordDub}
                  isInvalid={!!errors.passwordDub}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.passwordDub}
                </Form.Control.Feedback>
              </FloatingLabel>

              <Button type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal.Dialog>
  );
}

export default SignUpView;
