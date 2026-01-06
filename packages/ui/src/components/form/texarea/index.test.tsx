import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Textarea from './index';

// Mock de Tiptap
vi.mock('@tiptap/react', () => {
  const mockEditor = {
    getHTML: vi.fn(() => '<p>Test content</p>'),
    getAttributes: vi.fn(() => ({})),
    chain: vi.fn(() => ({
      focus: vi.fn(() => ({
        toggleBold: vi.fn(() => ({ run: vi.fn() })),
        toggleItalic: vi.fn(() => ({ run: vi.fn() })),
        toggleStrike: vi.fn(() => ({ run: vi.fn() })),
        toggleBulletList: vi.fn(() => ({ run: vi.fn() })),
        toggleOrderedList: vi.fn(() => ({ run: vi.fn() })),
        toggleBlockquote: vi.fn(() => ({ run: vi.fn() })),
        setHorizontalRule: vi.fn(() => ({ run: vi.fn() })),
        setFontSize: vi.fn(() => ({ run: vi.fn() })),
        unsetFontSize: vi.fn(() => ({ run: vi.fn() })),
        setColor: vi.fn(() => ({ run: vi.fn() })),
        unsetColor: vi.fn(() => ({ run: vi.fn() })),
        extendMarkRange: vi.fn(() => ({
          setLink: vi.fn(() => ({ run: vi.fn() })),
        })),
        unsetLink: vi.fn(() => ({ run: vi.fn() })),
      })),
    })),
    can: vi.fn(() => ({
      chain: vi.fn(() => ({
        focus: vi.fn(() => ({
          toggleBold: vi.fn(() => ({ run: vi.fn(() => true) })),
          toggleItalic: vi.fn(() => ({ run: vi.fn(() => true) })),
          toggleStrike: vi.fn(() => ({ run: vi.fn(() => true) })),
        })),
      })),
    })),
    isActive: vi.fn(() => false),
    setEditable: vi.fn(),
    commands: {
      setContent: vi.fn(),
    },
    on: vi.fn(),
    off: vi.fn(),
    destroy: vi.fn(),
  };

  return {
    useEditor: vi.fn(() => mockEditor),
    EditorContent: ({ editor }: { editor: typeof mockEditor }) => (
      <div data-testid="editor-content">Editor Content</div>
    ),
  };
});

