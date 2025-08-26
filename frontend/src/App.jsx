import { useState } from 'react';

function App() {
  const [title_input, setTitle_input] = useState("");
  const [due_date_input, setDue_date_input] = useState("");
  const [priority_input, setPriority_input] = useState("");
  const [category_input, setCategory_input] = useState("");

  const sendData = async () => {
    const taskData = {
      title: title_input,
      is_completed: false,
      due_date: due_date_input || null,
      priority: parseInt(priority_input) || 1,
      category: category_input || "General",
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Task created:", result);
      } else {
        console.error("Error creating task:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div>
      <h1>Task Creator</h1>
      <input
        type="text"
        placeholder="Title"
        value={title_input}
        onChange={(e) => setTitle_input(e.target.value)}
      />
      <input
        type="date"
        value={due_date_input}
        onChange={(e) => setDue_date_input(e.target.value)}
      />
      <input
        type="number"
        placeholder="Priority"
        value={priority_input}
        onChange={(e) => setPriority_input(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category_input}
        onChange={(e) => setCategory_input(e.target.value)}
      />
      <button onClick={sendData}>Add Task</button>
    </div>
  );
}

export default App;
