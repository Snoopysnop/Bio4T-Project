import React, { useState, useEffect } from 'react';
import ApiOutput from './apiOutput';
import AsyncSelect  from 'react-select';

interface Result {
  id: number;
  name: string;
}

function SearchOutputBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await ApiOutput(query);
      var array = JSON.parse(response);
      console.log(array)
      setResults(array);
    }
    fetchData();
  }, [query]);




  function handleChange(selectedOption: any) {
    console.log(selectedOption)
    setQuery(selectedOption ? selectedOption.value : '');
  }

  
  const options = results.map(result => ({ value: result.name, label: result.name }));

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderRadius: 10,
      borderColor: state.isFocused ? '#ff9100' : provided.borderColor,
      '&:hover': {
        borderColor: state.isFocused ? '#ff9100' : provided.borderColor
      },
      boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0, 123, 255, 0.25)' : provided.boxShadow
    }),

    container: (provided: any) => ({
      ...provided,
      width: 100,
    }),

    dropdownIndicator: (provided: any) => ({
      ...provided,
      display: 'none', // masquer l'icône "V"
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: 'none', // masquer l'icône "V"
    }),
    menu: (provided: any) => ({
      ...provided,
      width: 200
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#007bff' : provided.backgroundColor,
      color: state.isSelected ? 'white' : provided.color,
      '&:hover': {
        backgroundColor: state.isSelected ? '#007bff' : '#f8f9fa',
        color: state.isSelected ? 'white' : provided.color,
      },
    }),
   

  };

  return (
    <AsyncSelect
    
      value={{ value: query, label: query }}
      onInputChange={(value, action) => {
        // only set the input when the action that caused the
        // change equals to "input-change" and ignore the other
        // ones like: "set-value", "input-blur", and "menu-close"
        if (action.action === "input-change") setQuery(value); // <---
      }}
      blurInputOnSelect={true} //set by default, but to be sure
      closeMenuOnSelect={true}
      onChange={handleChange}
      options={options}
      isClearable={true}
      filterOption={() => true}
      placeholder="Search for items"
      styles={customStyles}
      
    />
  );
}

export default SearchOutputBar;