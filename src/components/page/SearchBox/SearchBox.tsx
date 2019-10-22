import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

/** props interface for SearchBox */
interface SearchBoxProps {
  searchCallBack(searchString: string): void;
}

/** state interface for SearchBox  */
interface SearchBoxState {
  searchText: string;
}

/** default state for searchBox */
const defaultSearchBoxState = {
  searchText: '',
};

class SearchBox extends React.Component<SearchBoxProps, SearchBoxState> {
  public componentDidMount() {
    this.setState(defaultSearchBoxState);
  }
  public render() {
    return (
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <FontAwesomeIcon icon={['fas', 'search']} />
          </InputGroupText>
        </InputGroupAddon>
        <Input placeholder="search" onChange={this.handleChange} onKeyPress={this.search} />
      </InputGroup>
    );
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    return this.setState({ searchText: event.target.value });
  };

  private search = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { searchCallBack } = this.props;
    const { searchText } = this.state;
    if (event.key === 'Enter') {
      searchCallBack(searchText);
    }
  };
}

export default SearchBox;
