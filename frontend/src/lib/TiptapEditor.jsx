import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

const TiptapEditor = ({ content, setContent }) => {
  const editor = useEditor({
    extensions: [
      StarterKit(),
      Placeholder.configure({
        placeholder: "Write something here...",
      }),
    ],
    content: content || "", // Ensure default empty content
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML()); // Save HTML content
    },
  });

  if (!editor) {
    return <p className="text-gray-500">Loading editor...</p>;
  }

  return (
    <div className="border border-gray-300 rounded-md p-3 bg-white">
      <EditorContent editor={editor} className="h-72 min-h-[200px] focus:outline-none" />
    </div>
  );
};

export default TiptapEditor;
