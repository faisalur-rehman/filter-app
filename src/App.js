import "./App.css";
import React, { useState, createContext } from "react";
import StudentDetails from "./components/StudentDetails/StudentDetails";

const students = [
  {
    city: "Faisal Rehman",
    company: "Yadel",
    email: "iorton0@imdb.com",
    firstName: "Faisal",
    grades: ["78", "100", "92", "86", "89", "88", "91", "87"],
    id: "1",
    lastName: "Rehman",
    pic: "https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/frontend/images/voluptasdictablanditiis.jpg",
    skill: "Oracle",
    tags: [],
  },
  {
    city: "Crypto Ahmed",
    company: "Avamm",
    email: "cboards1@weibo.com",
    firstName: "Clarke",
    grades: ["75", "89", "95", "93", "99", "82", "89", "76"],
    id: "2",
    lastName: "Boards",
    pic: "https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/frontend/images/voluptasautreprehenderit.jpg",
    skill: "Sports",
    tags: [],
  },
];

export const StudentContext = createContext();

function App() {
  const [studentData, setStudentData] = useState(students);
  return (
    <div className="App">
      <StudentContext.Provider value={[studentData, setStudentData]}>
        <StudentDetails />
      </StudentContext.Provider>
    </div>
  );
}

export default App;
