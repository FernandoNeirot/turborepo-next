import { TextareaHTMLAttributes, forwardRef, useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontSize } from "@tiptap/extension-text-style/font-size";
import { Color } from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  appName?: "web" | "storybook";
  isDisabled?: boolean;
  name?: string;
  id?: string;
  value?: string;
  placeholder?: string;
  variant?: "default" | "search";
  rows?: number;
  cols?: number;
  richText?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onRichTextChange?: (content: string) => void;
}

const Textarea = forwardRef<
  HTMLTextAreaElement | HTMLDivElement,
  TextareaProps
>(
  (
    {
      label,
      error,
      helperText,
      appName,
      isDisabled,
      onChange,
      name,
      id,
      value,
      placeholder,
      onBlur,
      onFocus,
      onKeyDown,
      onKeyUp,
      variant = "default",
      rows = 4,
      cols,
      richText = false,
      onRichTextChange,
      ...rest
    },
    ref
  ) => {
    const editor = useEditor({
      immediatelyRender: false,
      extensions: [
        StarterKit,
        TextStyle,
        FontSize,
        Color,
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: "text-blue-600 underline cursor-pointer",
          },
        }),
        Placeholder.configure({
          placeholder: placeholder || "Escribe algo...",
        }),
      ],
      content: value || "",
      editable: !isDisabled && richText,
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        // Llamar a onRichTextChange si existe
        if (onRichTextChange) {
          onRichTextChange(html);
        }
        // Crear un evento sintético para mantener compatibilidad con onChange
        const syntheticEvent = {
          target: { value: html },
          currentTarget: { value: html },
        } as React.ChangeEvent<HTMLTextAreaElement>;
        onChange?.(syntheticEvent);
      },
      onBlur: () => {
        if (onBlur && editor) {
          const html = editor.getHTML();
          const syntheticEvent = {
            target: { value: html },
            currentTarget: { value: html },
          } as React.FocusEvent<HTMLTextAreaElement>;
          onBlur(syntheticEvent);
        }
      },
      editorProps: {
        attributes: {
          class: "focus:outline-none min-h-[150px] p-3",
        },
      },
    });

    // Sincronizar con el value prop externo
    useEffect(() => {
      if (
        editor &&
        richText &&
        value !== undefined &&
        editor.getHTML() !== value
      ) {
        editor.commands.setContent(value);
      }
    }, [editor, richText, value]);

    // Deshabilitar/habilitar el editor
    useEffect(() => {
      if (editor && richText) {
        editor.setEditable(!isDisabled);
      }
    }, [editor, richText, isDisabled]);

    // Si richText está activado, usar Tiptap
    const [linkUrl, setLinkUrl] = useState("");
    const [showLinkInput, setShowLinkInput] = useState(false);

    if (richText) {
      if (!editor) {
        return null;
      }

      const handleSetLink = () => {
        if (linkUrl) {
          editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: linkUrl })
            .run();
          setLinkUrl("");
          setShowLinkInput(false);
        }
      };

      const handleUnsetLink = () => {
        editor.chain().focus().unsetLink().run();
        setLinkUrl("");
        setShowLinkInput(false);
      };

      const classByAppName =
        appName === "web"
          ? "focus-within:ring-blue-300"
          : "focus-within:ring-purple-300";

      return (
        <div className="flex flex-col gap-1 w-full">
          {label && (
            <label
              className={`text-sm font-medium ${isDisabled ? "text-gray-300" : "text-gray-700"}`}
            >
              {label}
            </label>
          )}
          <div
            className={`
              border rounded-md
              ${error ? "border-red-500" : "border-gray-300"}
              ${isDisabled ? "bg-gray-50 cursor-not-allowed" : "bg-white"}
              ${classByAppName}
              focus-within:ring-2 focus-within:outline-none
            `}
          >
            {/* Toolbar */}
            {!isDisabled && (
              <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50">
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  disabled={!editor.can().chain().focus().toggleBold().run()}
                  className={`
                    px-2 py-1 text-sm rounded
                    ${
                      editor.isActive("bold")
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  <strong>B</strong>
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  disabled={!editor.can().chain().focus().toggleItalic().run()}
                  className={`
                    px-2 py-1 text-sm rounded italic
                    ${
                      editor.isActive("italic")
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  <em>I</em>
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  disabled={!editor.can().chain().focus().toggleStrike().run()}
                  className={`
                    px-2 py-1 text-sm rounded line-through
                    ${
                      editor.isActive("strike")
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  S
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1" />

                <select
                  onChange={(e) => {
                    const size = e.target.value;
                    if (size === "default") {
                      editor.chain().focus().unsetFontSize().run();
                    } else {
                      editor.chain().focus().setFontSize(`${size}px`).run();
                    }
                  }}
                  className="px-2 py-1 text-sm rounded bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  value={
                    (
                      editor.getAttributes("fontSize")?.fontSize as string
                    )?.replace("px", "") || "default"
                  }
                >
                  <option value="default">Tamaño</option>
                  <option value="10">10px</option>
                  <option value="12">12px</option>
                  <option value="14">14px</option>
                  <option value="16">16px</option>
                  <option value="18">18px</option>
                  <option value="20">20px</option>
                  <option value="24">24px</option>
                  <option value="28">28px</option>
                  <option value="32">32px</option>
                  <option value="36">36px</option>
                  <option value="48">48px</option>
                </select>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                {/* Selector de color de texto */}
                <div className="flex items-center gap-1">
                  <input
                    type="color"
                    onChange={(e) => {
                      const color = e.target.value;
                      editor.chain().focus().setColor(color).run();
                    }}
                    value={
                      (editor.getAttributes("textStyle")?.color as string) ||
                      "#000000"
                    }
                    className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                    title="Color de texto"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      editor.chain().focus().unsetColor().run();
                    }}
                    className="px-2 py-1 text-xs rounded bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                    title="Quitar color"
                  >
                    Sin color
                  </button>
                </div>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <button
                  type="button"
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={`
                    px-2 py-1 text-sm rounded
                    ${
                      editor.isActive("bulletList")
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  • Lista
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={`
                    px-2 py-1 text-sm rounded
                    ${
                      editor.isActive("orderedList")
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  1. Lista
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <button
                  type="button"
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                  className={`
                    px-2 py-1 text-sm rounded
                    ${
                      editor.isActive("blockquote")
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  "
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor.chain().focus().setHorizontalRule().run()
                  }
                  className="px-2 py-1 text-sm rounded bg-white text-gray-700 hover:bg-gray-100"
                >
                  ─
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <button
                  type="button"
                  onClick={() => {
                    const previousUrl = editor.getAttributes("link").href;
                    if (previousUrl) {
                      setLinkUrl(previousUrl);
                    }
                    setShowLinkInput(!showLinkInput);
                  }}
                  className={`
                    px-2 py-1 text-sm rounded
                    ${
                      editor.isActive("link")
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }
                  `}
                  title="Agregar enlace"
                >
                  🔗
                </button>
                {showLinkInput && (
                  <div className="flex items-center gap-1 px-2">
                    <input
                      type="url"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      placeholder="https://..."
                      className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSetLink();
                        } else if (e.key === "Escape") {
                          setShowLinkInput(false);
                          setLinkUrl("");
                        }
                      }}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleSetLink}
                      className="px-2 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Aplicar
                    </button>
                    <button
                      type="button"
                      onClick={handleUnsetLink}
                      className="px-2 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600"
                    >
                      Quitar
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* Editor Content */}
            <div className="min-h-[150px] [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:list-item">
              <EditorContent editor={editor} />
            </div>
          </div>
          {error && <span className="text-sm text-red-500">{error}</span>}
          {helperText && !error && (
            <span
              className={`text-sm ${isDisabled ? "text-gray-200" : "text-gray-500"}`}
            >
              {helperText}
            </span>
          )}
          {/* Hidden input para formularios */}
          {name && (
            <input
              type="hidden"
              name={name}
              id={id}
              value={editor.getHTML()}
              readOnly
            />
          )}
        </div>
      );
    }

    // Textarea normal
    const classByAppName =
      variant === "search"
        ? "focus:ring-transparent"
        : appName === "web"
          ? "focus:ring-blue-300"
          : "focus:ring-purple-300";
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label
            className={`text-sm font-medium ${isDisabled ? "text-gray-300" : "text-gray-700"}`}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
          disabled={isDisabled}
          className={`
          px-3 py-2 ${variant === "search" ? "" : "border "} focus:outline-none focus:ring-2 ${classByAppName}
          resize-y min-h-[80px]
          ${
            error
              ? "border-red-500"
              : isDisabled
                ? "border-gray-200 cursor-not-allowed text-gray-400"
                : "border-gray-300"
          }`}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          placeholder={placeholder}
          rows={rows}
          cols={cols}
          aria-invalid={!!error}
          aria-label={label}
          {...rest}
        />
        {error && <span className="text-sm text-red-500">{error}</span>}
        {helperText && !error && (
          <span
            className={`text-sm ${isDisabled ? "text-gray-200" : "text-gray-500"}`}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
