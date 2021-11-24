import * as Yup from "yup";
import { FieldSchema } from "./types";
import defaultErrorMessages from "./defaultErrorMessages";

//#region Map through each field to build a Yup validation schema
// type YupSchema = StringSchema | NumberSchema | BooleanSchema | DateSchema;
// let yupSchema: { [x: string]: YupSchema } = {};
// // let yupSchema = Yup.object().shape({});
// formSchema.fields.forEach((field) => {
//   let yupSchemaPart: YupSchema = Yup.string();
//   switch (field.type) {
//     case "passwordconfirm":
//       yupSchemaPart = Yup.string().oneOf([yupSchema.ref('password'), null], "");

//     case "password":

//     case "text":
//     case "textarea":
//       yupSchemaPart = Yup.string().max(15, "Must be 15 characters or less");
//       if (field.min) yupSchemaPart = yupSchemaPart.min(field.min, field.valueTooShortMessage || defaultErrorMessages.dateTooEarly(field.min));
//       if (field.max) yupSchemaPart = yupSchemaPart.max(field.max, field.valueTooLongMessage || defaultErrorMessages.dateTooEarly(field.max));
//       break;

//     case "email":
//       yupSchemaPart = Yup.string().email(field.invalidFormatMessage || defaultErrorMessages.invalidFormat("email"));
//       break;

//     case "phone":
//       yupSchemaPart = Yup.string().matches(
//         // eslint-disable-next-line no-useless-escape
//         /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
//         field.invalidFormatMessage || defaultErrorMessages.invalidFormat("phone")
//       );
//       // regexp: https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
//       break;

//     case "checkbox":
//       yupSchemaPart = Yup.boolean();
//       break;

//     case "date":
//       yupSchemaPart = Yup.date();
//       if (field.min) yupSchemaPart = yupSchemaPart.min(moment(field.min), field.valueTooEarly || defaultErrorMessages.dateTooEarly(field.min));
//       if (field.max) yupSchemaPart = yupSchemaPart.max(moment(field.max), field.valueTooLate || defaultErrorMessages.dateTooEarly(field.max));
//       break;

//     case "number":
//       yupSchemaPart = Yup.number();

//       break;

//     case "select":
//       yupSchemaPart = Yup.string();
//       break;
//   }
//   if (field.required) yupSchemaPart = yupSchemaPart.required(field.requiredMessage || defaultErrorMessages.required);
//   yupSchema[field.name] = yupSchemaPart;
// });

// https://stackoverflow.com/questions/57928271/create-yup-nested-object-schema-dynamically

const createYupSchema = (fields: FieldSchema[]) => {
  type YupSchema = Yup.StringSchema | Yup.NumberSchema | Yup.BooleanSchema | Yup.DateSchema;
  // let yupSchema: { [x: string]: YupSchema } = {};
  const schema = fields.reduce((schema, field) => {
    let yupSchemaPart: YupSchema = Yup.string();
    // let validation;
    // let funcString = "";

    // ============ Type?
    if (["text", "email", "password", "phone", "textarea", "select"].includes(field.type)) {
      // funcString = "return Yup.string()"; // STRING
      yupSchemaPart = Yup.string();
      switch (field.type) {
        case "email":
          yupSchemaPart = yupSchemaPart.email(field.invalidFormatMessage || defaultErrorMessages.invalidFormat("email"));
          break;
        case "phone":
          yupSchemaPart = yupSchemaPart.matches(
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
            field.invalidFormatMessage || defaultErrorMessages.invalidFormat("phone")
          );
          break;

        case "passwordconfirm":
          yupSchemaPart = Yup.string().oneOf([Yup.ref(field.passwordFieldName), null], "");
      }
    } else {
      switch (field.type) {
        case "number":
          // funcString = "return Yup.number()"; // NUMBER
          yupSchemaPart = Yup.number();
          break;
        case "checkbox":
          // funcString = "return Yup.boolean()"; // BOOLEAN
          yupSchemaPart = Yup.boolean();
          break;
        case "date":
          // funcString = "return Yup.date()"; // DATE
          yupSchemaPart = Yup.date();
          break;
      }
    }

    // ============ Required?
    if (field.required) {
      // funcString += ".required()";
      yupSchemaPart = yupSchemaPart.required();
    }
    // yupSchema[field.name] = yupSchemaPart;

    // ============ Return
    // return validation ? { ...schema, [field.name]: new Function(funcString) } : schema;
    return { ...schema, [field.name]: yupSchemaPart };
  }, {});

  return Yup.object().shape(schema);
};

export default createYupSchema;
