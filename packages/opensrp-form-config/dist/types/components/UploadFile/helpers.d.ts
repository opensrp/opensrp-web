import * as Yup from 'yup';
/** form fields interface */
export interface InitialValuesTypes {
    form: any;
    form_name: string;
    form_relation: string;
    module: string;
}
/** Yup client upload validation schema */
export declare const uploadValidationSchema: Yup.ObjectSchema<object & {
    form: any;
    form_name: string;
    form_relation: string;
    module: string;
}>;
/** */
export declare const defaultInitialValues: InitialValuesTypes;
