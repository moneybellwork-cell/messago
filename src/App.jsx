import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import React, { useState } from "react";

function TransactionForm() {
  const [date, setDate] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [sharing, setSharing] = useState("");
  const [executiveCode, setExecutiveCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const methods = ["UPI", "Bank to Bank", "NEFT", "RTGS"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !date ||
      !clientId.trim() ||
      !clientName.trim() ||
      !amount ||
      !method ||
      !sharing ||
      !executiveCode.trim()
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("https://telebot-pi-sand.vercel.app/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          client_id: clientId,
          client_name: clientName,
          amount,
          method,
          sharing,
          executive_code: executiveCode,
        }),
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      setMessage("Sent successfully!");
      setDate("");
      setClientId("");
      setClientName("");
      setAmount("");
      setMethod("");
      setSharing("");
      setExecutiveCode("");
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const labelStyle = { display: "block", marginTop: "16px", marginBottom: "6px", fontWeight: 600 };
  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "10px",
    boxSizing: "border-box",
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "20px" }}>
      <h2>New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>Client ID</label>
        <input
          type="text"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          placeholder="Enter client ID"
          style={inputStyle}
        />

        <label style={labelStyle}>Client Name</label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Enter client name"
          style={inputStyle}
        />

        <label style={labelStyle}>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          style={inputStyle}
        />

        <label style={labelStyle}>Method</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select method</option>
          {methods.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <label style={labelStyle}>Sharing</label>
        <select
          value={sharing}
          onChange={(e) => setSharing(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select an option</option>
          <option value="Yes">Sharing</option>
          <option value="No">Not Sharing</option>
        </select>

        <label style={labelStyle}>Executive Code</label>
        <input
          type="text"
          value={executiveCode}
          onChange={(e) => setExecutiveCode(e.target.value)}
          placeholder="Enter executive code"
          style={inputStyle}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "20px",
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
    <TransactionForm />
  )
}

export default App