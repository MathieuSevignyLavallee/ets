// TeacherModeQuiz.tsx
import React, { useEffect, useState } from 'react';

import QuestionComponent from '../Questions/Question';

import '../../pages/Student/JoinRoom/joinRoom.css';
import { QuestionType } from '../../Types/QuestionType';
// import { QuestionService } from '../../services/QuestionService';
import DisconnectButton from '../../components/DisconnectButton/DisconnectButton';

interface TeacherModeQuizProps {
    questionInfos: QuestionType;
    submitAnswer: (answer: string | number | boolean, idQuestion: string) => void;
    disconnectWebSocket: () => void;
}

const TeacherModeQuiz: React.FC<TeacherModeQuizProps> = ({
    questionInfos,
    submitAnswer,
    disconnectWebSocket
}) => {
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
    // const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        setIsAnswerSubmitted(false);
    }, [questionInfos]);

    const handleOnSubmitAnswer = (answer: string | number | boolean) => {
        const idQuestion = questionInfos.question.id || '-1';
        submitAnswer(answer, idQuestion);
        setIsAnswerSubmitted(true);
    };

    return (
        <div className='room'>
                <div className='roomHeader'>

                    <DisconnectButton
                        onReturn={disconnectWebSocket}
                        message={`Êtes-vous sûr de vouloir quitter?`} />

                    <div className='centerTitle'>
                        <div className='title'>Question {questionInfos.question.id}</div>
                    </div>

                    <div className='dumb'></div>

                </div>

                {isAnswerSubmitted ? (
                    <div>
                        En attente pour la prochaine question...
                    </div>
                ) : (
                    <QuestionComponent
                        // imageUrl={imageUrl}
                        handleOnSubmitAnswer={handleOnSubmitAnswer}
                        question={questionInfos.question}
                    />
                )}
            </div>
    );
};

export default TeacherModeQuiz;
