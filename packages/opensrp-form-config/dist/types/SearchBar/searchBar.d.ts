import { ChangeEvent } from 'react';
import '../styles/index.css';
/** SearchBar props interface  */
export interface SearchBarDefaultProps {
    placeholder?: string;
    debounceTime?: number;
}
/** function type for custom onChangeHandler functions */
export declare type OnChangeType = (event: ChangeEvent<HTMLInputElement>) => void;
/** search bar props interface */
export interface SearchBarProps extends SearchBarDefaultProps {
    onChangeHandler: OnChangeType;
}
/** simple component for handling search */
export declare const SearchBar: {
    (props: SearchBarProps): JSX.Element;
    defaultProps: SearchBarDefaultProps;
};
export default SearchBar;
