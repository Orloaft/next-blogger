import Bold from "@tiptap/extension-bold";
// Option 2: Browser-only (lightweight)
// import { generateHTML } from '@tiptap/core'
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
// Option 1: Browser + server-side
import { generateHTML } from "@tiptap/html";
import { JSONContent } from "@tiptap/react";
import React, { useMemo } from "react";
import { CodeMark } from "../PostEditor/PostEditor";

export default function Output({ json }: { json: JSONContent }) {
  const output = useMemo(() => {
    return generateHTML(json, [Document, Paragraph, Text, Bold, CodeMark]);
  }, [json]);

  return <div dangerouslySetInnerHTML={{ __html: output }} />;
}
