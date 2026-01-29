import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ChatSidebar from "../components/ChatSidebar";

const SUBJECTS = ["General", "Java", "DSA", "Backend", "Exam"];

// 10 SOFT SUBTLE COLORS (REPEAT AFTER)
const NOTE_COLORS = [
  "bg-blue-50",
  "bg-green-50",
  "bg-purple-50",
  "bg-amber-50",
  "bg-pink-50",
  "bg-indigo-50",
  "bg-teal-50",
  "bg-rose-50",
  "bg-cyan-50",
  "bg-lime-50",
];

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [value, setValue] = useState("");
  const [subject, setSubject] = useState("General");
  const [search, setSearch] = useState("");
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
        subject,
        pinned: false,
        colorIndex: notes.length % NOTE_COLORS.length,
        createdAt: new Date().toLocaleString(),
      },
      ...notes,
    ]);

    setValue("");
    setSubject("General");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
    if (activeNote?.id === id) setActiveNote(null);
  };

  const togglePin = (id) => {
    setNotes(
      notes.map((n) =>
        n.id === id ? { ...n, pinned: !n.pinned } : n
      )
    );
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

  const filtered = notes.filter((n) =>
    n.content.replace(/<[^>]+>/g, "").toLowerCase()
      .includes(search.toLowerCase())
  );

  const pinnedNotes = filtered.filter((n) => n.pinned);
  const normalNotes = filtered.filter((n) => !n.pinned);

  return (
    <div className="min-h-screen flex bg-[#f6f7fb]">
      <ChatSidebar />

      {/* MAIN GRID */}
      <div className="flex-1 grid grid-cols-[500px_48px_1fr] gap-0 px-12 py-10">

        
        {/* EDITOR */}
        <div className="sticky top-10 self-start">
          <h1 className="text-3xl font-extrabold mb-1">Notes</h1>
          <p className="text-slate-500 mb-6">
            Write freely. Revisit anytime.
          </p>

          <div className="rounded-3xl p-4 shadow-sm
                          bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mb-3 px-3 py-2 border rounded-lg text-sm bg-white"
            >
              {SUBJECTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              className="notes-editor"
              placeholder="Start writing your notes…"
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["clean"],
                ],
              }}
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

        {/* SPACER */}
        <div />

        {/* SAVED NOTES */}
        <div className="h-[calc(100vh-80px)] overflow-y-auto pr-6">
          <input
            placeholder="Search your notes…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-6 px-6 py-3 rounded-2xl
                       bg-white shadow-sm border border-slate-200
                       focus:outline-none focus:ring-2 focus:ring-indigo-300
                       text-sm"
          />

          {/* EMPTY STATE */}
          {filtered.length === 0 && (
            <div className="text-center mt-20 text-slate-400">
              <div className="text-5xl mb-4">📝</div>
              <p className="font-semibold">No notes yet</p>
              <p className="text-sm mt-1">
                Start writing to build your second brain.
              </p>
            </div>
          )}

          {/* PINNED */}
          {pinnedNotes.length > 0 && (
            <>
              <p className="text-xs font-semibold text-slate-400 mb-3">
                PINNED
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {pinnedNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    openNote={openNote}
                    deleteNote={deleteNote}
                    togglePin={togglePin}
                  />
                ))}
              </div>
            </>
          )}

          {/* NORMAL NOTES */}
          <div className="grid grid-cols-2 gap-6">
            {normalNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                openNote={openNote}
                deleteNote={deleteNote}
                togglePin={togglePin}
              />
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {activeNote && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-[90%] max-w-3xl">
            <ReactQuill
              theme="snow"
              value={editValue}
              onChange={setEditValue}
              className="notes-editor"
            />

            <div className="flex justify-end mt-5 gap-3">
              <button onClick={() => setActiveNote(null)}>Cancel</button>
              <button
                onClick={saveEdit}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

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

/* ---------- NOTE CARD ---------- */
function NoteCard({ note, openNote, deleteNote, togglePin }) {
  return (
    <div
      onClick={() => openNote(note)}
      className={`relative rounded-3xl p-6 h-40 cursor-pointer
        ${NOTE_COLORS[note.colorIndex]}
        border border-slate-200
        hover:shadow-md transition`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          togglePin(note.id);
        }}
        className="absolute top-3 left-3 text-sm"
      >
        {note.pinned ? "📌" : "📍"}
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteNote(note.id);
        }}
        className="absolute top-3 right-3 text-slate-400 hover:text-red-500"
      >
        ✕
      </button>

      <div className="flex flex-col h-full">
        <div
          className="text-sm text-slate-700 leading-6
                     break-words line-clamp-3 flex-1"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />

        <div className="flex justify-between items-center text-xs text-slate-500 mt-4">
          <span className="px-2 py-0.5 rounded-full bg-white/70">
            {note.subject}
          </span>
          <span>{note.createdAt}</span>
        </div>
      </div>
    </div>
  );
}
