import { ReactSearchAutocomplete } from 'react-search-autocomplete'


function AutoComplete() {
    const items = [
        {
          id: 0,
          name: "Cobol",
        },
        {
          id: 1,
          name: "JavaScript",
        },
        {
          id: 2,
          name: "Basic",
        },
        {
          id: 3,
          name: "PHP",
        },
        {
          id: 4,
          name: "Java",
        },
      ];
    
      const manyItems = [...new Array(10000)].map((_, i) => ({
        id: i,
        name: `something${i}`,
        description:
          "Some description text, where the search will be performed too.",
      }));
    
      const movieItems = [
        {
          id: 0,
          title: "Titanic",
          description: "A movie about love",
        },
        {
          id: 1,
          title: "Dead Poets Society",
          description: "A movie about poetry and the meaning of life",
        },
        {
          id: 2,
          title: "Terminator 2",
          description: "A robot from the future is sent back in time",
        },
        {
          id: 3,
          title: "Alien 2",
          description: "Ripley is back for a new adventure",
        },
      ];
    
      const handleOnSearch = (string: any, results: any) => {
        console.log(string, results);
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
    
      const formatResult = (item: any) => {
        console.log(item);
        return (
          <div className="result-wrapper">
            <span className="result-span">id: {item.id}</span>
            <span className="result-span">name: {item.name}</span>
          </div>
        );
      };
      
    return(<ReactSearchAutocomplete 
        items={items}
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