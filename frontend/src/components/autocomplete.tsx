import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createFilterOptions } from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import autocompletion from './api';

interface Item {
  id: number;
  name: string;
}

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function AutoComplete() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly Item[]>([]);
  const loading = open && options.length === 0;
  const [inputValue, setInputValue] = React.useState('');

  const OPTIONS_LIMIT = 3;
  const defaultFilterOptions = createFilterOptions();
  
  const filterOptions = (options:any, state:any) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };

  React.useEffect(() => {
    let active = true;
    console.log(inputValue);
    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        const result = await autocompletion(inputValue);
        var array = JSON.parse(result);
        var topics = array[0];
        var valeur = topics["topicsList"];
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
        setOptions(itemsArray);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="autocomplete"
      sx={{width: 210,
        margin: "5px",
      }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}

      disablePortal = {false}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      filterOptions={filterOptions}
      isOptionEqualToValue={(option:any, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          sx={{
            
            '& label.Mui-focused': {
              color: 'grey',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: '#ff9100',
            },
            '& .MuiOutlinedInput-root': {
              legend: {
                marginLeft: "5px"
              },
              '& fieldset': {
                borderColor: 'grey',
              },
              '&:hover fieldset': {
                borderColor: 'gray',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#ff9100',
                borderWidth: "1px"
              },
            },
           
            "& . MuiTextField-root":{
              color:"#ff9100"
            },
            "& .MuiAutocomplete-inputRoot": {
              borderRadius: "10px"
            },
            "& .MuiInputLabel-outlined": {
              paddingLeft: "10px"
            },
          }}
          label="Search Something"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

