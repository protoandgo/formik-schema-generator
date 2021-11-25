import { FieldHelperProps, FieldInputProps, FieldMetaProps } from "formik";


// Properties common in all types of fields
interface CommonProps {
  name: string;
  label?: string; // title of the field
  required?: boolean; // default false
  requiredMessage?: string; // default --> ./utils/defaultErrorMessages.ts
  invalidFormatMessage?: string; // default --> ./utils/defaultErrorMessages.ts
  visible?: string; // will be true if undefined, or arg of new Function()
  enabled?: string; // will be true if undefined, or arg of new Function()
}

interface BoxField extends CommonProps {
  type: "box";
  fields: FieldSchema[];
  allowAdd?: boolean;
}

// Group of types of fields with all properties in common
interface StringGroup extends CommonProps {
  type: "text" | "email" | "phone" | "textarea" | "password";
  min?: number;
  max?: number;
  valueTooShortMessage?: string; // default --> ./utils/defaultErrorMessages.ts
  valueTooLongMessage?: string; // default --> ./utils/defaultErrorMessages.ts
  regexp?: string;
}

// Field of type Checkbox
interface CheckboxField extends CommonProps {
  type: "checkbox";
}

// Field of type Date
interface DateField extends CommonProps {
  type: "date";
  min?: string; // will be read as a date
  max?: string; // will be read as a date
  valueTooEarly?: string; // default --> ./utils/defaultErrorMessages.ts
  valueTooLate?: string; // default --> ./utils/defaultErrorMessages.ts
}

// Field of type Password Confirm
interface PasswordConfirmField extends CommonProps {
  type: "passwordconfirm";
  passwordFieldName: string; // to compare the two
  passwordsDontMatchMessage?: string;
}

// Field of type Number
interface NumberField extends CommonProps {
  type: "number";
  min?: number;
  max?: number;
  integer?: boolean; // if false, will allow floating point
  valueTooLowMessage?: string; // default --> ./utils/defaultErrorMessages.ts
  valueTooHighMessage?: string; // default --> ./utils/defaultErrorMessages.ts
}

// Field of type Select
interface SelectField extends CommonProps {
  type: "select";
  // options: string[];
  options: { [value: string]: string } // options: { [hidden value for the form]: text to display visually in different languages }
  disabledOptions?: string[];
}

// Any Field
export type FieldSchema = BoxField | StringGroup | CheckboxField | DateField | PasswordConfirmField | NumberField | SelectField;

// Form Schema
export type FormSchema = {
  fields: FieldSchema[];
}

// =========================== Type that input components' interfaces must extend to
export type GenericInputComponentProps = {
  // [x: string]: any;
  name: string; // Name of the field
  label?: string; // Title of the field
  field: FieldInputProps<any>; // To add to the main component, for example: <input {...field}> </input>
  meta: FieldMetaProps<any>; // To display validation errors
  // helpers: FieldHelperProps<any>; // To be able to manually set the value if needed
  enabled?: boolean; // To display disabled version if needed
}
// example of type that