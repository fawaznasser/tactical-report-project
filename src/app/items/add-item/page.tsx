"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; 

const AddItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter(); // Initialize the router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/items`, {
        name,
        description,
      });
      setSuccess("Item added successfully!");
      setName("");
      setDescription("");
      setTimeout(() => router.push("/"), 1500); // Redirect to home after success
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to add item. Please check the form and try again.");
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#505050", // Gray background
        color: "#f5f5f5", // Light gray text for readability
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#B8860B", // Dark yellow for title
        }}
      >
        Add Item
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#B8860B", // Dark yellow for labels
            }}
          >
            Item Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter item name"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #000000", // Black border
              borderRadius: "5px",
              boxSizing: "border-box",
              fontSize: "16px",
              backgroundColor: "#404040", // Dark gray input background
              color: "#f5f5f5", // Light gray text
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#B8860B", // Dark yellow for labels
            }}
          >
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter item description"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #000000", // Black border
              borderRadius: "5px",
              boxSizing: "border-box",
              fontSize: "16px",
              minHeight: "100px",
              backgroundColor: "#404040", // Dark gray textarea background
              color: "#f5f5f5", // Light gray text
            }}
          ></textarea>
        </div>
        {error && (
          <p
            style={{
              color: "red",
              marginBottom: "15px",
              textAlign: "center",
              background: "#ffe0e0",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {error}
          </p>
        )}
        {success && (
          <p
            style={{
              color: "green",
              marginBottom: "15px",
              textAlign: "center",
              background: "#e0ffe0",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {success}
          </p>
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#B8860B", // Dark yellow for button text
            backgroundColor: "#000000", // Black button background
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#000000")}
        >
          Add Item
        </button>
      </form>
      <button
        onClick={() => router.push("/")} // Navigate back to home
        style={{
          display: "block",
          margin: "20px auto 0 auto",
          padding: "12px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#B8860B", // Dark yellow for button text
          backgroundColor: "#333333", // Dark gray background for back button
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#000000")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default AddItem;
