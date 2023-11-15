import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const [options, setDropdown] = useState([]);


  useEffect(() => {
    fetchDropdown();
  }, []);

  const fetchDropdown = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/clientes');
      setDropdown(response.data);
    } catch (error) {
      console.error('Error fetching libros:', error);
    }
  };


  const handleChangeDrop = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleChangeDrop}>
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.nombre} value={option.nombre}>
            {option.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;