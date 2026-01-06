import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './index';

describe('Input Component', () => {
  describe('Renderizado básico', () => {
    it('debe renderizar el input', () => {
      render(<Input />);

      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('debe renderizar el input con un label', () => {
      render(<Input label="Nombre" />);

      const label = screen.getByText('Nombre');
      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe('LABEL');
    });

    it('debe renderizar el input sin label cuando no se proporciona', () => {
      render(<Input />);

      const label = screen.queryByRole('label');
      expect(label).not.toBeInTheDocument();
    });

    it('debe renderizar el input con un placeholder', () => {
      render(<Input placeholder="Escribe aquí" />);

      const input = screen.getByPlaceholderText('Escribe aquí');
      expect(input).toBeInTheDocument();
    });

    it('debe renderizar el input con un value', () => {
      render(<Input value="Test value" onChange={() => {}} />);

      const input = screen.getByDisplayValue('Test value');
      expect(input).toBeInTheDocument();
    });

    it('debe renderizar el input con name e id', () => {
      render(<Input name="test-input" id="test-id" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('name', 'test-input');
      expect(input).toHaveAttribute('id', 'test-id');
    });
  });

  describe('Tipos de input', () => {
    it('debe renderizar con type="text" por defecto', () => {
      render(<Input />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('debe renderizar con type="email" cuando se especifica', () => {
      render(<Input type="email" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('debe renderizar con type="password" cuando se especifica', () => {
      render(<Input type="password" />);

      const input = document.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });

    it('debe renderizar con type="number" cuando se especifica', () => {
      render(<Input type="number" />);

      const input = document.querySelector('input[type="number"]');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Estados y validación', () => {
    it('debe mostrar el mensaje de error cuando se proporciona', () => {
      render(<Input error="Este campo es requerido" />);

      const errorMessage = screen.getByText('Este campo es requerido');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass('text-red-500');
    });

    it('debe mostrar el helperText cuando no hay error', () => {
      render(<Input helperText="Texto de ayuda" />);

      const helperText = screen.getByText('Texto de ayuda');
      expect(helperText).toBeInTheDocument();
      expect(helperText).toHaveClass('text-gray-500');
    });

    it('no debe mostrar helperText cuando hay error', () => {
      render(<Input error="Error" helperText="Helper text" />);

      const helperText = screen.queryByText('Helper text');
      expect(helperText).not.toBeInTheDocument();
    });

    it('debe aplicar aria-invalid cuando hay error', () => {
      render(<Input error="Error" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('debe aplicar aria-label cuando hay label', () => {
      render(<Input label="Test Label" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label', 'Test Label');
    });
  });

  describe('Estado deshabilitado', () => {
    it('debe estar deshabilitado cuando isDisabled es true', () => {
      render(<Input isDisabled />);

      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('debe aplicar las clases correctas cuando está deshabilitado', () => {
      render(<Input isDisabled label="Disabled Input" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-gray-200', 'cursor-not-allowed', 'text-gray-400');
    });

    it('debe aplicar estilos al label cuando está deshabilitado', () => {
      render(<Input isDisabled label="Disabled Label" />);

      const label = screen.getByText('Disabled Label');
      expect(label).toHaveClass('text-gray-300');
    });

    it('debe aplicar estilos al helperText cuando está deshabilitado', () => {
      render(<Input isDisabled helperText="Helper text" />);

      const helperText = screen.getByText('Helper text');
      expect(helperText).toHaveClass('text-gray-200');
    });
  });

  describe('Variantes', () => {
    it('debe aplicar la variante default por defecto', () => {
      render(<Input />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border');
    });

    it('debe aplicar la variante search correctamente', () => {
      render(<Input variant="search" />);

      const input = screen.getByRole('textbox');
      expect(input).not.toHaveClass('border');
      expect(input).toHaveClass('focus:ring-transparent');
    });

    it('debe aplicar focus:ring-blue-300 cuando appName es "web"', () => {
      render(<Input appName="web" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('focus:ring-blue-300');
    });

    it('debe aplicar focus:ring-purple-300 cuando appName es "storybook"', () => {
      render(<Input appName="storybook" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('focus:ring-purple-300');
    });

    it('debe aplicar focus:ring-transparent cuando variant es "search"', () => {
      render(<Input variant="search" appName="web" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('focus:ring-transparent');
    });
  });

  describe('Interacciones', () => {
    it('debe llamar onChange cuando se escribe en el input', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Input onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'test');

      expect(handleChange).toHaveBeenCalled();
    });

    it('debe llamar onBlur cuando el input pierde el foco', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();

      render(<Input onBlur={handleBlur} />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.tab();

      expect(handleBlur).toHaveBeenCalled();
    });

    it('debe llamar onFocus cuando el input recibe el foco', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();

      render(<Input onFocus={handleFocus} />);

      const input = screen.getByRole('textbox');
      await user.click(input);

      expect(handleFocus).toHaveBeenCalled();
    });

    it('debe llamar onKeyDown cuando se presiona una tecla', async () => {
      const user = userEvent.setup();
      const handleKeyDown = vi.fn();

      render(<Input onKeyDown={handleKeyDown} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'a');

      expect(handleKeyDown).toHaveBeenCalled();
    });

    it('debe llamar onKeyUp cuando se suelta una tecla', async () => {
      const user = userEvent.setup();
      const handleKeyUp = vi.fn();

      render(<Input onKeyUp={handleKeyUp} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'a');

      expect(handleKeyUp).toHaveBeenCalled();
    });

    it('no debe llamar onChange cuando está deshabilitado', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Input isDisabled onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'test');

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Ref forwarding', () => {
    it('debe poder recibir una ref', () => {
      const ref = vi.fn();
      render(<Input ref={ref} />);

      expect(ref).toHaveBeenCalled();
    });
  });

  describe('Props adicionales', () => {
    it('debe pasar props adicionales al input', () => {
      render(<Input data-testid="custom-input" aria-label="Custom" />);

      const input = screen.getByTestId('custom-input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('aria-label', 'Custom');
    });

    it('debe aplicar className personalizado si se proporciona', () => {
      render(<Input className="custom-class" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-class');
    });
  });

  describe('Estilos de error', () => {
    it('debe aplicar border-red-500 cuando hay error', () => {
      render(<Input error="Error message" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-red-500');
    });

    it('no debe aplicar border-red-500 cuando no hay error', () => {
      render(<Input />);

      const input = screen.getByRole('textbox');
      expect(input).not.toHaveClass('border-red-500');
      expect(input).toHaveClass('border-gray-300');
    });
  });
});

