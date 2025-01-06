"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const RemoveItems = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items`);
        setItems(response.data.map((item: any) => ({ ...item, id: item._id || item.id })));
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch items.");
        } else {
          setError("An unknown error occurred.");
        }
      }
    };

    fetchItems();
  }, []);

  const handleRemoveItem = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/items/${id}`);
      setSuccess("Item removed successfully!");
      setItems(items.filter((item: any) => item.id !== id)); // Remove item from the list
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to remove the item.");
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const handleBack = () => {
    router.push("/items/components"); // Navigate back to the items list
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <button
        onClick={handleBack}
        style={{
          display: "block",
          marginBottom: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#FFD700", // Golden yellow text
          backgroundColor: "#333", // Dark gray background
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#555")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333")}
      >
        Back to Items
      </button>

      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "28px",
          fontWeight: "bold",
          color: "#B8860B",
        }}
      >
        Remove Items
      </h2>
      {error && (
        <p
          style={{
            color: "red",
            textAlign: "center",
            background: "#ffe0e0",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          {error}
        </p>
      )}
      {success && (
        <p
          style={{
            color: "green",
            textAlign: "center",
            background: "#e0ffe0",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          {success}
        </p>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
          gap: "20px",
        }}
      >
        {items.map((item: any) => (
          <div
            key={item.id}
            style={{
              padding: "30px",
              border: "1px solid #B8860B", // Golden border
              borderRadius: "10px",
              backgroundColor: "#404040", // Dark gray background
              color: "#f5f5f5", // Light gray text
              position: "relative",
            }}
          >
            <h3
              style={{
                fontSize: "24px",
                marginBottom: "10px",
                color: "#FFD700", // Golden yellow for title
              }}
            >
              {item.name}
            </h3>
            <p
              style={{
                fontSize: "18px",
                color: "#f0f8ff",
                lineHeight: "1.5",
                marginBottom: "20px",
              }}
            >
              {item.description || "No description available."}
            </p>
            <button
              onClick={() => handleRemoveItem(item.id)}
              style={{
                padding: "12px 20px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#FFD700", // Golden yellow text
                backgroundColor: "#000", // Black background
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#333")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#000")}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemoveItems;
