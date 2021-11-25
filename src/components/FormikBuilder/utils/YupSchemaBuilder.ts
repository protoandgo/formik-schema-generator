import * as Yup from "yup";
import { FieldSchema } from "./types";
import defaultErrorMessages from "./defaultErrorMessages";

// https://stackoverflow.com/questions/57928271/create-yup-nested-object-schema-dynamically

const createYupSchema = (fields: FieldSchema[]) => {
  type YupSchema = Yup.StringSchema | Yup.NumberSchema | Yup.BooleanSchema | Yup.DateSchema;

  // Map through each field to build a Yup validation schema
  const schema = fields.reduce((schema, field) => {
    let yupSchemaPart: YupSchema = Yup.string();

    // ============ Type?
    if (["text", "email", "password", "phone", "textarea", "select"].includes(field.type)) {
      yupSchemaPart = Yup.string(); // STRING
      switch (field.type) {
        case "email":
          yupSchemaPart = yupSchemaPart.email(
            field.invalidFormatMessage /* || defaultErrorMessages.invalidFormat("email")*/
          ); // EMAIL
          break;
        case "phone":
          yupSchemaPart = yupSchemaPart.matches(
            // regexp: https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
            field.invalidFormatMessage || defaultErrorMessages.invalidFormat("phone") // PHONE
          );
          break;

        case "passwordconfirm":
          yupSchemaPart = Yup.string().oneOf([Yup.ref(field.passwordFieldName), null], ""); // PASSWORD CONFIRM
      }
    } else {
      switch (field.type) {
        case "number":
          yupSchemaPart = Yup.number(); // NUMBER
          break;
        case "checkbox":
          yupSchemaPart = Yup.boolean(); // BOOLEAN
          break;
        case "date":
          yupSchemaPart = Yup.date(); // DATE
          break;
      }
    }

    // ============ Required?
    if (field.required) {
      yupSchemaPart = yupSchemaPart.required();
    }

    // ============ Return
    return { ...schema, [field.name]: yupSchemaPart };
  }, {});

  return Yup.object().shape(schema);
};

export default createYupSchema;
