import React from 'react'
import PruebaAIClient from './page.client'

const page = () => {
    return (
        <div className='w-full max-w-310 mx-auto'>
            <div className='text-[20px] font-bold px-4 mt-4'>
                Prueba Open AI
            </div>
            <div className='text-[15px] text-gray-500 px-4 mb-4'>
                usando gpt-4.1-nano
            </div>
            <div className='text-[15px] text-gray-500 px-4 mb-4'>
                Descripcion: Esta prueba permite ingresar un texto y generar un resumen, preguntas de opción múltiple y flashcards para facilitar el estudio del contenido proporcionado.
            </div>
            <div className='p-4'>
                <PruebaAIClient />
            </div>
        </div>
    )
}

export default page
