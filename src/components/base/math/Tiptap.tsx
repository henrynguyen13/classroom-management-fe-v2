import { useEditor, EditorContent, Editor } from "@tiptap/react";
import Image from "@tiptap/extension-image";
import { Controller } from "@/plugins/hook-form";
import Placeholder from "@tiptap/extension-placeholder";
import { Mathematics } from "@tiptap-pro/extension-mathematics";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { EditorMenu } from "./EditorMenu";
import styles from "./input.module.css";
import "katex/dist/katex.min.css";
import { useEffect, useState } from "react";

interface Props {
  control: any;
  name: string;
  label?: string;
  variant?: "filled" | "outlined" | "standard";
  placeholder?: string;
  isRequired?: boolean;
  readonly?: boolean;
  value?: string;
  disabled?: boolean;
  width?: string;
  onChange?: (e: any) => void;
}
export const Tiptap = ({
  name,
  control,
  label,
  value,
  placeholder,
  onChange,
}: Props) => {
  const [editorContent, setEditorContent] = useState("");
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: styles.ProseMirror,
      },
    },
    extensions: [
      StarterKit,
      // StarterKit.configure({
      //   bulletList: {
      //     HTMLAttributes: {
      //       class: "bullet_class",
      //     },
      //   },
      //   orderedList: {
      //     HTMLAttributes: {
      //       class: "order_class",
      //     },
      //   },
      //   heading: {
      //     HTMLAttributes: {
      //       class: "headers_class",
      //     },
      //   },
      // }),
      // BulletList,
      Underline,
      // CodeBlock,
      Image.configure({
        inline: true,
      }),
      Placeholder.configure({
        placeholder: placeholder,
      }),
      Mathematics,
      //   CharacterCount.configure({
      //     limit: props.wordCount || 1000,
      //   }),
      TextStyle,
      FontFamily,
    ],
    // onUpdate({ editor }) {
    //   setEditorContent(JSON.stringify(editor.getJSON()));
    // },

    autofocus: true,
    content: editorContent,
  });
  useEffect(() => {
    editor?.on("update", ({ editor }) => {
      const newContent = JSON.stringify(editor.getJSON());
      setEditorContent(newContent);

      if (onChange) {
        onChange(newContent);
      }
    });

    return () => {
      editor?.off("update");
    };
  }, [editor, onChange]);

  useEffect(() => {
    editor?.commands.setContent(JSON?.parse(value!));
  }, [value]);
  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue={value || ""}
        render={() => {
          return (
            <>
              <div className="mb-[10px]">
                <label>
                  <span className="text-base font-medium">{label}</span>
                  <span className="text-red">*</span>
                </label>
              </div>
              <EditorMenu editor={editor as Editor} />
              <EditorContent className={styles.custom_scroll} editor={editor} />
              {/* {error ? (
                <span className="text-error text-xs">{error.message}</span>
              ) : null} */}
            </>
          );
        }}
      />
    </>
  );
};
