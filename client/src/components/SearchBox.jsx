import { useState } from 'react';

export const SearchBox = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (value) => {
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search.."
        value={searchValue}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
};
