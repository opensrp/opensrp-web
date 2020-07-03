import { ChangeEvent } from 'react';
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
declare const SearchForm: {
    (props: SearchBarProps): JSX.Element;
    defaultProps: SearchBarDefaultProps;
};
export { SearchForm };
