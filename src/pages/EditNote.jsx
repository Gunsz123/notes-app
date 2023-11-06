import { Link, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState, useEffect } from "react"; // Import useEffect
import useCreateDate from "./../components/useCreateDate"; // Import the useCreateDate function

const EditNote = ({ notes, setNotes }) => {
  const { id } = useParams();
  const [note, setNote] = useState(null); // Initialize note as null
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const date = useCreateDate();
  const navigate = useNavigate();

  // Use useEffect to update the note when the ID changes
  useEffect(() => {
    const foundNote = notes.find((item) => item.id == id);
    if (foundNote) {
      setNote(foundNote);
      setTitle(foundNote.title);
      setDetails(foundNote.details);
    } else {
      // Handle the case where the note is not found
      navigate("/"); // You can redirect to another page or display an error message
    }
  }, [id, notes, navigate]);

  const handleForm = (e) => {
    e.preventDefault();

    if (title && details) {
      const newNote = { ...note, title, details, date };
      const newNotes = notes.map((item) => {
        if (item.id == id) {
          item = newNote;
        }
        return item;
      });

      setNotes(newNotes);
    }

    navigate("/");
  };

  const deleteNote = () => {
    if (window.confirm("Are you sure you want to delete?")) {
      const newNotes = notes.filter((item) => item.id !== id);

      setNotes(newNotes);
      navigate("/");
    }
  };

  // Render the component contents
  if (!note) {
    return null; // You can return null or an error message
  }

  return (
    <section>
      <header className="create-note__header">
        <Link to="/" className="btn">
          <IoIosArrowBack />
          <button className="btn lg primary" onClick={handleForm}>
            Save
          </button>
          <button className="btn danger" onClick={deleteNote}>
            <RiDeleteBin6Line />
          </button>
        </Link>
      </header>
      <form className="create-note__form" onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <textarea
          rows="28"
          placeholder="Notes details..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}></textarea>
      </form>
    </section>
  );
};

export default EditNote;
