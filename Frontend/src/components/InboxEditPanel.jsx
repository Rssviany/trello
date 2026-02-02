import React, { useEffect, useRef, useState } from 'react'
import cross from '../assets/icons/cross.png'
import descriptionIcon from '../assets/icons/description.png'

export default function InboxEditPanel({ card, onClose }) {

  const [description, setDescription] = useState(card.description || '')
  const [tempDesc, setTempDesc] = useState(card.description || '')
  const [isDescEditing, setIsDescEditing] = useState(false)
  const descRef = useRef(null)


  useEffect(() => {
    if (descRef.current) {
      descRef.current.style.height = 'auto'
      descRef.current.style.height = descRef.current.scrollHeight + 'px'
    }
  }, [tempDesc])

  const saveDescription = () => {
    setDescription(tempDesc)
    setIsDescEditing(false)
  }

  const cancelDescription = () => {
    setTempDesc(description)
    setIsDescEditing(false)
  }


  const [comments, setComments] = useState(card.comments || [])
  const [text, setText] = useState('')
  const [editingId, setEditingId] = useState(null)

  const saveComment = () => {
    if (!text.trim()) return

    if (editingId) {
      setComments(comments.map(c =>
        c.id === editingId ? { ...c, text } : c
      ))
      setEditingId(null)
    } else {
      setComments([
        {
          id: Date.now(),
          author: 'Vinay Kumar',
          text,
          time: 'just now',
        },
        ...comments,
      ])
    }
    setText('')
  }

  const deleteComment = (id) => {
    setComments(comments.filter(c => c.id !== id))
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white w-225 rounded-xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="font-semibold">{card.title}</h2>
          <img
            src={cross}
            onClick={onClose}
            className="size-5 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-2 min-h-105">

          {/* LEFT */}
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-x-2">
              <img src={descriptionIcon} className="size-4" />
              <p className="font-semibold">Description</p>
            </div>

            <textarea
              ref={descRef}
              value={tempDesc}
              onChange={(e) => setTempDesc(e.target.value)}
              onFocus={() => setIsDescEditing(true)}
              className="w-full resize-none border rounded-lg p-2 border-gray-300"
              placeholder="Add a more detailed description..."
            />

            {isDescEditing && (
              <div className="flex gap-x-2">
                <button
                  onClick={saveDescription}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={cancelDescription}
                  className="px-3 py-1 hover:bg-gray-200 rounded"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="border-l bg-gray-100 flex flex-col">

            {/* COMMENT INPUT */}
            <div className="p-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a comment..."
                className="w-full h-20 border rounded-lg p-2 resize-none bg-white"
              />
              <button
                onClick={saveComment}
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
              >
                {editingId ? 'Update' : 'Send'}
              </button>
            </div>

            <div
              className={`px-4 space-y-4 ${
                comments.length > 2 ? 'overflow-y-auto max-h-60' : ''
              }`}
            >
              {comments.map(c => (
                <div key={c.id} className="flex gap-x-3">
                  <div className="size-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                    VK
                  </div>

                  <div className="flex-1">
                    <div className="flex gap-x-2 items-center">
                      <p className="font-semibold text-sm">{c.author}</p>
                      <span className="text-xs text-gray-400">{c.time}</span>
                    </div>

                    <div className="bg-white border rounded-lg px-3 py-2 text-sm mt-1">
                      {c.text}
                    </div>

                    <div className="text-xs text-gray-500 mt-1 flex gap-x-3">
                      <button
                        onClick={() => {
                          setEditingId(c.id)
                          setText(c.text)
                        }}
                        className="hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteComment(c.id)}
                        className="hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {comments.length === 0 && (
                <p className="text-sm text-gray-400">No comments yet</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}






