'use client'
import React, { useState } from 'react'
import { Form } from '@fernando_neirot2/ui'
import { StudyMaterial } from '../shared/types'
import FlashCard from '../features/flashCards'
import Quiz from '../features/quiz'

const PruebaAIClient = () => {
    const [inputText, setInputText] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<StudyMaterial | null>(null)
    console.log(result)
    const handleClick = async () => {
        if (!inputText.trim()) return;

        setIsLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/openai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: inputText,
                    difficulty: 'intermedio'
                }),
            });

            if (!response.ok) throw new Error('Error en la consulta');

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Error llamando a la IA:", error);
            alert("Hubo un problema al generar el contenido.");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className='grid gap-5'>
            <Form.Textarea
                label='Ingresa el texto a analizar'
                placeholder='Escribe...'
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={10}
            />
            <Form.Button
                onClick={handleClick}
                label={isLoading ? 'Procesando con IA...' : 'Generar Material de Estudio'}
                isDisabled={isLoading || !inputText}
                height='45px'
            />

            {result && (
                <div className="mt-8 space-y-6 animate-in fade-in duration-700">
                    <section className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-bold text-blue-800 mb-2">Resumen</h3>
                        <p className="text-gray-700">{result.summary}</p>
                    </section>

                    <section>
                        <h3 className="font-bold mb-3">Flashcards Generadas</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {result.flashcards.map((card, i) => (
                                <FlashCard
                                    key={i}
                                    question={card.question}
                                    answer={card.answer}
                                />
                            ))}
                        </div>
                    </section>
                    <section>
                        <h3 className="font-bold mb-3">Preguntas de Opción Múltiple</h3>
                        <div className="space-y-4">
                            {result.quiz.map((quizItem, i) => (
                                <Quiz key={i} data={quizItem} />
                            ))}
                        </div>
                    </section>
                </div>
            )}
        </div>
    )
}

export default PruebaAIClient
