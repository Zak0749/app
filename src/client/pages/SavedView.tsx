import { useAxios } from '../helpers/axios';
import { useContext, useEffect, useState } from 'react';
import loggedInContext from '../helpers/logged-in-context';
import { Quiz } from '../../';
import { Row } from 'react-bootstrap';
import { QuizCard, QuizCardPlaceholder } from '../components/QuizCard';

type Saved = {
    date: string;
    quiz: Quiz;
}


function SavedView() {
    const { status } = useContext(loggedInContext);

    const [{ error, loading, data}] = useAxios<Saved>({
        method: 'GET',
        url: '/saved'
    });

    // Handles the state of the info alert
    const [showInfoAlert, setInfoAlert] = useState(false);

    // Handles the state of the error alert
    const [showErrAlert, setErrAlert] = useState(false);

    // When the server gives an error
    useEffect(() => {
        if (error) {
            setErrAlert(true);
        }
    }, [error]);

    useEffect(() => {
        if (!status) {
            setInfoAlert(true);
        }
    }, [status])

    if (error || loading || !status) {
        return (
            <div className="p-3">
                <Alert show={showErrAlert} variant="danger" onClose={() => { setErrAlert(false); }} dismissible>
                    There was an error try reloading if this issue persists report it
                    {' '}
                    <Alert.Link href="https://github.com/Zak0749/app/issues">here</Alert.Link>
                </Alert>
                <Alert show={showInfoAlert} variant="info" onClose={() => { setInfoAlert(false); }} dismissible>
                    To save and see your saved quizzes you need to login use button in to left
                </Alert>
                <h1>Saved</h1>
                <Row>
                    {Array.from(Array(20).keys()).map(() => <QuizCardPlaceholder />)}
                </Row>
            </div>
        );
    }
    
    return (
        <div className="p-3">
            
            <h1>Saved</h1>
            <Row>
                {data.map((saved) => <QuizCard quiz={saved.quiz} />)}
            </Row>
        </div>
    );
}

export default SavedView;
