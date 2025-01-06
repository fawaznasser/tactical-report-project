"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Define the Item interface
interface Item {
  id: string;
  name: string;
  description?: string;
}

const UpdateItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  // Fetch items on component mount
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

  // Handle selecting an item to update
  const handleSelectItem = (item: Item) => {
    setSelectedItem(item);
    setName(item.name);
    setDescription(item.description || "");
  };

  // Handle updating the selected item
  const handleUpdateItem = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedItem) {
      setError("No item selected for update.");
      return;
    }

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/items/${selectedItem.id}`, {
        name,
        description,
      });

      setSuccess("Item updated successfully!");
      setError("");

      // Update the item in the list
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === selectedItem.id ? { ...item, name, description } : item
        )
      );

      // Clear the form and deselect the item
      setSelectedItem(null);
      setName("");
      setDescription("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to update the item.");
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <button
        onClick={() => router.push("/items/components")}
        style={{
          display: "block",
          marginBottom: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#FFD700",
          backgroundColor: "#333",
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
        Update Items
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
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelectItem(item)}
            style={{
              padding: "20px",
              border: "1px solid #B8860B",
              borderRadius: "10px",
              backgroundColor: selectedItem?.id === item.id ? "#555" : "#404040",
              color: "#f5f5f5",
              cursor: "pointer",
            }}
          >
            <h3 style={{ fontSize: "20px", marginBottom: "10px", color: "#FFD700" }}>
              {item.name}
            </h3>
            <p style={{ fontSize: "16px", color: "#f0f8ff" }}>
              {item.description || "No description available."}
            </p>
          </div>
        ))}
      </div>

      {selectedItem && (
        <form onSubmit={handleUpdateItem} style={{ marginBottom: "30px" }}>
          <h3
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#FFD700",
            }}
          >
            Update Selected Item
          </h3>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                color: "#FFD700",
              }}
            >
              Item Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #B8860B",
                borderRadius: "5px",
                backgroundColor: "#404040",
                color: "#f5f5f5",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                color: "#FFD700",
              }}
            >
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #B8860B",
                borderRadius: "5px",
                backgroundColor: "#404040",
                color: "#f5f5f5",
                minHeight: "100px",
              }}
            ></textarea>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#FFD700",
              backgroundColor: "#000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#333")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#000")}
          >
            Update Item
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateItems;
