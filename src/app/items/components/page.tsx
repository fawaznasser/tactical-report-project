"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Home = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
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

  const handleAddItemClick = () => {
    router.push("/items/add-item"); // Navigate to add-item page
  };

  const handleRemoveItemClick = () => {
    router.push("/items/remove-items"); // Navigate to remove-items page
  };

  const handleUpdateItemsClick = () => {
    router.push("/items/update-items"); // Navigate to update-items page
  };

  const handleItemClick = (id: string) => {
    router.push(`/items/${id}`); // Navigate to item details page
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "28px",
          fontWeight: "bold",
          color: "#B8860B",
        }}
      >
        Item List
      </h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "30px" }}>
        <button
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#FFD700",
            backgroundColor: "#333",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#555";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#333";
          }}
          onClick={handleAddItemClick}
        >
          Add New Item
        </button>
        <button
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#FFD700",
            backgroundColor: "#333",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#555";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#333";
          }}
          onClick={handleRemoveItemClick}
        >
          Remove Items
        </button>
        <button
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#FFD700",
            backgroundColor: "#333",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#555";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#333";
          }}
          onClick={handleUpdateItemsClick}
        >
          Update Items
        </button>
      </div>
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {items.map((item: any) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            style={{
              padding: "20px",
              border: "1px solid #B8860B",
              borderRadius: "10px",
              backgroundColor: "#404040",
              color: "#f5f5f5",
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                marginBottom: "10px",
                color: "#FFD700",
              }}
            >
              {item.name}
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#f0f8ff",
                lineHeight: "1.5",
              }}
            >
              {item.description || "No description available."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
