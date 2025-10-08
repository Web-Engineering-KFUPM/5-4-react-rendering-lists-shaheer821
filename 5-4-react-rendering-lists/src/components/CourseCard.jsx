import { useState } from "react";
import TaskItem from "./TaskItem";


export default function CourseCard({ course, index, onMutateCourse }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");


  // 📘 TASK 4 — PART A (Anchor): Implement toggle using onMutateCourse + .map()
  function toggleTask(id) {
    // Toggle the task with this id
    onMutateCourse(index, tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  }


  // 📘 TASK 4 — PART A (Anchor): Implement delete using onMutateCourse + .filter()
  function deleteTask(id) {
    // Delete the task with this id
    onMutateCourse(index, tasks =>
      tasks.filter(task => task.id !== id)
    );
  }


  // 📘 TASK 4 — PART A (Anchor): Implement add using onMutateCourse
  function addTask(e) {
    e.preventDefault();
    if (!title.trim() || !date) return;
    const newTask = {
      id: Date.now() + Math.random(),
      title,
      dueDate: date,
      isDone: false
    };
    onMutateCourse(index, tasks => [...tasks, newTask]);
    setTitle("");
    setDate("");
  }


  return (
    <article className="course card">
      <header className="cardHeader">
        <h2>{course.title}</h2>
        {/* 🟩 PART A (Anchor): Show "All caught up" badge when ALL tasks are done (logical &&) */}
        {course.tasks.length > 0 && course.tasks.every(t => t.isDone) && (
          <span className="badge success">All caught up!</span>
        )}
      </header>


      {/* 🟩 PART A (Anchor): If NO tasks → show message; ELSE → render the list (ternary ?: ) */}
      <section className="tasksSection">
        {/* � PART A (Anchor): If NO tasks → show message; ELSE → render the list (ternary ?: ) */}
        {course.tasks.length === 0
          ? <div className="noTasks">No tasks yet. Add your first one below.</div>
          : (
            <ul className="tasks">
              {course.tasks.map(task => (
                <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
              ))}
            </ul>
          )}
      </section>


      {/* Add Form (provided) */}
      <form onSubmit={addTask} className="newTask">
        <input
          className="titleField"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          aria-label="Task title"
        />
        <div className="dateRow">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-label="Due date"
          />
          <button type="submit" className="primary">Add</button>
        </div>
      </form>
    </article>
  );
}