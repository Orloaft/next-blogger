import Bold from "@tiptap/extension-bold";
// Option 2: Browser-only (lightweight)
// import { generateHTML } from '@tiptap/core'
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import ListItem from "@tiptap/extension-list-item";
import { generateHTML } from "@tiptap/html";
import { JSONContent } from "@tiptap/react";
import React, { useMemo } from "react";
import { CodeMark } from "../PostEditor/PostEditor";
import OrderedList from "@tiptap/extension-ordered-list";
export default function Output({ json }: { json: JSONContent }) {
  const output = useMemo(() => {
    return generateHTML(json, [
      Document,
      Paragraph,
      Text,
      Bold,
      CodeMark,
      ListItem,
      OrderedList,
    ]);
  }, [json]);

  return <div className="post" dangerouslySetInnerHTML={{ __html: output }} />;
}
