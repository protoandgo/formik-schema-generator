// =========================== Field Visibility Filters =========================== //

// SHOW FIELD IF FIELD ___'S VALUE IS less/more/equal TO FIELD ___'S VALUE
interface Field_VisibilityFilter_ComparisonAny {
  field: string;
  is: "less than" | "equal" | "more than";
}
export interface Field_VisibilityFilter_ComparisonOtherField
  extends Field_VisibilityFilter_ComparisonAny {
  otherField: string;
}
export interface Field_VisibilityFilter_ComparisonValue
  extends Field_VisibilityFilter_ComparisonAny {
  value: string | (() => string) | number | (() => number); // TODO | date | etc |
}
export interface Field_VisibilityFilter_FieldEmpty {
  field: string;
  is: "empty" | "not empty";
}

// SHOW FIELD IF CURRENT USER IS / HAS ___
interface Field_VisibilityFilter_CurrentUserName {
  username: "name";
  is: string;
}
interface Field_VisibilityFilter_CurrentUserRole {
  userrole: "role";
  is: "user" | "admin"; // TODO (possibly) more roles
}

// TODO (possibly) more Field Visibility Filters. Maybe more conditions about the user

// Type to export:
type Field_VisibilityFilter =
  | Field_VisibilityFilter_ComparisonOtherField
  | Field_VisibilityFilter_ComparisonValue
  | Field_VisibilityFilter_FieldEmpty
  | Field_VisibilityFilter_CurrentUserName
  | Field_VisibilityFilter_CurrentUserRole;

// =========================== Field Validation Rules =========================== //

// FIELD VALUE IS VALID IF VALUE IS ___
interface Field_ValidationRule_Length {
  rulename: "min" | "max";
  rulevalue: number;
}

// TODO (possibly) more Field Rules

// Type to export:
type Field_ValidationRule = Field_ValidationRule_Length; // | Field_ValidationRuleString;

// =========================== Fields =========================== //

// FIELD COMMON PROPERTIES
interface Field_Any {
  // Common properties of all types of fields
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  rules?: Field_ValidationRule[];
  visibility?: Field_VisibilityFilter[];
}

// FIELD PROPERTIES FOR TYPES 'TEXT', 'NUMBER', 'EMAIL', 'PASSWORD' AND 'PHONE'
interface Field_TextNumberEmail extends Field_Any {
  type: "text" | "number" | "email" | "password" | "phone";
}

// FIELD PROPERTIES FOR TYPE 'CHECKBOX'
interface Field_Checkbox extends Field_Any {
  type: "checkbox";
  startChecked?: boolean;
}

// FIELD PROPERTIES FOR TYPE 'SELECT'
interface Field_Select extends Field_Any {
  type: "select";
  options: {
    value: string;
    title: string;
  }[];
}

// FIELD PROPERTIES FOR TYPE 'DATE'
interface Field_Date extends Field_Any {
  type: "date";
  datePickerProps: {
    // ...;
  };
  helpText: string;
}

// Type to export:
type Field = Field_TextNumberEmail | Field_Checkbox | Field_Select | Field_Date;

// =========================== Schema =========================== //

type FormSchema = {
  fields: Field[];
  // TODO ????
};

// =========================== Export =========================== //

export type { Field_VisibilityFilter };
export type { Field_ValidationRule };
export type { Field };
export type { FormSchema };
