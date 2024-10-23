"use client"

import TipTapEditor from "./TipTapEditor"
import { useState } from "react"

export default function PostForm({savePost}) {

  const [content, setContent] = useState("");

  function handleTipTapChange(html) {
    setContent(html);
  }

  function handleSubmit(formData) {
    formData.append('content', content);
    savePost(formData);
  }

  return (
    <form action={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Post title..."
        className="text-black px-3 py-2 rounded"
      />
      <TipTapEditor onContentChange={handleTipTapChange} placeholder={"Post content..."} />
      {/* <textarea
        name="content"
        className="text-black px-3 py-2 rounded"
        placeholder="Post content"
      /> */}
      <button className="bg-green-400 px-4 py-2 text-xl text-black rounded">
        Submit post
      </button>
    </form>
  )
}