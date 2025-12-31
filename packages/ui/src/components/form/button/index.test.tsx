import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './index';

describe('Button Component', () => {
  describe('Renderizado básico', () => {
    it('debe renderizar el botón con un label', () => {
      const handleClick = vi.fn();
      render(<Button label="Click me" onClick={handleClick} />);
      
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
    });

    it('debe renderizar el botón sin label cuando no se proporciona', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick} />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('');
    });
  });

  describe('Interacciones', () => {
    it('debe llamar onClick cuando se hace click en el botón', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(<Button label="Click me" onClick={handleClick} />);
      
      const button = screen.getByRole('button', { name: /click me/i });
      await user.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('no debe llamar onClick cuando el botón está deshabilitado', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(<Button label="Disabled" onClick={handleClick} isDisabled />);
      
      const button = screen.getByRole('button', { name: /disabled/i });
      await user.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('debe estar deshabilitado cuando isDisabled es true', () => {
      const handleClick = vi.fn();
      render(<Button label="Disabled" onClick={handleClick} isDisabled />);
      
      const button = screen.getByRole('button', { name: /disabled/i });
      expect(button).toBeDisabled();
    });
  });

  describe('Iconos', () => {
    it('debe renderizar un icono cuando se proporciona', () => {
      const handleClick = vi.fn();
      render(<Button label="Search" onClick={handleClick} icon="search" />);
      
      const button = screen.getByRole('button', { name: /search/i });
      const icon = button.querySelector('svg');
      
      expect(icon).toBeInTheDocument();
    });

    it('no debe renderizar un icono cuando icon es null', () => {
      const handleClick = vi.fn();
      render(<Button label="No Icon" onClick={handleClick} icon={null} />);
      
      const button = screen.getByRole('button', { name: /no icon/i });
      const icon = button.querySelector('svg');
      
      expect(icon).not.toBeInTheDocument();
    });

    it('debe renderizar diferentes iconos según la prop icon', () => {
      const handleClick = vi.fn();
      const { rerender } = render(
        <Button label="Test" onClick={handleClick} icon="home" />
      );
      
      let button = screen.getByRole('button');
      expect(button.querySelector('svg')).toBeInTheDocument();
      
      rerender(<Button label="Test" onClick={handleClick} icon="user" />);
      button = screen.getByRole('button');
      expect(button.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Variantes y tamaños', () => {
    it('debe aplicar la clase correcta para size="small"', () => {
      const handleClick = vi.fn();
      render(<Button label="Small" onClick={handleClick} size="small" />);
      
      const button = screen.getByRole('button', { name: /small/i });
      expect(button).toHaveClass('px-3', 'text-sm');
    });

    it('debe aplicar la clase correcta para size="default"', () => {
      const handleClick = vi.fn();
      render(<Button label="Default" onClick={handleClick} size="default" />);
      
      const button = screen.getByRole('button', { name: /default/i });
      expect(button).toHaveClass('px-4', 'py-2', 'text-base');
    });

    it('debe aplicar la clase correcta para variant="search"', () => {
      const handleClick = vi.fn();
      render(<Button label="Search" onClick={handleClick} variant="search" />);
      
      const button = screen.getByRole('button', { name: /search/i });
      expect(button).toHaveClass('rounded-r-xl');
    });

    it('debe aplicar la clase correcta para variant="default"', () => {
      const handleClick = vi.fn();
      render(<Button label="Default" onClick={handleClick} variant="default" />);
      
      const button = screen.getByRole('button', { name: /default/i });
      expect(button).toHaveClass('rounded-lg');
    });
  });

  describe('Colores de fondo', () => {
    it('debe aplicar el color de fondo TRANSPARENT por defecto cuando no se especifica', () => {
      const handleClick = vi.fn();
      render(<Button label="Test" onClick={handleClick} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-transparent');
    });

    it('debe aplicar el color de fondo BLUE cuando se especifica', () => {
      const handleClick = vi.fn();
      render(<Button label="Test" onClick={handleClick} backgroundColor="BLUE" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-blue-700');
    });

    it('debe aplicar el color de fondo GREEN cuando se especifica', () => {
      const handleClick = vi.fn();
      render(<Button label="Test" onClick={handleClick} backgroundColor="GREEN" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-green-700');
    });

    it('debe aplicar el color de fondo TRANSPARENT cuando se especifica', () => {
      const handleClick = vi.fn();
      render(<Button label="Test" onClick={handleClick} backgroundColor="TRANSPARENT" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-transparent');
      expect(button).not.toHaveClass('shadow-md');
    });

    it('debe aplicar shadow-md cuando el background no es TRANSPARENT', () => {
      const handleClick = vi.fn();
      render(<Button label="Test" onClick={handleClick} backgroundColor="BLUE" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('shadow-md');
    });
  });

  describe('Estilos personalizados', () => {
    it('debe aplicar el textColor personalizado mediante style', () => {
      const handleClick = vi.fn();
      render(<Button label="Test" onClick={handleClick} textColor="#ff0000" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ color: '#ff0000' });
    });

    it('debe aplicar el width personalizado mediante style', () => {
      const handleClick = vi.fn();
      render(<Button label="Test" onClick={handleClick} width="200px" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ width: '200px' });
    });
  });

  describe('Estados deshabilitados', () => {
    it('debe aplicar las clases correctas cuando está deshabilitado', () => {
      const handleClick = vi.fn();
      render(<Button label="Disabled" onClick={handleClick} isDisabled />);
      
      const button = screen.getByRole('button', { name: /disabled/i });
      expect(button).toHaveClass('bg-gray-200', 'cursor-not-allowed', 'text-gray-300');
    });

    it('debe tener cursor-pointer cuando no está deshabilitado', () => {
      const handleClick = vi.fn();
      render(<Button label="Enabled" onClick={handleClick} />);
      
      const button = screen.getByRole('button', { name: /enabled/i });
      expect(button).toHaveClass('cursor-pointer');
    });
  });

  describe('Tamaños de iconos', () => {
    it('debe renderizar icono pequeño cuando size="small"', () => {
      const handleClick = vi.fn();
      render(<Button label="Small" onClick={handleClick} icon="search" size="small" />);
      
      const button = screen.getByRole('button');
      const icon = button.querySelector('svg');
      
      expect(icon).toHaveClass('w-4', 'h-4');
    });

    it('debe renderizar icono grande cuando size="default"', () => {
      const handleClick = vi.fn();
      render(<Button label="Default" onClick={handleClick} icon="search" size="default" />);
      
      const button = screen.getByRole('button');
      const icon = button.querySelector('svg');
      
      expect(icon).toHaveClass('w-5', 'h-5');
    });
  });

  describe('Espaciado con iconos', () => {
    it('debe aplicar margin-left al label cuando hay un icono', () => {
      const handleClick = vi.fn();
      render(<Button label="With Icon" onClick={handleClick} icon="search" />);
      
      const button = screen.getByRole('button', { name: /with icon/i });
      const label = button.querySelector('span');
      
      expect(label).toHaveClass('ml-2');
    });

    it('no debe aplicar margin-left al label cuando no hay icono', () => {
      const handleClick = vi.fn();
      render(<Button label="No Icon" onClick={handleClick} />);
      
      const button = screen.getByRole('button', { name: /no icon/i });
      const label = button.querySelector('span');
      
      expect(label).not.toHaveClass('ml-2');
    });
  });

  describe('Accesibilidad', () => {
    it('debe tener type="button" por defecto', () => {
      const handleClick = vi.fn();
      render(<Button label="Test" onClick={handleClick} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('debe ser accesible mediante el label', () => {
      const handleClick = vi.fn();
      render(<Button label="Accessible Button" onClick={handleClick} />);
      
      const button = screen.getByRole('button', { name: /accessible button/i });
      expect(button).toBeInTheDocument();
    });
  });
});

