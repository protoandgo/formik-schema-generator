import * as Yup from "yup";
import { ObjectShape } from "yup/lib/object";
import defaultErrorMessages from "./defaultErrorMessages";
import { schemaField, schemaFieldString } from "./types";

// https://stackoverflow.com/questions/57928271/create-yup-nested-object-schema-dynamically

type YupSchema =
  | Yup.ArraySchema<Yup.ObjectSchema<ObjectShape>>
  | Yup.StringSchema
  | Yup.NumberSchema
  | Yup.BooleanSchema
  | Yup.DateSchema;

export const GenerateYupSchema = (fields: schemaField[]) => {
  // Map through each field to build a Yup validation schema
  const schema: any = fields.reduce((schema, field) => {
    // <-------------------- ANY
    let yupSchemaPart: YupSchema = Yup.string();

    // ============ Type?
    const invalidFormatMsg = defaultErrorMessages.invalidFormat(field.type);

    // ------------------------ types.ts ======= schemaFieldString ------------------------
    // if (field.type === ("text" || "email" || "phone" || "textarea" || "password")) {
    if (["text", "email", "phone", "textarea", "password"].includes(field.type)) {
      const fieldd = field as schemaFieldString;
      yupSchemaPart = Yup.string();
      if (fieldd.min) {
        yupSchemaPart = yupSchemaPart.min(
          fieldd.min,
          fieldd.valueTooShortMessage || defaultErrorMessages.stringTooShort(fieldd.min)
        );
      }
      if (fieldd.max) {
        yupSchemaPart = yupSchemaPart.max(
          fieldd.max,
          fieldd.valueTooLongMessage || defaultErrorMessages.stringTooLong(fieldd.max)
        );
      }
      if (fieldd.regexp) {
        yupSchemaPart = yupSchemaPart.matches(fieldd.regexp);
        // TODO regexp error message
      }
      switch (field.type) {
        // ------------------------ ADDITIONAL VALIDATION ======= EMAIL ------------------------
        case "email":
          yupSchemaPart = yupSchemaPart.email(
            fieldd.invalidFormatMessage || invalidFormatMsg
          ); // EMAIL
          break;

        // ------------------------ ADDITIONAL VALIDATION ======= PHONE ------------------------
        case "phone":
          yupSchemaPart = yupSchemaPart.matches(
            // regexp: https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
            fieldd.invalidFormatMessage || invalidFormatMsg // PHONE
          );
          break;
      }
    }
    switch (field.type) {
      case "number":
        yupSchemaPart = Yup.number(); // NUMBER
        if (field.min) {
          yupSchemaPart = yupSchemaPart.min(
            field.min,
            field.valueTooLowMessage || defaultErrorMessages.numberTooLow(field.min)
          );
        }
        if (field.max) {
          yupSchemaPart = yupSchemaPart.max(
            field.max,
            field.valueTooHighMessage || defaultErrorMessages.numberTooHigh(field.max)
          );
        }
        break;

      case "passwordconfirm":
        yupSchemaPart = Yup.string(); // STRING
        yupSchemaPart = yupSchemaPart.oneOf([Yup.ref(field.passwordFieldName), null], ""); // PASSWORD CONFIRM
        break;

      case "array":
        yupSchemaPart = Yup.array().of(GenerateYupSchema(field.fields));
        break;
    }

    // ============ Required?
    if (field.required) {
      yupSchemaPart = yupSchemaPart.required(
        field.requiredMessage || defaultErrorMessages.required
      );
    }

    // ============ Return
    return { ...schema, [field.name]: yupSchemaPart };
  }, {});

  return Yup.object().shape(schema);
};
