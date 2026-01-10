"use client";

import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import { memo, useEffect } from "react";

interface TipTapEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  touched?: boolean;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({
  value,
  onChange,
  error,
  touched,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: "mb-4",
          },
        },

        heading: {
          levels: [1, 2, 3, 4],
          HTMLAttributes: {
            class: "text-3xl font-bold mb-4",
          },
        },

        bold: {
          HTMLAttributes: {
            class: "font-semibold",
          },
        },

        italic: {
          HTMLAttributes: {
            class: "italic-text",
          },
        },

        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-6 space-y-2",
          },
        },

        listItem: {
          HTMLAttributes: {
            class: "ml-2",
          },
        },
      }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] rounded-lg border p-3 focus:outline-none prose max-w-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  // Sync Formik value → TipTap
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => editor?.chain().focus().setParagraph().run()}
          className="rounded bg-gray-200 px-2 py-1 text-sm"
        >
          P
        </button>
        {/* Headings */}
        {([1, 2, 3] as const).map((level) => (
          <button
            key={level}
            type="button"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level }).run()
            }
            className={`rounded px-2 py-1 text-sm ${
              editor?.isActive("heading", { level })
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            H{level}
          </button>
        ))}
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="rounded bg-gray-200 px-2 py-1 text-sm"
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className="rounded bg-gray-200 px-2 py-1 text-sm"
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className="rounded bg-gray-200 px-2 py-1 text-sm"
        >
          Bullet
        </button>
        <button
          type="button"
          onClick={() => {
            const isActive =
              editor?.getAttributes("paragraph")?.class === "mb-4";

            editor
              ?.chain()
              .focus()
              .updateAttributes("paragraph", {
                class: isActive ? "" : "mb-4",
              })
              .run();
            console.log("editors.....", editor, editor?.chain().focus());
          }}
          className="rounded bg-gray-200 px-2 py-1 text-sm"
        >
          mb-4
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Error */}
      {touched && error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default memo(TipTapEditor);
