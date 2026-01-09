import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Radiobutton from './index';

describe('Radiobutton Component', () => {
  describe('Renderizado básico', () => {
    it('debe renderizar el radio button con texto', () => {
      render(<Radiobutton texto="Opción 1" id="radio-1" />);

      const radio = screen.getByRole('radio');
      const label = screen.getByText('Opción 1');

      expect(radio).toBeInTheDocument();
      expect(label).toBeInTheDocument();
    });

    it('debe renderizar el radio button con name y value', () => {
      render(
        <Radiobutton
          texto="Opción 1"
          name="test-group"
          value="option1"
          id="radio-1"
        />
      );

      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('name', 'test-group');
      expect(radio).toHaveAttribute('value', 'option1');
    });

    it('debe renderizar el radio button con id', () => {
      render(<Radiobutton texto="Opción 1" id="radio-1" />);

      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('id', 'radio-1');
    });

    it('debe asociar el label con el input mediante htmlFor', () => {
      render(<Radiobutton texto="Opción 1" id="radio-1" />);

      const label = screen.getByText('Opción 1');
      expect(label).toHaveAttribute('for', 'radio-1');
    });
  });

  describe('Estado checked', () => {
    it('debe estar marcado cuando checked es true', () => {
      render(
        <Radiobutton
          texto="Opción 1"
          checked={true}
          name="test-group"
          id="radio-1"
        />
      );

      const radio = screen.getByRole('radio');
      expect(radio).toBeChecked();
    });

    it('no debe estar marcado cuando checked es false', () => {
      render(
        <Radiobutton
          texto="Opción 1"
          checked={false}
          name="test-group"
          id="radio-1"
        />
      );

      const radio = screen.getByRole('radio');
      expect(radio).not.toBeChecked();
    });

    it('no debe estar marcado cuando checked no se proporciona', () => {
      render(<Radiobutton texto="Opción 1" name="test-group" id="radio-1" />);

      const radio = screen.getByRole('radio');
      expect(radio).not.toBeChecked();
    });
  });

  describe('Estado deshabilitado', () => {
    it('debe estar deshabilitado cuando isDisabled es true', () => {
      render(<Radiobutton texto="Opción 1" isDisabled id="radio-1" />);

      const radio = screen.getByRole('radio');
      expect(radio).toBeDisabled();
    });

    it('debe aplicar las clases correctas cuando está deshabilitado', () => {
      render(<Radiobutton texto="Opción 1" isDisabled id="radio-1" />);

      const radio = screen.getByRole('radio');
      expect(radio).toHaveClass('cursor-not-allowed', 'opacity-50');
    });

    it('debe aplicar estilos al label cuando está deshabilitado', () => {
      render(<Radiobutton texto="Opción deshabilitada" isDisabled id="radio-1" />);

      const label = screen.getByText('Opción deshabilitada');
      expect(label).toHaveClass('text-gray-400', 'cursor-not-allowed');
    });

    it('no debe estar deshabilitado cuando isDisabled es false', () => {
      render(<Radiobutton texto="Opción 1" isDisabled={false} id="radio-1" />);

      const radio = screen.getByRole('radio');
      expect(radio).not.toBeDisabled();
    });
  });

  describe('Colores de texto según estado', () => {
    it('debe mostrar texto gris por defecto cuando showStatus es false', () => {
      render(<Radiobutton texto="Opción 1" id="radio-1" />);

      const label = screen.getByText('Opción 1');
      expect(label).toHaveClass('text-gray-700');
    });

    it('debe mostrar texto verde cuando showStatus es true y opcionValida es true', () => {
      render(
        <Radiobutton
          texto="Opción correcta"
          opcionValida={true}
          showStatus={true}
          id="radio-1"
        />
      );

      const label = screen.getByText('Opción correcta');
      expect(label).toHaveClass('text-green-600');
    });

    it('debe mostrar texto rojo cuando showStatus es true y opcionValida es false', () => {
      render(
        <Radiobutton
          texto="Opción incorrecta"
          opcionValida={false}
          showStatus={true}
          id="radio-1"
        />
      );

      const label = screen.getByText('Opción incorrecta');
      expect(label).toHaveClass('text-red-600');
    });

    it('debe mostrar texto gris cuando showStatus es true pero opcionValida es undefined', () => {
      render(
        <Radiobutton texto="Opción sin estado" showStatus={true} id="radio-1" />
      );

      const label = screen.getByText('Opción sin estado');
      expect(label).toHaveClass('text-gray-700');
    });

    it('debe mostrar texto gris cuando está deshabilitado y showStatus es false', () => {
      render(
        <Radiobutton texto="Opción deshabilitada" isDisabled id="radio-1" />
      );

      const label = screen.getByText('Opción deshabilitada');
      expect(label).toHaveClass('text-gray-400');
    });
  });

  describe('Interacciones', () => {
    it('debe llamar onChange cuando se hace click en el radio button', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Radiobutton
          texto="Opción 1"
          onChange={handleChange}
          name="test-group"
          value="option1"
          id="radio-1"
        />
      );

      const radio = screen.getByRole('radio');
      await user.click(radio);

      await new Promise(resolve => setTimeout(resolve, 10));

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('debe llamar onChange cuando se hace click en el label', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Radiobutton
          texto="Opción 1"
          onChange={handleChange}
          name="test-group"
          value="option1"
          id="radio-1"
        />
      );

      const label = screen.getByText('Opción 1');
      await user.click(label);

      // Esperar a que se procese el setTimeout si es necesario
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('debe permitir deschequear cuando está checked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Radiobutton
          texto="Opción 1"
          onChange={handleChange}
          name="test-group"
          value="option1"
          checked={true}
          id="radio-1"
        />
      );

      const radio = screen.getByRole('radio');
      expect(radio).toBeChecked();

      await user.click(radio);

      // Esperar a que se procese el setTimeout
      await new Promise(resolve => setTimeout(resolve, 10));

      // Debe llamar onChange con checked: false para deschequear
      expect(handleChange).toHaveBeenCalledTimes(1);
      const lastCall = handleChange.mock?.calls?.[0]?.[0];
      expect(lastCall?.target?.checked).toBe(false);
    });

    it('debe permitir deschequear desde el label cuando está checked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Radiobutton
          texto="Opción 1"
          onChange={handleChange}
          name="test-group"
          value="option1"
          checked={true}
          id="radio-1"
        />
      );

      const label = screen.getByText('Opción 1');
      await user.click(label);

      // Esperar a que se procese el setTimeout
      await new Promise(resolve => setTimeout(resolve, 10));

      // Debe llamar onChange con checked: false para deschequear
      expect(handleChange).toHaveBeenCalledTimes(1);
      const lastCall = handleChange.mock?.calls?.[0]?.[0];
      expect(lastCall?.target?.checked).toBe(false);
    });

    it('no debe llamar onChange cuando está deshabilitado', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Radiobutton
          texto="Opción 1"
          onChange={handleChange}
          isDisabled
          name="test-group"
          id="radio-1"
        />
      );

      const radio = screen.getByRole('radio');
      await user.click(radio);

      // Esperar un poco para asegurar que no se llama
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Grupos de radio buttons', () => {
    it('debe permitir seleccionar solo una opción en un grupo', async () => {
      const user = userEvent.setup();
      const handleChange1 = vi.fn();
      const handleChange2 = vi.fn();

      render(
        <>
          <Radiobutton
            texto="Opción 1"
            onChange={handleChange1}
            name="group"
            value="option1"
            id="radio-1"
          />
          <Radiobutton
            texto="Opción 2"
            onChange={handleChange2}
            name="group"
            value="option2"
            id="radio-2"
          />
        </>
      );

      const radio1 = screen.getByRole('radio', { name: /opción 1/i });
      const radio2 = screen.getByRole('radio', { name: /opción 2/i });

      await user.click(radio1);
      expect(handleChange1).toHaveBeenCalledTimes(1);

      await user.click(radio2);
      expect(handleChange2).toHaveBeenCalledTimes(1);
    });
  });

  describe('Estilos y clases CSS', () => {
    it('debe aplicar las clases correctas al input', () => {
      render(<Radiobutton texto="Opción 1" id="radio-1" />);

      const radio = screen.getByRole('radio');
      expect(radio).toHaveClass('w-4', 'h-4', 'cursor-pointer');
    });

    it('debe aplicar las clases correctas al label', () => {
      render(<Radiobutton texto="Opción 1" id="radio-1" />);

      const label = screen.getByText('Opción 1');
      expect(label).toHaveClass('text-sm', 'font-medium', 'cursor-pointer');
    });

    it('debe aplicar focus:ring-2 al input', () => {
      render(<Radiobutton texto="Opción 1" id="radio-1" />);

      const radio = screen.getByRole('radio');
      expect(radio).toHaveClass('focus:ring-2', 'focus:ring-blue-300');
    });
  });

  describe('Props opcionales', () => {
    it('debe funcionar sin onChange', () => {
      render(<Radiobutton texto="Opción 1" id="radio-1" />);

      const radio = screen.getByRole('radio');
      expect(radio).toBeInTheDocument();
    });

    it('debe funcionar sin name', () => {
      render(<Radiobutton texto="Opción 1" id="radio-1" />);

      const radio = screen.getByRole('radio');
      expect(radio).toBeInTheDocument();
    });

    it('debe funcionar sin value', () => {
      render(<Radiobutton texto="Opción 1" id="radio-1" />);

      const radio = screen.getByRole('radio');
      expect(radio).toBeInTheDocument();
    });
  });
});
