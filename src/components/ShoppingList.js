import React, { useState } from "react"; // Import useState
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

// Accept onItemFormSubmit prop from App
function ShoppingList({ items, onItemFormSubmit }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  // New state for the search term
  const [searchTerm, setSearchTerm] = useState("");

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  // New handler for search input changes
  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  // Filter items first by category
  const filteredByCategory = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  // Then filter by search term
  const itemsToDisplay = filteredByCategory.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="ShoppingList">
      {/* Pass the callback down to ItemForm */}
      <ItemForm onItemFormSubmit={onItemFormSubmit} />
      {/* Pass search term and its handler, and make category filter controlled */}
      <Filter
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory} // Pass selectedCategory to make select controlled
        onSearchChange={handleSearchChange}
        searchTerm={searchTerm} // Pass searchTerm to make search input controlled
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
