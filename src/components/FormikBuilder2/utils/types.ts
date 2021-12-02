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

  type yupTypeType = "string" | "number" | ""
  type yupOptionType = "min" | "max" | "required"
  type yupOptions = [[yupTypeType, ...(string|number)[]], ...[yupOptionType, ...(string|number)[]][]];
  // yupOptions es una array de arrays en la que:
  //    En la primera array de todas,
  //        el primer campo debe ser yupTypeType
  //            (para indicar el tipo de valor, es decir: string, number, etc)
  //        mientras que el resto de campos pueden ser strings o numbers
  //            porque son los parametros (por ejemplo: Yup.string(parametros),
  //            aunque creo que nunca se usan parametros ahi...) 
  //    En el resto de arrays,
  //        el primer campo debe ser yupOptionType
  //            (para indicar otras validaciones, es decir: min, max, regexp, etc)
  //        mientras que el resto de campos pueden ser strings o numbers,
  //            igual que en la primera array

export type schemaFieldValidator = {
  when: [(string|string[]), {
      is: string;
      // then: [string, ...any[]][];
      // otherwise: [string, ...any[]][];
      then: yupOptions;
      otherwise: yupOptions;
    }
  ];
};

export interface schemaField {
  id: string;
  label: string;
  type: schemaFieldComponentType;
  validator?: schemaFieldValidator;
  visible?: string;
  enabled?: string;
  fields?: schemaField[]; // ARRAY
  options?: {[id:string]: string}; // SELECT
  rows?: number; // TEXT AREA
}

export interface schema {
  title: string;
  submitButtonText: string;
  fields: schemaField[];
}


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