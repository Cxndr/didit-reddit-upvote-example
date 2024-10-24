'use client'

import { FloatingMenu, BubbleMenu, useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import BlockQuote from '@tiptap/extension-blockquote'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import Code from '@tiptap/extension-code'
import { useEffect } from 'react'


export default function TipTapEditor({content="", placeholder="", onContentChange}) {
  const editor = useEditor({
    content: `${content}`,
    injectCSS: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onContentChange(html); 
    },
    extensions: [
      Document, 
      Paragraph, 
      Text, 
      Heading.configure({ levels: [1,2,3], }),
      Bold,
      Italic,
      BlockQuote,
      Strike,
      BulletList,
      ListItem,
      Code,
      CharacterCount.configure({ limit: 1000 }),
      BubbleMenu,
      Placeholder.configure({
        placeholder: `${placeholder}`,
      }),
    ],
    editorProps: {
      attributes: {
        class: 'bg-white py-2 px-3 rounded',
      },
    }
  })

  useEffect(() => {
    return () => {
      editor?.destroy(); // Clean up on unmount
    };
  }, [editor]);

  return (
    <>
      <div className="control-group">
      </div>

      {editor && <FloatingMenu editor={editor} tippyOptions={{ duration: 100, offset:[0,200] }}>
        <div className="floating-menu">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            Bullet list
          </button>
        </div>
        </FloatingMenu>
      }

      {editor && 
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bubble-menu">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active' : ''}
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active' : ''}
            >
              Italic
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'is-active' : ''}
            >
              Strike
            </button>
          </div>
        </BubbleMenu>
      }
      <EditorContent editor={editor} />
    </>
  )
}