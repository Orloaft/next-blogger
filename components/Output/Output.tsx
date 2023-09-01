import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import React, { useEffect, useMemo } from "react";

import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { CodeMark } from "../PostEditor/PostEditor";
export default function Output({ json }: { json: JSONContent }) {
  const editor = useEditor({
    extensions: [
      CodeMark,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] } as any),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    content: json,
    editable: false, // Set to read-only
  });

  return <EditorContent editor={editor} />;
}
