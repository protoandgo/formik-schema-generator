// =========================== FB_Field Visibility Filters =========================== //

import React from "react";
import {
  BooleanSchema,
  DateSchema,
  MixedSchema,
  NumberSchema,
  ArraySchema,
  ObjectSchema,
  StringSchema,
} from "yup";
import { OptionalObjectSchema, TypeOfShape } from "yup/lib/object";
import { AnyObject } from "yup/lib/types";

export type YupSchema =
  | BooleanSchema
  | DateSchema
  // | typeof MixedSchema
  | NumberSchema
  // | typeof ArraySchema
  // | typeof ObjectSchema
  | StringSchema;


export type YupObjType = OptionalObjectSchema<{
    [x: string]: YupSchema;
}, AnyObject, TypeOfShape<{
    [x: string]: YupSchema;
}>>;

// SHOW FIELD IF FIELD ___'S VALUE IS less/more/equal TO FIELD ___'S VALUE
export interface FB_Condition_Any {
  field?: string;
}
interface FB_Condition_FieldComparisonAny extends FB_Condition_Any {
  is:
    | "less than"
    | "less than or equal to"
    | "equal"
    | "more than or equal to"
    | "more than";
}
export interface FB_Condition_FieldCompareToOtherField
  extends FB_Condition_FieldComparisonAny {
  otherField: string;
}
export interface FB_Condition_FieldCompareToValue
  extends FB_Condition_FieldComparisonAny {
  value: string | (() => string) | number | (() => number); // TODO | date | etc |
}
export interface FB_Condition_FieldEmpty extends FB_Condition_Any {
  is: "empty" | "not empty";
}
export interface FB_Condition_FieldLengthSpecific extends FB_Condition_Any {
  lengthIs: number;
}
export interface FB_Condition_FieldLengthCompare extends FB_Condition_Any {
  is:
    | "less than"
    | "less than or equal to"
    | "equal"
    | "more than or equal to"
    | "more than";
  length: number;
}

// SHOW FIELD IF CURRENT USER IS / HAS ___
interface FB_Condition_CurrentUserName {
  username: "name";
  is: string;
}
interface FB_Condition_CurrentUserRole {
  userrole: "role";
  is: "user" | "admin"; // TODO (possibly) more roles
}

// TODO (possibly) more FB_Field Visibility Filters. Maybe more conditions about the user

// Type to export:
type FB_Condition =
  | FB_Condition_FieldCompareToOtherField
  | FB_Condition_FieldCompareToValue
  | FB_Condition_FieldEmpty
  | FB_Condition_FieldLengthSpecific
  | FB_Condition_FieldLengthCompare
  | FB_Condition_CurrentUserName
  | FB_Condition_CurrentUserRole;

// =========================== FB_Field Validation Rules =========================== //

// // FIELD VALUE IS VALID IF VALUE IS ___
// interface FB_Field_ValidationRule_Length {
//   rulename: "min" | "max";
//   rulevalue: number;
// }

// // TODO (possibly) more FB_Field Rules

// // Type to export:
// type FB_Field_ValidationRule = FB_Field_ValidationRule_Length; // | FB_Field_ValidationRuleString;

// =========================== FB_Fields =========================== //

// FIELD COMMON PROPERTIES
interface FB_Field_Any {
  // Common properties of all types of fields
  name: string;
  label?: string;
  placeholder?: string;
  validWhen?: FB_Condition[] | YupObjType;
  visibleWhen?: FB_Condition[] | YupObjType;
  customRender?: React.ReactNode;
}

// FIELD PROPERTIES FOR TYPES 'TEXT', 'NUMBER', 'EMAIL', 'PASSWORD' AND 'PHONE'
interface FB_Field_GroupOne extends FB_Field_Any {
  type:
    | "text"
    | "number"
    | "email"
    | "password"
    | "phone"
    | "textarea"
    | "checkbox";
}

// FIELD PROPERTIES FOR TYPE 'SELECT'
export type FB_Field_Select_Option = {
  title: string;
  value: string;
};
interface FB_Field_Select extends FB_Field_Any {
  type: "select";
  options: FB_Field_Select_Option[];
}

// FIELD PROPERTIES FOR TYPE 'DATE'
interface FB_Field_Date extends FB_Field_Any {
  type: "date";
  // TODO
  // datePickerProps: {
  //   // ...;
  // };
  // helpText: string;
}

// Type to export:
type FB_Field =
  | FB_Field_GroupOne /*| FB_Field_Checkbox*/
  | FB_Field_Select
  | FB_Field_Date;

// =========================== Schema =========================== //

type FormSchema = {
  fields: FB_Field[];
  // TODO ????
};

// =========================== Export =========================== //

export type { FB_Condition };
export type { FB_Field };
export type { FormSchema };
