import { FieldMetaProps, FieldInputProps } from "formik";
import { BaseSchema } from "yup";

export type schemaFieldComponentType =
  | "text"
  | "password"
  | "textarea"
  | "checkbox"
  | "date"
  | "number"
  | "select"
  | "array"
  | "addinput";

export type schemaFieldValidator = {
  always?: [string, ...any[]][];
  when?: {
    field: string|string[];
    is: any; // if a function is passed, it will be called passing it then field(s) as arguments, and it will expect to be returned true or false
    then: [string, ...any[]][] | schemaFieldValidator;
    // otherwise: [string, ...any[]][];
  }[]
};// | BaseSchema;
// ----------------------- EXAMPLE:
const sfv1: schemaFieldValidator = {
  always: [
    ["string", "This field must be a string!"],
    ["required", "This field cannot be left blank!"], // this part will always go first. If there are multiple whens, the when will go first but at the first then it will concatenate this part first
    ["min", 8, "Minimum 8 characters, please!"]
  ],
  when: [
    {
      field: "age",
      is: (value: any) => value > 18, // when age more than 18 , this field must be on all caps
      then: [
        ["regex", "[A-Z\s]+"]
      ]
    }
  ]
};

// --------------------------------

export interface schemaField {
  id: string;
  label: string;
  type: schemaFieldComponentType;
  placeholder?: string, // TODO
  tooltip?: string, // TODO
  visibleCondition?: string;
  enabledCondition?: string;
  validator?: schemaFieldValidator;
  fields?: schemaField[]; // ARRAY
  options?: {[id:string]: string}; // SELECT
  rows?: number; // TEXT AREA
}

export interface schema {
  title: string;
  submitButtonText: string;
  fields: schemaField[];
}

export interface componentCommonProps {
  fieldInfo: schemaField;
  meta: FieldMetaProps<any>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  inputProps: FieldInputProps<any> & { id?: string; disabled: boolean; }
}

export type ArrayInputProps = {
  arrayFields: JSX.Element[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  fieldInfo: schemaField;
  meta: FieldMetaProps<any>;
  inputProps: { disabled: boolean; };
};
export type RedErrorBelowProps = { meta: FieldMetaProps<any> };
export type FormTitleProps = { text: string };
export type SubmitButtonProps = { text: string };


// mixed
//   .when(
//     | keys: string
//     | Array<string>
//     ,
//     | builder: object
//     | (value, schema) => Schema
//   ): Schema

// EXAMPLE
// https://runkit.com/ivrusson/61a76ea59bebcb0008798480
// const fields = [
//   {
//     id: "name",
//     type: "text",
//     required: true,
//   },
//   {
//     id: "age",
//     type: "number",
//     visible: "values.name === 'demo'",
//     validator: {
//       when: [
//         "name",
//         {
//           is: "demo",
//           then: [
//             ["required", "Age is required"],
//             ["string", "Age must be a string"],
//           ],
//           otherwise: [["string", "Age must be a string"]],
//         },
//       ],
//     },
//   },
// ];
// https://github.com/jquense/yup#mixedwhenkeys-string--arraystring-builder-object--value-schema-schema-schema