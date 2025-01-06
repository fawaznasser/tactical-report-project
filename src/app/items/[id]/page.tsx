"use client";

import { useRouter, useParams } from "next/navigation"; // Import useParams for dynamic route handling
import { useEffect, useState } from "react";
import axios from "axios";

// Define the Item interface
interface Item {
  id: string;
  name: string;
  description?: string; // Optional description
}

const ItemDetails = () => {
  const router = useRouter();
  const params = useParams(); // Use useParams to get the dynamic route parameters
  const { id } = params; // Extract the "id" parameter
  const [item, setItem] = useState<Item | null>(null); // Set initial state to null
  const [error, setError] = useState("");

  // Fetch item details when the ID is available
  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items/${id}`);
          setItem(response.data); // Set the fetched item
        } catch (err) {
          console.error("Error fetching item:", err);
          setError("Failed to fetch item details.");
        }
      };

      fetchItem();
    }
  }, [id]);

  if (error) {
    return (
      <div
        style={{
          maxWidth: "500px",
          margin: "auto",
          padding: "20px",
          backgroundColor: "#333", // Dark gray background
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          color: "#FFD700", // Golden yellow for text
        }}
      >
        <p>{error}</p>
        <button
          onClick={() => router.push("/")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#000", // Black button background
            color: "#FFD700", // Golden yellow text
            border: "1px solid #FFD700", // Golden border
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#555")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#000")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return item ? (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "30px",
        backgroundColor: "#333", // Dark gray background
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        color: "#f5f5f5", // Light gray text
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          marginBottom: "20px",
          color: "#FFD700", // Golden yellow for the title
          textAlign: "center",
        }}
      >
        {item.name}
      </h1>
      <p
        style={{
          fontSize: "18px",
          marginBottom: "20px",
          color: "#FFD700", // Golden yellow for description
          lineHeight: "1.6",
        }}
      >
        {item.description || "No description available."}
      </p>
      <button
        onClick={() => router.push("/")}
        style={{
          display: "block",
          margin: "0 auto",
          padding: "12px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          backgroundColor: "#000", // Black button background
          color: "#FFD700", // Golden yellow text
          border: "1px solid #FFD700", // Golden border
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#555")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#000")}
      >
        Back to Home
      </button>
    </div>
  ) : (
    <div
      style={{
        textAlign: "center",
        margin: "50px auto",
        color: "#FFD700", // Golden yellow for loading text
      }}
    >
      <p>Loading...</p>
    </div>
  );
};

export default ItemDetails;
