'use client'
import React, { useState } from 'react'

interface FlashCardProps {
    question: string;
    answer: string;
}

const FlashCard = ({ question, answer }: FlashCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false)
    return (
        <div 
            className="group h-48 w-full perspective-[1000px] cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className={`relative h-full w-full rounded-xl shadow-md transition-all duration-500 transform-3d ${isFlipped ? 'transform-[rotateY(180deg)]' : ''}`}>
                
                {/* Frente (Pregunta) */}
                <div className="absolute inset-0 h-full w-full rounded-xl bg-white p-6 backface-hidden flex flex-col justify-center border-2 border-blue-100">
                    <span className="text-xs font-bold text-blue-500 uppercase mb-2">Pregunta</span>
                    <p className="text-gray-800 text-lg font-medium">{question}</p>
                    <p className="text-xs text-gray-400 mt-auto text-center">Toca para ver respuesta</p>
                </div>

                {/* Dorso (Respuesta) */}
                <div className="absolute inset-0 h-full w-full rounded-xl bg-blue-600 p-6 text-white backface-hidden transform-[rotateY(180deg)] flex flex-col justify-center">
                    <span className="text-xs font-bold text-blue-200 uppercase mb-2">Respuesta</span>
                    <p className="text-white text-lg">{answer}</p>
                    <p className="text-xs text-blue-200 mt-auto text-center">Toca para volver</p>
                </div>
                
            </div>
        </div>
    )
}

export default FlashCard
