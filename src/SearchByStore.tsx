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
import styled from 'styled-components';

const Card = styled(Paper)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  backgroundColor: white;
  zIndex: 1;
`;

const Container = styled.div`
  position: relative;
`;

const StoreResults = ({ suggestions, getInputProps, getSuggestionItemProps }) => {
  return (
    <Container>
      <TextField
        {...getInputProps()}
        fullWidth
        placeholder="Find a store"
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
          style: { backgroundColor: '#fff' }
        }}
      />
      {suggestions.length > 0 &&
        <Card>
          <List component="nav">
            {suggestions.map(suggestion => 
              <ListItem
                divider
                button
                {...getSuggestionItemProps(suggestion)}
                key={suggestion.placeId}>
                <ListItemIcon>
                  <PlaceIcon />
                </ListItemIcon>
                <ListItemText primary={suggestion.description} />
              </ListItem>
            )}
          </List>
        </Card>
      }
    </Container>
  );
}

const SearchByStore = ({ inputText, onChange, onSelect, location }) => {
  return (
    <PlacesAutocomplete
      value={inputText}
      onChange={onChange}
      onSelect={onSelect}
      googleCallbackName="initMap"
      debounce={300}
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
