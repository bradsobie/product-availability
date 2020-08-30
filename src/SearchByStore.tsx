import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
  Paper
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PlaceIcon from '@material-ui/icons/Place';

import PlacesAutocomplete from 'react-places-autocomplete';

const StoreResults = ({ suggestions, getInputProps, getSuggestionItemProps }) => {
  return (
    <div style={{ position: 'relative' }}>
      <TextField
        {...getInputProps()}
        fullWidth
        placeholder="Find a store"
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
        }}
      />
      {suggestions.length > 0 && <Paper style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          zIndex: 1
        }}>
        <List component="nav">
          {suggestions.map(suggestion => {
            return (
              <ListItem
                divider
                button
                key={suggestion.placeId}
                {...getSuggestionItemProps(suggestion)}
              >
                <ListItemIcon>
                  <PlaceIcon />
                </ListItemIcon>
                <ListItemText primary={suggestion.description} />
              </ListItem>
            );
          })}
        </List>
      </Paper>}
    </div>
  );
}

const SearchByStore = ({ inputText, onChange, onSelect, location }) => {
  return (
    <PlacesAutocomplete
      value={inputText}
      onChange={onChange}
      onSelect={onSelect}
      googleCallbackName="initMap"
      searchOptions={{
        radius: 80000,
        location: location,
        types: ['establishment']
      }}
    >
      {(autoCompleteProps) => <StoreResults {...autoCompleteProps} />}
    </PlacesAutocomplete>
  )
}

export default SearchByStore
