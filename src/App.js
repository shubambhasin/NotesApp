import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";

const InputNote = styled.div`
  width: 80%;

  margin: 0 auto;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: ${({ noteBg }) => noteBg};
  box-shadow: 0px 0px 10px 5px rgb(250, 250, 250);
`;

const Grid3 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  margin: 1rem;
`;

const animateNote = keyframes`
  0% {
transform: scale(0.3);
opacity: 0.4;
}
  100% {

  transform: scale(1);
  opacity: 1;
}
  `;
const Note = styled.div`
  box-shadow: 0px 0px 10px 5px #f0f0f0;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.3rem;
  animation-name: ${animateNote};
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  background-color: ${({ bg }) => bg};
  word-wrap: break-word;
  position: relative;
`;

// () => {
//   const notes = localStorage.getItem('notes')
//   if(notes){
//     return JSON.parse(notes);
//   }else {
//     localStorage.setItem('notes',[]);
//     return JSON.parse(localStorage.getItem("notes"));

//   }
//  }
export default function App() {
  const [note, setNote] = useState([]);

  const [currentNote, setCurrentNote] = useState("");
  const [currentContent, setCurrentContent] = useState("");
  const [noteBg, setNoteBg] = useState("white");
  const [label, setLabel] = useState("Personal");

  useEffect(() => {
    if (localStorage.getItem("notes")) {
      setNote(JSON.parse(localStorage.getItem("notes")));
    } else {
      setNote([]);
    }
  }, []);

  useEffect(() => {}, [note]);

  const handleInput = (e) => {
    setCurrentNote(e.target.value);
  };

  const handleContent = (e) => {
    setCurrentContent(e.target.value);
  };

  const addTodo = (e) => {
    e.preventDefault();

    if (currentNote === "") {
      alert("Cant save empty note");
      return;
    } else {
      let note2 = [
        ...note,
        {
          id: uuidv4(),
          title: currentNote,
          content: currentContent,
          bg: noteBg,
          label: label
        }
      ];
console.log(note2)
setNote([...note2])
localStorage.setItem("notes", JSON.stringify([...note2]))
setCurrentNote("");
  setCurrentContent("");
    }
  };

  //   setNote([
  //     ...note,
  //     {
  //       id: uuidv4(),
  //       title: currentNote,
  //       content: currentContent,
  //       bg: noteBg,
  //       label: label
  //     }
  //   ]);

  //   localStorage.setItem("notes", JSON.stringify([...note]));
  //   console.log(note);
  //   setCurrentNote("");
  //   setCurrentContent("");
  // };

  return (
    <div className="App">
      <InputNote noteBg={noteBg} className="b5px note">
        <form onSubmit={addTodo}>
          <input
            placeholder="Title"
            onChange={handleInput}
            value={currentNote}
          />
          <br />
          <textarea
            value={currentContent}
            placeholder="Enter note"
            onChange={handleContent}
          ></textarea>
          <small>Label: {label}</small>
          <div className="note-properties">
            <span className="red" onClick={() => setNoteBg("#f35e5e")}></span>
            <span className="blue" onClick={() => setNoteBg("#00aeff")}></span>
            <span className="green" onClick={() => setNoteBg("#00ff00")}></span>
            <span
              className="orange"
              onClick={() => setNoteBg("#ffa702")}
            ></span>
            <span
              className="yellow"
              onClick={() => setNoteBg("#ffd000")}
            ></span>
            <div className="label">
              <button type="button">Personal</button>{" "}
              <button type="button" onClick={() => setLabel("work")}>
                Work
              </button>{" "}
              <button type="button" onClick={() => setLabel("home")}>
                Home
              </button>{" "}
              <button type="button" onClick={() => setLabel("project")}>
                Project
              </button>
            </div>
            <button
              style={{ width: "max-content", marginLeft: "auto" }}
              onSubmit={addTodo}
            >
              Add
            </button>
          </div>
        </form>
      </InputNote>

      <Grid3>
        {note.map(({ id, title, content, bg, label }) => {
          return (
            <Note key={id} bg={bg} className="note-in-display">
              <small className="note-label">{label}</small>
              <h3>{title}</h3>
              <p>{content}</p>
              <button>Edit</button>
            </Note>
          );
        })}
      </Grid3>
    </div>
  );
}
