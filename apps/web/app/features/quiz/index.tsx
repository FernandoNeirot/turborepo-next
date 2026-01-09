import React, { useState } from 'react'
import { QuizStudyMaterial } from '../../shared/types';
import { Form } from '@fernando_neirot2/ui';

interface Props {
    data: QuizStudyMaterial;
}

interface HandleShowAnswersEvent {
    target: {
        value: string;
        name: string;
        id: string;
    };
}

const Quiz = ({ data }: Props) => {
    const [showStatus, setShowStatus] = useState(false)
    const [optionSelected, setOptionSelected] = useState<string | null>(null)

    const handleShowAnswers = (e: HandleShowAnswersEvent) => {
        setOptionSelected(e.target.value);
        setShowStatus(preve => !preve);
    }
    return (
        <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-semibold mb-2">{data.question}</h4>
            {data.options.map((option, idx) => (
                <Form.Radiobutton
                    key={idx}
                    onChange={handleShowAnswers}
                    texto={option}
                    name={data.question}
                    value={option}
                    checked={optionSelected === option && showStatus}
                    isDisabled={false}
                    opcionValida={idx === data.correctIndex ? true : false}
                    showStatus={showStatus}
                    id={`${data.question}-option-${idx}`}
                />
            ))}
        </div>
    )
}

export default Quiz
