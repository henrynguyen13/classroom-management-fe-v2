import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";
import Underline from "@tiptap/extension-underline";
import { Mathematics } from "@tiptap-pro/extension-mathematics";
import StarterKit from "@tiptap/starter-kit";
import "katex/dist/katex.min.css";
interface Props {
  value?: string;
  onChange?: (e: any) => void;
}
export const OutputTiptap = ({ value, onChange }: Props) => {
  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
      }),
      BulletList,
      Underline,
      CodeBlock,
      Mathematics.configure({
        katexOptions: {
          displayMode: true,
        },
      }),
    ],
    content: value ? JSON.parse(value) : null,
  });

  useEffect(() => {
    editor?.commands.setContent(JSON.parse(value!));
  }, [value]);
  return <EditorContent editor={editor} />;
};
