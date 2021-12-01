import { FieldAttributes, FieldMetaProps } from "formik";

interface CommonProps {
  name: string;
  label?: string; // title of the field
  required?: boolean; // default false
  requiredMessage?: string; // default --> ./utils/defaultErrorMessages.ts
  invalidFormatMessage?: string; // default --> ./utils/defaultErrorMessages.ts
  visible?: string; // will be true if undefined, or arg of new Function()
  enabled?: string; // will be true if undefined, or arg of new Function()
}

export interface schemaFieldString extends CommonProps {
  type: "text" | "email" | "phone" | "password" |'textarea';
  min?: number;
  max?: number;
  valueTooShortMessage?: string; // default --> ./utils/defaultErrorMessages.ts
  valueTooLongMessage?: string; // default --> ./utils/defaultErrorMessages.ts
  regexp?: RegExp;
}
export interface schemaFieldCheckbox extends CommonProps {
  type: "checkbox";
}
export interface schemaFieldDate extends CommonProps {
  type: "date";
  min?: string; // will be read as a date
  max?: string; // will be read as a date
  valueTooEarly?: string; // default --> ./utils/defaultErrorMessages.ts
  valueTooLate?: string; // default --> ./utils/defaultErrorMessages.ts
}
export interface schemaFieldPasswordConfirm extends CommonProps {
  type: "passwordconfirm";
  passwordFieldName: string; // to compare the two
  passwordsDontMatchMessage?: string;
}
export interface schemaFieldNumber extends CommonProps {
  type: "number";
  min?: number;
  max?: number;
  integer?: boolean; // if false, will allow floating point
  valueTooLowMessage?: string; // default --> ./utils/defaultErrorMessages.ts
  valueTooHighMessage?: string; // default --> ./utils/defaultErrorMessages.ts
}
export interface schemaFieldSelect extends CommonProps {
  type: "select";
  options: { [value: string]: string } // options: { [hidden value for the form]: text to display visually in different languages }
  disabledOptions?: string[];
}
export interface schemaFieldArray extends CommonProps {
  type: "array";
  fields: schemaField[];
}

export interface schemaFieldTextArea extends schemaFieldString {
  type: 'textarea';
  rows?: number;
}

export interface schemaFieldAddInput extends CommonProps{
  type: 'addinput';
}

export type schemaField =
  | schemaFieldString
  | schemaFieldCheckbox
  | schemaFieldDate
  | schemaFieldPasswordConfirm
  | schemaFieldNumber
  | schemaFieldSelect
  | schemaFieldArray
  | schemaFieldTextArea
  | schemaFieldAddInput;
export interface schema {
  title: string;
  submitButtonText: string;
  fields: schemaField[];
}

export interface commonProps {
  field: FieldAttributes<any>;
  meta: FieldMetaProps<any>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  fieldInfo: schemaField;
};