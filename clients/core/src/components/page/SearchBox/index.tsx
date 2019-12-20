import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Input, InputGroup } from 'reactstrap';
import './index.css';

/** props interface for SearchBox */
export interface SearchBoxProps {
    placeholder?: string;
    searchCallBack(searchString: string): void;
}

/** state interface for SearchBox  */
export interface SearchBoxState {
    searchText: string;
}

const searchBoxdefaultProps: SearchBoxProps = {
    placeholder: 'Search',
    searchCallBack: searchText => searchText,
};

/** default state for searchBox */
const defaultSearchBoxState = {
    searchText: '',
};

/** SearchBox component */
class SearchBox extends React.Component<SearchBoxProps, SearchBoxState> {
    public static defaultProps: SearchBoxProps = searchBoxdefaultProps;
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
                        placeholder={this.props.placeholder}
                        className="search-bar-input"
                        onChange={this.handleChange}
                        onKeyPress={this.search}
                    />
                </InputGroup>
            </div>
        );
    }
    /** change the searchText on change */
    private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchText: event.target.value });
    };

    /** invoke the callback function to lifting up the state */
    private search = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const { searchCallBack } = this.props;
        const { searchText } = this.state;
        if (event.key === 'Enter') {
            searchCallBack(searchText);
        }
    };
}

export default SearchBox;
