import { User } from '../../';
import { Row, Modal } from 'react-bootstrap';
import { QuizCard } from '../components/QuizCard';
import { useContext, useEffect } from 'React';
import loggedInContext from '../helpers/logged-in-context';
import modalContext from '../helpers/modal-context';
import LoginView from './LoginView'

function SessionView() {
    const [{ data, error, loading }] = useAxios<User>({
        method: 'GET',
        url: '/session',
    });

    const { status } = useContext(loggedInContext)
    const [, setModal ] = useContext(modalContext)

    useEffect(() => {
        if (!status) {
            setModal({ show: true, element: LoginView})
        }
    })

    if (error || loading) {
        return (
            <></>
        )
    }
    return (
        <Modal.Dialog style={{
            maxWidth: '700px', width: '90%', height: '90%',
          }}
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                {data.username}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="p-3 rounded bg-dark">{data.emoji}</div>
              <h3 className="p-3">{data.emoji}</h3>
              <div className="p-3">You stated quizzin on {data.data.toDateString()}</div>
              <Row>
                  {
                      data.quizzes.map((quiz) => <QuizCard quiz={quiz} />)
                  }
              </Row>
            </Modal.Body>
          </Modal.Dialog>
    )
}

export default SessionView;
