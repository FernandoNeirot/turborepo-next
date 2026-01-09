import React, { useRef, useEffect } from 'react'

export interface RadiobuttonProps {
    texto: string
    opcionValida?: boolean
    showStatus?: boolean
    name?: string
    value?: string
    checked?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    isDisabled?: boolean
    id?: string
}

const Radiobutton = ({
    texto,
    opcionValida,
    showStatus = false,
    name,
    value,
    checked,
    onChange,
    isDisabled = false,
    id,
}: RadiobuttonProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const previousCheckedRef = useRef(checked)

    useEffect(() => {
        previousCheckedRef.current = checked
    }, [checked])

    const getTextColor = () => {
        if (!showStatus) {
            return isDisabled ? 'text-gray-400' : 'text-gray-700'
        }

        if (opcionValida === true) {
            return 'text-green-600'
        } else if (opcionValida === false) {
            return 'text-red-600'
        }

        return isDisabled ? 'text-gray-400' : 'text-gray-700'
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isDisabled) return

        if (onChange) {
            onChange(e)
        }
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
        if (isDisabled) return

        // Si el radio button ya está checked, permitir deschequearlo
        if (checked && onChange && inputRef.current) {
            e.preventDefault()
            e.stopPropagation()

            // Usar setTimeout para que se procese después del preventDefault
            setTimeout(() => {
                if (inputRef.current) {
                    // Forzar el deschequeo del input directamente
                    inputRef.current.checked = false

                    // Crear y disparar el evento onChange sintético
                    const syntheticEvent = {
                        target: {
                            ...inputRef.current,
                            checked: false,
                            value: value || '',
                        },
                        currentTarget: {
                            ...inputRef.current,
                            checked: false,
                            value: value || '',
                        },
                    } as React.ChangeEvent<HTMLInputElement>

                    onChange(syntheticEvent)
                }
            }, 0)
        }
        // Si no está checked, dejar que el comportamiento normal funcione
    }

    return (
        <div className="flex items-center gap-2">
            <input
                ref={inputRef}
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={handleChange}
                onMouseUp={handleMouseUp}
                disabled={isDisabled}
                className={`
          w-4 h-4
          ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          focus:ring-2 focus:ring-blue-300
        `}
            />
            <label
                htmlFor={id}
                onMouseUp={(e) => {
                    if (checked && onChange && !isDisabled && inputRef.current) {
                        e.preventDefault()
                        e.stopPropagation()
                        setTimeout(() => {
                            if (inputRef.current) {
                                inputRef.current.checked = false
                                const syntheticEvent = {
                                    target: {
                                        ...inputRef.current,
                                        checked: false,
                                        value: value || '',
                                    },
                                    currentTarget: {
                                        ...inputRef.current,
                                        checked: false,
                                        value: value || '',
                                    },
                                } as React.ChangeEvent<HTMLInputElement>
                                onChange(syntheticEvent)
                            }
                        }, 0)
                    }
                }}
                className={`
          ${getTextColor()}
          ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          text-sm font-medium
        `}
            >
                {texto}
            </label>
        </div>
    )
}

export default Radiobutton
