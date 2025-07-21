import React from "react";

// Accept new props for search functionality and make category controlled
function Filter({ onCategoryChange, selectedCategory, onSearchChange, searchTerm }) {
  return (
    <div className="Filter">
      {/* Controlled search input */}
      <input
        type="text"
        name="search"
        placeholder="Search..."
        value={searchTerm} // Controlled value
        onChange={onSearchChange} // Event handler for changes
      />
      {/* Controlled select input (optional but good practice) */}
      <select name="filter" onChange={onCategoryChange} value={selectedCategory}> {/* Controlled value */}
        <option value="All">Filter by category</option>
        <option value="Produce">Produce</option>
        <option value="Dairy">Dairy</option>
        <option value="Dessert">Dessert</option>
      </select>
    </div>
  );
}

export default Filter;
