import React, { useState } from "react";
import { v4 as uuid } from "uuid"; // Import uuid to generate unique IDs

// Accept onItemFormSubmit callback prop from ShoppingList (which got it from App)
function ItemForm({ onItemFormSubmit }) {
  // State to hold form data for controlled inputs
  const [formData, setFormData] = useState({
    name: "",
    category: "Produce", // Initial value as required
  });

  // Generic handler for input changes
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  // Handler for form submission
  function handleSubmit(event) {
    event.preventDefault(); // Prevent default browser form submission (page reload)

    // Create a new item object
    const newItem = {
      id: uuid(), // Generate unique ID
      name: formData.name,
      category: formData.category,
    };

    // Call the callback function passed from parent to add the new item
    onItemFormSubmit(newItem);

    // Reset the form fields after submission
    setFormData({
      name: "",
      category: "Produce", // Reset to initial category
    });
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}> {/* Add onSubmit handler */}
      <label htmlFor="item-name">
        Name:
        <input
          id="item-name" // Add id for label
          type="text"
          name="name"
          value={formData.name} // Controlled value
          onChange={handleChange} // Event handler
        />
      </label>

      <label htmlFor="item-category">
        Category:
        <select
          id="item-category" // Add id for label
          name="category"
          value={formData.category} // Controlled value
          onChange={handleChange} // Event handler
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
