import * as Yup from "yup";
import { schemaField, schemaFieldString } from "./typesOld";

// https://stackoverflow.com/questions/57928271/create-yup-nested-object-schema-dynamically

type YupSchema = any
  // | Yup.MixedSchema<any, AnyObject, any>
  // | Yup.ArraySchema<Yup.ObjectSchema<ObjectShape>>
  // | Yup.StringSchema
  // | Yup.NumberSchema
  // | Yup.BooleanSchema
  // | Yup.DateSchema;

export const GenerateYupSchema = (fields: schemaField[], beforeName?: string) => {
  console.log("GenerateYupSchema");
  // Map through each field to build a Yup validation schema
  const schema: any = fields.reduce((schema, field) => {

    // <-------------------- ANY
    let yupSchemaPart: YupSchema = Yup.string();

    // ============ Type?
    // ------------------------ types.ts ======= schemaFieldString ------------------------
    // if (field.type === ("text" || "email" || "phone" || "textarea" || "password")) {
    if (["text", "email", "phone", "textarea", "password"].includes(field.type)) {
      const fieldd = field as schemaFieldString;
      yupSchemaPart = Yup.string();
      if (fieldd.min) {
        yupSchemaPart = yupSchemaPart.min(
          fieldd.min,
          fieldd.valueTooShortMessage
        );
      }
      if (fieldd.max) {
        yupSchemaPart = yupSchemaPart.max(
          fieldd.max,
          fieldd.valueTooLongMessage
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
            fieldd.invalidFormatMessage
          ); // EMAIL
          break;

        // ------------------------ ADDITIONAL VALIDATION ======= PHONE ------------------------
        case "phone":
          yupSchemaPart = yupSchemaPart.matches(
            // regexp: https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
            fieldd.invalidFormatMessage // PHONE
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
            field.valueTooLowMessage
          );
        }
        if (field.max) {
          yupSchemaPart = yupSchemaPart.max(
            field.max,
            field.valueTooHighMessage
          );
        }
        break;

      case "passwordconfirm":
        yupSchemaPart = Yup.string(); // STRING
        yupSchemaPart = yupSchemaPart.oneOf([Yup.ref(field.passwordFieldName), null], ""); // PASSWORD CONFIRM
        break;

      case "array":
        yupSchemaPart = Yup.array().of(GenerateYupSchema(field.fields, "field"));
        break;
    }

    // ============ Required?
    if (field.required) {
      yupSchemaPart = yupSchemaPart.required(
        field.requiredMessage
      );
    }

    // const fullName = (beforeName || "") + field.name;
    // Dont validate if not visible or not enabled
    // yupSchemaPart = Yup.mixed().when([`isVisible_${field.name}`, `isEnabled_${field.name}`], {
    //   is: (visible: boolean, enabled: boolean) => visible && enabled,
    //   then: yupSchemaPart
    // });
    // Los campos que NO son anidados, los valida solo si son visibles. Los que sí están anidados no se como validarlos por separado...
    if (beforeName === "") yupSchemaPart = Yup.mixed().when(`validate_${field.name}`, {
      is: true,
      then: yupSchemaPart
    });

    // ============ Return
    return { ...schema, [field.name]: yupSchemaPart };
  }, {});

  return Yup.object().shape(schema);
};
