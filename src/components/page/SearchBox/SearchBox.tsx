import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Input, InputGroup } from 'reactstrap';
import './SearchBox.css';

/** props interface for SearchBox */
export interface SearchBoxProps {
  placeholder?: string;
  searchCallBack(searchString: string): void;
}

/** state interface for SearchBox  */
export interface SearchBoxState {
  searchText: string;
}

/** default state for searchBox */
const defaultSearchBoxState = {
  searchText: '',
};

class SearchBox extends React.Component<SearchBoxProps, SearchBoxState> {
  constructor(props: SearchBoxProps) {
    super(props);
    this.state = defaultSearchBoxState;
  }
  public render() {
    return (
      <div id="custom-search-input">
        <InputGroup className="shadow-sm">
          <span className="input-group-btn search-bar-icon">
            <FontAwesomeIcon icon={['fas', 'search']} />
          </span>
          <Input
            placeholder={this.props.placeholder || 'Search'}
            className="search-bar-input"
            onChange={this.handleChange}
            onKeyPress={this.search}
          />
        </InputGroup>
      </div>
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
