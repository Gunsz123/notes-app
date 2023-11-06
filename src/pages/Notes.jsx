import { BsSearch } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";

import NoteItem from "../components/NoteItem";

const Notes = ({ notes }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [text, setText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const handleSearch = () => {
    setFilteredNotes(
      notes.filter((note) => {
        if (note.title.toLowerCase().match(text.toLocaleLowerCase())) {
          return note;
        }
      })
    );
  };

  useEffect(handleSearch, [text]);

  return (
    <section>
      <header className="notes__header">
        {!showSearch && <h2>My Notes</h2>}
        {showSearch && (
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              handleSearch();
            }}
            autoFocus
            placeholder="Search..."
            className="searchBar"
          />
        )}
        <button className="btn" onClick={() => setShowSearch((prevState) => !prevState)}>
          {showSearch ? <MdClose /> : <BsSearch />}
        </button>
      </header>
      <div className="notes__container">
        {filteredNotes.length == 0 && <p className="empty__notes">No notes found.</p>}
        {filteredNotes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>
      <Link to="/create-note" className="btn add__btn">
        <BsPlusLg />
      </Link>
    </section>
  );
};

export default Notes;