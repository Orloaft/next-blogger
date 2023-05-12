import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from "./PostEditor.module.css";
const PostEditor: React.FC = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <div className={styles.editorContainer}>
      <div className={styles.toolbar}>
        {editor && (
          <>
            <button
              className={
                editor.isActive("bold") ? styles.activeButton : styles.button
              }
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              Bold
            </button>
            <button
              className={
                editor.isActive("italic") ? styles.activeButton : styles.button
              }
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              Italic
            </button>
            <button
              className={
                editor.isActive("underline")
                  ? styles.activeButton
                  : styles.button
              }
            >
              Underline
            </button>
            <button
              className={
                editor.isActive("strike") ? styles.activeButton : styles.button
              }
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              Strike
            </button>
            <button
              className={
                editor.isActive("link") ? styles.activeButton : styles.button
              }
            >
              Link
            </button>
            <button
              className={
                editor.isActive("image") ? styles.activeButton : styles.button
              }
            >
              Image
            </button>
          </>
        )}
      </div>
      <div className={styles.editor}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default PostEditor;
