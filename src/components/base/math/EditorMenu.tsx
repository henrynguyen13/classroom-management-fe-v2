import { useState } from "react";
import type { Editor } from "@tiptap/react";
import {
  MdFormatItalic,
  MdFormatBold,
  MdFormatStrikethrough,
} from "react-icons/md";
import { FaCode, FaUndo, FaRedo } from "react-icons/fa";
import { MdFormatListBulleted, MdFormatUnderlined } from "react-icons/md";
import { IoIosImage } from "react-icons/io";
import { MenuItem } from "./MenuItem";
interface Props {
  editor: Editor;
  upload?: () => Promise<string>;
}

export const EditorMenu = ({ editor, upload }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number>();
  async function addImage() {
    const url = await upload?.();

    if (url) {
      editor
        .chain()
        .focus()
        .setImage({
          src: url,
          alt: "Something else",
          title: "Something",
        })
        .run();
    } else {
      console.warn("No image selected");
    }
  }
  const items = [
    {
      icon: <MdFormatBold />,
      title: "Bold",
      action: () => editor?.chain().focus().toggleBold().run(),
      isActive: () => editor?.isActive("bold", { color: "red" }),
    },
    {
      icon: <MdFormatItalic />,
      title: "Italic",
      action: () => editor?.chain().focus().toggleItalic().run(),
      isActive: () => editor?.isActive("italic", { color: "red" }),
    },
    {
      icon: <MdFormatStrikethrough />,
      title: "Strike",
      action: () => editor?.chain().focus().toggleStrike().run(),
      isActive: () => editor?.isActive("strike", { color: "red" }),
    },
    {
      icon: <MdFormatUnderlined />,
      title: "Underline",
      action: () => editor?.chain().focus().toggleUnderline().run(),
      isActive: () => editor?.isActive("underline", { color: "red" }),
    },
    // {
    //   icon: <FaCode />,
    //   title: "Code",
    //   action: () => editor?.chain().focus().toggleCode().run(),
    //   isActive: () => editor?.isActive("code", { color: "red" }),
    // },

    // {
    //   icon: <LuHeading1 />,
    //   title: "Heading 1",
    //   action: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
    //   isActive: () => editor?.isActive("heading", { level: 1, color: "red" }),
    // },
    // {
    //   icon: 'format-header-2',
    //   title: 'Heading 2',
    //   action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    //   isActive: () => editor?.isActive('heading, { color: 'red' }', { level: 2 })
    // },
    // {
    //   icon: 'format-paragraph',
    //   title: 'Paragraph',
    //   action: () => editor?.chain().focus().setParagraph().run(),
    //   isActive: () => editor?.isActive('paragraph, { color: 'red' }')
    // },
    {
      icon: <MdFormatListBulleted />,
      title: "Bullet List",
      action: () => editor?.chain().focus().toggleBulletList().run(),
      isActive: () => editor?.isActive("bulletList", { color: "red" }),
    },
    // {
    //   icon: 'format-list-numbered',
    //   title: 'Ordered List',
    //   action: () => editor?.chain().focus().toggleOrderedList().run(),
    //   isActive: () => editor?.isActive('orderedList, { color: 'red' }')
    // },
    {
      icon: <FaCode />,
      title: "Code Block",
      action: () => editor?.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor?.isActive("codeBlock", { color: "red" }),
    },

    // {
    //   icon: 'format-quote-open',
    //   title: 'Blockquote',
    //   action: () => editor?.chain().focus().toggleBlockquote().run(),
    //   isActive: () => editor?.isActive('blockquote, { color: 'red' }')
    // },
    // {
    //   icon: 'reorder-horizontal',
    //   title: 'Horizontal Rule',
    //   action: () => editor?.chain().focus().setHorizontalRule().run()
    // },

    // {
    //   icon: 'view-day-outline',
    //   title: 'Hard Break',
    //   action: () => editor?.chain().focus().setHardBreak().run()
    // },
    // {
    //   icon: 'format-clear',
    //   title: 'Clear Format',
    //   action: () => editor?.chain().focus().clearNodes().unsetAllMarks().run()
    // },

    {
      icon: <IoIosImage />,
      title: "Image",
      action: addImage,
    },

    {
      icon: <FaUndo />,
      title: "Undo",
      action: () => editor?.chain().focus().undo().run(),
    },
    {
      icon: <FaRedo />,
      title: "Redo",
      action: () => editor?.chain().focus().redo().run(),
    },
    {
      icon: <FaRedo />,
      title: "Redo",
      action: () => editor.chain().focus().setFontFamily("monospace").run(),
      isActive: () =>
        editor.isActive("textStyle", { fontFamily: "monospace" })
          ? "is-active"
          : "",
    },
  ];

  const handleClick = (index: number) => {
    setActiveIndex(index);
    items[index].action();
  };
  return (
    <>
      {items.map((item, index) => (
        <MenuItem
          key={index}
          action={() => handleClick(index)}
          icon={item.icon}
          title={item.title}
          isActive={activeIndex === index}
        />
      ))}
    </>
  );
};
