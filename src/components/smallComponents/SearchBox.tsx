import React from 'react';

type SearchBoxProps = {
  searchValue: string;
  onSearch: (value: string) => void;
};

const SearchBox: React.FC<SearchBoxProps> = ({ searchValue, onSearch }: SearchBoxProps) => {
  return (
    <div className="search-box">
      <i className="fa fa-search"></i>
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
