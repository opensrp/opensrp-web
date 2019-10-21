import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

/** state interface for SearchBox  */
interface SearchBoxState {
  searchText: '';
}

class SearchBox extends React.Component<{}, SearchBoxState> {
  public render() {
    return (
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <FontAwesomeIcon icon={['fas', 'search']} />
          </InputGroupText>
        </InputGroupAddon>
        <Input placeholder="search" />
      </InputGroup>
    );
  }
}

export default SearchBox;
