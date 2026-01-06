import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from './index';

describe('Search Component', () => {
  describe('Renderizado básico', () => {
    it('debe renderizar el componente Search', () => {
      const handleClick = vi.fn();
      const handleChange = vi.fn();

      render(<Search onClick={handleClick} onChange={handleChange} />);

      const input = screen.getByPlaceholderText('Buscar...');
      expect(input).toBeInTheDocument();
    });

    it('debe renderizar el input de búsqueda', () => {
      const handleClick = vi.fn();
      const handleChange = vi.fn();

      render(<Search onClick={handleClick} onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('placeholder', 'Buscar...');
    });

    it('debe renderizar el botón de búsqueda', () => {
      const handleClick = vi.fn();
      const handleChange = vi.fn();

      render(<Search onClick={handleClick} onChange={handleChange} />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('debe aplicar className personalizado', () => {
      const handleClick = vi.fn();
      const handleChange = vi.fn();

      render(<Search onClick={handleClick} onChange={handleChange} className="custom-class" />);

      const container = screen.getByRole('textbox').closest('div.flex.border');
      expect(container).toHaveClass('custom-class');
    });
  });

  describe('Interacciones', () => {
    it('debe llamar onClick cuando se hace clic en el botón de búsqueda', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const handleChange = vi.fn();

      render(<Search onClick={handleClick} onChange={handleChange} />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('debe llamar onChange cuando se escribe en el input', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const handleChange = vi.fn();

      render(<Search onClick={handleClick} onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'test');

      expect(handleChange).toHaveBeenCalled();
    });

    it('no debe llamar onClick cuando está deshabilitado', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const handleChange = vi.fn();

      render(<Search onClick={handleClick} onChange={handleChange} isDisabled />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('no debe permitir escribir cuando está deshabilitado', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const handleChange = vi.fn();

      render(<Search onClick={handleClick} onChange={handleChange} isDisabled />);

      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });
  });

  describe('Variantes', () => {
    it('debe aplicar la variante default por defecto', () => {
      const handleClick = vi.fn();
      const handleChange = vi.fn();

      render(<Search onClick={handleClick} onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border');
    });

    it('debe aplicar la variante search correctamente', () => {
      const handleClick = vi.fn();
      const handleChange = vi.fn();

      render(<Search onClick={handleClick} onChange={handleChange} variant="search" />);

      const input = screen.getByRole('textbox');
      expect(input).not.toHaveClass('border');
    });
  });

  describe('Colores de fondo del botón', () => {
    it('debe aplicar bgColor BLUE por defecto', () => {
      const handleClick = vi.fn();
      const handleChange = vi.fn();

      render(<Search onClick={handleClick} onChange={handleChange} />);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-blue-700');
    });

    it('debe aplicar bgColor GREEN cuando se especifica', () => {
      const handleClick = vi.fn();
      const handleChange = vi.fn();

      render(<Search onClick={handleClick} onChange={handleChange} bgColor="GREEN" />);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-green-700');
    });

    it('debe aplicar bgColor RED cuando se especifica', () => {
      const handleClick = vi.fn();
      const handleChange = vi.fn();

      render(<Search onClick={handleClick} onChange={handleChange} bgColor="RED" />);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-red-500');
    });

    it('debe aplicar bgColor PURPLE cuando se especifica', () => {
      const handleClick = vi.fn();
      const handleChange = vi.fn();

      render(<Search onClick={handleClick} onChange={handleChange} bgColor="PURPLE" />);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-purple-600');
    });
  });

  describe('Estado deshabilitado', () => {
    it('debe deshabilitar el input cuando isDisabled es true', () => {
      const handleClick = vi.fn();
      const handleChange = vi.fn();

      render(<Search onClick={handleClick} onChange={handleChange} isDisabled />);

      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('debe deshabilitar el botón cuando isDisabled es true', () => {
      const handleClick = vi.fn();
      const handleChange = vi.fn();

      render(<Search onClick={handleClick} onChange={handleChange} isDisabled />);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('Estructura del componente', () => {
    it('debe tener un contenedor flex con border', () => {
      const handleClick = vi.fn();
      const handleChange = vi.fn();

      render(<Search onClick={handleClick} onChange={handleChange} />);

      const container = screen.getByRole('textbox').closest('div.flex.border');
      expect(container).toHaveClass('border', 'rounded-xl', 'border-gray-300', 'overflow-hidden');
    });

    it('debe renderizar el input antes del botón', () => {
      const handleClick = vi.fn();
      const handleChange = vi.fn();

      render(<Search onClick={handleClick} onChange={handleChange} />);

      const container = screen.getByRole('textbox').closest('div.flex.border');
      const children = container?.children;

      expect(children?.[0]).toContainElement(screen.getByRole('textbox'));
      expect(children?.[1]).toContainElement(screen.getByRole('button'));
    });
  });

  describe('Icono de búsqueda', () => {
    it('debe renderizar el icono de búsqueda en el botón', () => {
      const handleClick = vi.fn();
      const handleChange = vi.fn();

      render(<Search onClick={handleClick} onChange={handleChange} />);

      const button = screen.getByRole('button');
      const icon = button.querySelector('svg');

      expect(icon).toBeInTheDocument();
    });

    it('debe usar el icono search por defecto', () => {
      const handleClick = vi.fn();
      const handleChange = vi.fn();

      render(<Search onClick={handleClick} onChange={handleChange} />);

      const button = screen.getByRole('button');
      const icon = button.querySelector('svg');

      expect(icon).toBeInTheDocument();
    });
  });

  describe('Props opcionales', () => {
    it('debe funcionar sin label', () => {
      const handleClick = vi.fn();
      const handleChange = vi.fn();

      render(<Search onClick={handleClick} onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('debe funcionar sin icon personalizado', () => {
      const handleClick = vi.fn();
      const handleChange = vi.fn();

      render(<Search onClick={handleClick} onChange={handleChange} />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });
});

