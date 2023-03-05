import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import autocompletion from './api';
import { useState, useEffect } from 'react';
import { wait } from '@testing-library/user-event/dist/utils';
function AutoComplete() {

  type Item = {
    id: number;
    name: string;
  }

  const [value, setValue] = useState<Item[]>([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const search = async () => {
      const result = await autocompletion(inputText);
      var array = JSON.parse(result);
      var topics = array[0];
      var valeur = topics["topicsList"];
      console.log("valeur")

      console.log(valeur)
      var itemsArray: Item[] = [];

      var i = 0;
      for (var itemName of valeur) {
        const itemToAdd: Item = {
          id: i,
          name: itemName
        };
        itemsArray.push(itemToAdd);
        i++;
      }
      console.log("itemsArray")
      console.log(itemsArray)
      console.log("value");
      setValue(itemsArray);
      console.log("value")
      console.log(value)

    }
    if (inputText !== '') {
      console.log(true)
      search();
    } else {
      setValue([]);
    }
  }, [inputText]);

  useEffect(() => { 
    console.log("value after")

    console.log(value)
   }, [value])


  const handleOnSearch = (string: any, results: any) => {
    setInputText(string);
    console.log("result : " + results)
  };

  const handleOnHover = (result: any) => {
    console.log(result);
  };

  const handleOnSelect = (item: any) => {
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    console.log("Cleared");
  };

  return (<ReactSearchAutocomplete<Item>
    items={value}
    onSearch={handleOnSearch}
    onHover={handleOnHover}
    onSelect={handleOnSelect}
    onFocus={handleOnFocus}
    onClear={handleOnClear}
    showIcon={false}
    showItemsOnFocus={false}

    styling={{
      border: '1px solid #ff9100',
      height: '36px',
      borderRadius: '10px',
    }}
  />);
}
export default AutoComplete