import * as Yup from 'yup';
/** form fields interface */
export interface InitialValuesTypes {
    form: any;
    form_name: string;
    form_relation: string;
    module: string;
}
/** Yup client upload validation schema */
export declare const uploadValidationSchema: Yup.ObjectSchema<Yup.Shape<object | undefined, {
    form: {};
    form_name: string;
    form_relation: string | undefined;
    module: string | undefined;
}>>;
/** */
export declare const defaultInitialValues: InitialValuesTypes;
