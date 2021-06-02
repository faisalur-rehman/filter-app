import React, { useState, useContext } from "react";
import { StudentContext } from "../../App";
import "./StudentDetail.css";
import MinimizeIcon from "@material-ui/icons/Minimize";
import AddIcon from "@material-ui/icons/Add";

const StudentDetails = () => {
  const [students, setStudents] = useContext(StudentContext);
  const [tag, setTag] = useState("");
  const [byTag, setByTag] = useState("");
  const [byName, setByName] = useState("");
  const [position, setPosition] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [show, setShow] = useState(true);
  const [namePosition, setNamePosition] = useState([]);

  // console.log(students);
  function handleChange({ target }) {
    setTag(target.value);
  }

  function handleTagSearch({ target }) {
    setNotFound(false);
    setByTag(target.value);
    setPosition([]);
    setNamePosition([]);
  }
  function handleNameSearch({ target }) {
    setNotFound(false);
    setByName(target.value);
    setNamePosition([]);
    setPosition([]);
  }

  function handleSubmit(e, i) {
    e.preventDefault();
    students[i].tags.push(tag);
    setStudents([...students]);
    setTag("");
  }

  // search by tag

  function handleSearchForm(e) {
    e.preventDefault();
    let found;
    for (let i = 0; i < students.length; i++) {
      found = students[i].tags.filter((tag) => tag === byTag);
      if (found.length > 0) {
        setPosition((prev) => [...prev, i]);
      }
    }
    if (position.length <= 0) {
      setNotFound(true);
    }
    setByTag("");
  }

  function handleSubmitName(e) {
    e.preventDefault();
    for (let i = 0; i < students.length; i++) {
      let name = (
        students[i].firstName +
        " " +
        students[i].lastName
      ).toLocaleLowerCase();
      if (name.includes(byName.toLocaleLowerCase())) {
        console.log("found it");
        setNamePosition((prev) => [...prev, i]);
      }
      setByName("");
    }
    if (position.length <= 0) {
      setNotFound(true);
    }
  }

  // console.log("position", position);
  let icon = show ? "" : "hide";
  return (
    <div className="all-cards">
      <form className="search-form" onSubmit={handleSearchForm}>
        <input
          type="text"
          value={byTag}
          onChange={handleTagSearch}
          placeholder="Search by Tag"
        />
      </form>
      <form className="search-form" onSubmit={handleSubmitName}>
        <input
          type="text"
          value={byName}
          onChange={handleNameSearch}
          placeholder="Search by Name"
        />
      </form>
      {students.map((student, index) => (
        <>
          {((position.length > 0 && position.includes(index)) ||
            (namePosition.length > 0 && namePosition.includes(index))) && (
            <div className={`card ${icon}`}>
              <div style={{ display: "flex" }}>
                <img src={student.pic} alt="" />
                <div>
                  <h1>
                    {student.firstName} {student.lastName}
                  </h1>
                  <p>{student.email}</p>
                  <p>{student.skill}</p>
                  {student.grades.map((marks, i) => (
                    <p>
                      Test {i} <span>{marks}%</span>
                    </p>
                  ))}
                  {student.tags.length > 0 &&
                    student.tags.map((tag) => (
                      <button className="tags">{tag}</button>
                    ))}
                  <form
                    className="tag-form"
                    onSubmit={(e) => handleSubmit(e, index)}
                  >
                    <input
                      type="text"
                      value={tag}
                      onChange={handleChange}
                      placeholder="Add a tag"
                    />
                  </form>
                </div>
              </div>
              {show ? (
                <MinimizeIcon className="icon" onClick={() => setShow(!show)} />
              ) : (
                <AddIcon className="icon" onClick={() => setShow(!show)} />
              )}
            </div>
          )}
          {position.length <= 0 && !notFound && (
            <div className={`card ${icon}`}>
              <div style={{ display: "flex" }}>
                <img src={student.pic} alt="" />
                <div>
                  <h1>
                    {student.firstName} {student.lastName}
                  </h1>
                  <p>{student.email}</p>
                  <p>{student.skill}</p>
                  {student.grades.map((marks, i) => (
                    <p>
                      Test {i} <span>{marks}%</span>
                    </p>
                  ))}
                  {student.tags.length > 0 &&
                    student.tags.map((tag) => (
                      <button className="tags">{tag}</button>
                    ))}
                  <form
                    className="tag-form"
                    onSubmit={(e) => handleSubmit(e, index)}
                  >
                    <input
                      type="text"
                      value={tag}
                      onChange={handleChange}
                      placeholder="Add a tag"
                    />
                  </form>
                </div>
              </div>

              {show ? (
                <MinimizeIcon className="icon" onClick={() => setShow(!show)} />
              ) : (
                <AddIcon className="icon" onClick={() => setShow(!show)} />
              )}
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default StudentDetails;
