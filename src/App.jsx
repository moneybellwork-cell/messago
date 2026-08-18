import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import React, { useState } from "react";

function TextInput() {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const names = ["John", "Sarah", "Michael", "David", "Emma"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !text.trim()) {
      setMessage("Please select a name and enter some text.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://telebot-2eup.onrender.com/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          text,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setMessage("Sent successfully!");
      setText("");
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "20px" }}>
      <h2>Send Text</h2>

      <form onSubmit={handleSubmit}>
        <label>Name</label>

        <select
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            margin: "8px 0 20px",
          }}
        >
          <option value="">Select a name</option>

          {names.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <label>Message</label>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          rows={15}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "12px",
            padding: "10px 20px",
          }}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
function App() {
  const [count, setCount] = useState(0)

  return (
<TextInput/>    
  )
}

export default App
