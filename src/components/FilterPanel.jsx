import React from 'react';

const FilterPanel = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4 w-full lg:w-80 bg-white text-black shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Filter Properties</h2>

      <label className="block mb-2 text-sm font-semibold">Property Type</label>
      <select name="type" value={filters.type} onChange={handleChange} className="w-full p-2 border rounded mb-3">
        <option value="">All</option>
        <option value="Residential">Residential</option>
        <option value="Commercial">Commercial</option>
        <option value="Industrial">Industrial</option>
        <option value="Agricultural">Agricultural</option>
      </select>

      <label className="block mb-2 text-sm font-semibold">City</label>
      <input
        type="text"
        name="city"
        value={filters.city}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
        placeholder="Enter city"
      />

      
    </div>
  );
};

export default FilterPanel;
