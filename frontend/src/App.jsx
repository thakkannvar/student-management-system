
import { useEffect, useState } from "react";
import "./App.css";

const API = "http://127.0.0.1:8000/api/students/";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  async function loadStudents() {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Unable to load students:", error);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function addStudent(event) {
    event.preventDefault();

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, course }),
      });

      if (response.ok) {
        setName("");
        setEmail("");
        setCourse("");
        loadStudents();
      } else {
        alert("Unable to add student. Check the email.");
      }
    } catch {
      alert("Django is not running or cannot be reached.");
    }
  }

  async function deleteStudent(id) {
    const response = await fetch(`${API}${id}/`, {
      method: "DELETE",
    });

    if (response.ok) {
      loadStudents();
    }
  }

  return (
    <main className="container">
      <h1>Student Management System</h1>
      <p>Manage your student records easily.</p>

      <form onSubmit={addStudent}>
        <input
          placeholder="Student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          placeholder="Course name"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />

        <button type="submit">Add Student</button>
      </form>

      <h2>Student List</h2>

      {students.length === 0 && <p>No students found.</p>}

      {students.map((student) => (
        <div className="student" key={student.id}>
          <div>
            <strong>{student.name}</strong>
            <p>{student.email}</p>
            <p>{student.course}</p>
          </div>

          <button
            type="button"
            className="delete"
            onClick={() => deleteStudent(student.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </main>
  );
}

export default App;