describe('Textarea Component', () => {
  describe('Renderizado básico (modo normal)', () => {
    it('debe renderizar el textarea', () => {
      render(<Textarea />);

      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeInTheDocument();
      expect(textarea.tagName).toBe('TEXTAREA');
    });

    it('debe renderizar el textarea con un label', () => {
      render(<Textarea label="Descripción" />);

      const label = screen.getByText('Descripción');
      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe('LABEL');
    });

    it('debe renderizar el textarea sin label cuando no se proporciona', () => {
      render(<Textarea />);

      const label = screen.queryByRole('label');
      expect(label).not.toBeInTheDocument();
    });

    it('debe renderizar el textarea con un placeholder', () => {
      render(<Textarea placeholder="Escribe aquí" />);

      const textarea = screen.getByPlaceholderText('Escribe aquí');
      expect(textarea).toBeInTheDocument();
    });

    it('debe renderizar el textarea con un value', () => {
      render(<Textarea value="Test value" onChange={() => {}} />);

      const textarea = screen.getByDisplayValue('Test value');
      expect(textarea).toBeInTheDocument();
    });

    it('debe renderizar el textarea con name e id', () => {
      render(<Textarea name="test-textarea" id="test-id" />);

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('name', 'test-textarea');
      expect(textarea).toHaveAttribute('id', 'test-id');
    });

    it('debe tener rows por defecto', () => {
      render(<Textarea />);

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('rows', '4');
    });

    it('debe aplicar rows personalizado', () => {
      render(<Textarea rows={6} />);

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('rows', '6');
    });
  });

  describe('Estados y validación', () => {
    it('debe mostrar el mensaje de error cuando se proporciona', () => {
      render(<Textarea error="Este campo es requerido" />);

      const errorMessage = screen.getByText('Este campo es requerido');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass('text-red-500');
    });

    it('debe mostrar el helperText cuando no hay error', () => {
      render(<Textarea helperText="Texto de ayuda" />);

      const helperText = screen.getByText('Texto de ayuda');
      expect(helperText).toBeInTheDocument();
      expect(helperText).toHaveClass('text-gray-500');
    });

    it('no debe mostrar helperText cuando hay error', () => {
      render(<Textarea error="Error" helperText="Helper text" />);

      const helperText = screen.queryByText('Helper text');
      expect(helperText).not.toBeInTheDocument();
    });

    it('debe aplicar aria-invalid cuando hay error', () => {
      render(<Textarea error="Error" />);

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-invalid', 'true');
    });

    it('debe aplicar aria-label cuando hay label', () => {
      render(<Textarea label="Test Label" />);

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-label', 'Test Label');
    });
  });

  describe('Estado deshabilitado', () => {
    it('debe estar deshabilitado cuando isDisabled es true', () => {
      render(<Textarea isDisabled />);

      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeDisabled();
    });

    it('debe aplicar las clases correctas cuando está deshabilitado', () => {
      render(<Textarea isDisabled label="Disabled Textarea" />);

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('border-gray-200', 'cursor-not-allowed', 'text-gray-400');
    });

    it('debe aplicar estilos al label cuando está deshabilitado', () => {
      render(<Textarea isDisabled label="Disabled Label" />);

      const label = screen.getByText('Disabled Label');
      expect(label).toHaveClass('text-gray-300');
    });

    it('debe aplicar estilos al helperText cuando está deshabilitado', () => {
      render(<Textarea isDisabled helperText="Helper text" />);

      const helperText = screen.getByText('Helper text');
      expect(helperText).toHaveClass('text-gray-200');
    });
  });

  describe('Variantes', () => {
    it('debe aplicar la variante default por defecto', () => {
      render(<Textarea />);

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('border');
    });

    it('debe aplicar la variante search correctamente', () => {
      render(<Textarea variant="search" />);

      const textarea = screen.getByRole('textbox');
      expect(textarea).not.toHaveClass('border');
      expect(textarea).toHaveClass('focus:ring-transparent');
    });

    it('debe aplicar focus:ring-blue-300 cuando appName es "web"', () => {
      render(<Textarea appName="web" />);

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('focus:ring-blue-300');
    });

    it('debe aplicar focus:ring-purple-300 cuando appName es "storybook"', () => {
      render(<Textarea appName="storybook" />);

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('focus:ring-purple-300');
    });
  });

  describe('Interacciones', () => {
    it('debe llamar onChange cuando se escribe en el textarea', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Textarea onChange={handleChange} />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'test');

      expect(handleChange).toHaveBeenCalled();
    });

    it('debe llamar onBlur cuando el textarea pierde el foco', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();

      render(<Textarea onBlur={handleBlur} />);

      const textarea = screen.getByRole('textbox');
      await user.click(textarea);
      await user.tab();

      expect(handleBlur).toHaveBeenCalled();
    });

    it('debe llamar onFocus cuando el textarea recibe el foco', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();

      render(<Textarea onFocus={handleFocus} />);

      const textarea = screen.getByRole('textbox');
      await user.click(textarea);

      expect(handleFocus).toHaveBeenCalled();
    });

    it('debe llamar onKeyDown cuando se presiona una tecla', async () => {
      const user = userEvent.setup();
      const handleKeyDown = vi.fn();

      render(<Textarea onKeyDown={handleKeyDown} />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'a');

      expect(handleKeyDown).toHaveBeenCalled();
    });

    it('debe llamar onKeyUp cuando se suelta una tecla', async () => {
      const user = userEvent.setup();
      const handleKeyUp = vi.fn();

      render(<Textarea onKeyUp={handleKeyUp} />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'a');

      expect(handleKeyUp).toHaveBeenCalled();
    });

    it('no debe llamar onChange cuando está deshabilitado', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Textarea isDisabled onChange={handleChange} />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'test');

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Modo RichText', () => {
    it('debe renderizar el editor rich text cuando richText es true', async () => {
      render(<Textarea richText value="<p>Test</p>" />);

      await waitFor(() => {
        const editorContent = screen.getByTestId('editor-content');
        expect(editorContent).toBeInTheDocument();
      });
    });

    it('debe mostrar el toolbar cuando richText es true y no está deshabilitado', async () => {
      render(<Textarea richText />);

      await waitFor(() => {
        const toolbar = screen.getByText('B');
        expect(toolbar).toBeInTheDocument();
      });
    });

    it('no debe mostrar el toolbar cuando está deshabilitado', async () => {
      render(<Textarea richText isDisabled />);

      await waitFor(() => {
        const toolbar = screen.queryByText('B');
        expect(toolbar).not.toBeInTheDocument();
      });
    });

    it('debe llamar onRichTextChange cuando se actualiza el contenido', async () => {
      const handleRichTextChange = vi.fn();
      render(<Textarea richText onRichTextChange={handleRichTextChange} />);

      await waitFor(() => {
        expect(screen.getByTestId('editor-content')).toBeInTheDocument();
      });
    });
  });

  describe('Ref forwarding', () => {
    it('debe poder recibir una ref', () => {
      const ref = vi.fn();
      render(<Textarea ref={ref} />);

      expect(ref).toHaveBeenCalled();
    });
  });

  describe('Props adicionales', () => {
    it('debe pasar props adicionales al textarea', () => {
      render(<Textarea data-testid="custom-textarea" aria-label="Custom" />);

      const textarea = screen.getByTestId('custom-textarea');
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute('aria-label', 'Custom');
    });
  });

  describe('Estilos de error', () => {
    it('debe aplicar border-red-500 cuando hay error', () => {
      render(<Textarea error="Error message" />);

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('border-red-500');
    });

    it('no debe aplicar border-red-500 cuando no hay error', () => {
      render(<Textarea />);

      const textarea = screen.getByRole('textbox');
      expect(textarea).not.toHaveClass('border-red-500');
      expect(textarea).toHaveClass('border-gray-300');
    });
  });

  describe('Resize', () => {
    it('debe tener resize-y por defecto', () => {
      render(<Textarea />);

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('resize-y');
    });
  });
});

