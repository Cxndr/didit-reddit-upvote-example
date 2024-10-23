'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import BlockQuote from '@tiptap/extension-blockquote'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
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
      CharacterCount.configure({ limit: 1000 }),
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

  return <EditorContent editor={editor} />
}