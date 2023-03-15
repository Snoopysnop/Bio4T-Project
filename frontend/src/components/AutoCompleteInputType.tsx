import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createFilterOptions } from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import ACInput from './apiInput';

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

  const filterOptions = (options: any, state: any) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };

  React.useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1000); // For demo purposes.

      if (active && inputValue !== '') {
        console.log("inputValue")
        console.log(inputValue)
        const result = await ACInput(inputValue);
        console.log(result)
        var array = JSON.parse(result);
        var itemsArray: Item[] = [];

        var i = 0;
        for (var input of array) {
          var inputName = input["node.term"];

          const itemToAdd: Item = {
            id: i,
            name: inputName
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
      freeSolo
      sx={{
        width: 86,
        margin: "5px",
      }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}

      disablePortal={false}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      filterOptions={filterOptions}
      isOptionEqualToValue={(option: any, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      componentsProps={{
        paper: {
          sx: {
            width: 150
          }
        }
      }}
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

            "& . MuiTextField-root": {
              color: "#ff9100"
            },
            "& .MuiAutocomplete-inputRoot": {
              borderRadius: "10px"
            },

          }}
          label="Input"
          InputProps={{
            ...params.InputProps,
          }}
        />
      )}
    />
  );
}

