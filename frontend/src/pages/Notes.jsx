import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ChatSidebar from "../components/ChatSidebar";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [value, setValue] = useState("");
  const [activeNote, setActiveNote] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const saveNote = () => {
    if (!value.trim()) return;
    setNotes([
      {
        id: Date.now(),
        content: value,
        createdAt: new Date().toLocaleString(),
      },
      ...notes,
    ]);
    setValue("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
    if (activeNote?.id === id) setActiveNote(null);
  };

  const openNote = (note) => {
    setActiveNote(note);
    setEditValue(note.content);
  };

  const saveEdit = () => {
    setNotes(
      notes.map((n) =>
        n.id === activeNote.id ? { ...n, content: editValue } : n
      )
    );
    setActiveNote(null);
  };

  return (
    <div className="min-h-screen flex bg-[#f6f7fb]">
      <ChatSidebar />

      <div className="flex-1 flex px-12 py-10 gap-10">
        {/* LEFT: EDITOR */}
        <div className="flex-1 max-w-2xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-1">Notes</h1>
          <p className="text-slate-500 mb-6">
            Write freely. Revisit anytime.
          </p>

          <div className="bg-white rounded-3xl p-4 shadow-sm">
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              placeholder="Start writing your notes…"
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["clean"],
                ],
              }}
              className="notes-editor"
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={saveNote}
              className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold"
            >
              Save note
            </button>
          </div>
        </div>

        {/* RIGHT: SAVED NOTES */}
        <div className="w-80 hidden xl:block">
          <h2 className="text-sm font-semibold text-slate-500 mb-4">
            Saved notes
          </h2>

          <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2">
            {notes.map((note) => (
              <div
                key={note.id}
                onClick={() => openNote(note)}
                className="relative bg-white rounded-2xl p-4 shadow-sm cursor-pointer
                           h-32 overflow-hidden"
              >
                {/* Delete */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                  className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
                >
                  ✕
                </button>

                {/* Preview */}
                <div className="flex flex-col h-full">
  {/* Content preview */}
  <div
    className="text-sm text-slate-700 leading-relaxed
               break-words line-clamp-3 flex-1"
    dangerouslySetInnerHTML={{ __html: note.content }}
  />

  {/* Date fixed at bottom */}
  <div className="text-xs text-slate-400 mt-3">
    {note.createdAt}
  </div>
</div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FULL NOTE MODAL */}
      {activeNote && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-[90%] max-w-3xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Edit note</h3>
              <button onClick={() => setActiveNote(null)}>✕</button>
            </div>

            <ReactQuill
              theme="snow"
              value={editValue}
              onChange={setEditValue}
              className="notes-editor"
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["clean"],
                ],
              }}
            />

            <div className="flex justify-end mt-5 gap-3">
              <button
                onClick={() => setActiveNote(null)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STYLES */}
      <style>{`
        .notes-editor .ql-editor {
          min-height: 260px;
          max-height: 260px;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}
