import * as Yup from "yup";
import { FieldSchema } from "./types";
import defaultErrorMessages from "./defaultErrorMessages";
import { ObjectShape } from "yup/lib/object";

// https://stackoverflow.com/questions/57928271/create-yup-nested-object-schema-dynamically

type YupSchema = Yup.ArraySchema<Yup.ObjectSchema<ObjectShape>> | Yup.StringSchema | Yup.NumberSchema | Yup.BooleanSchema | Yup.DateSchema;

const createYupSchema = (fields: FieldSchema[]) => {

  // Map through each field to build a Yup validation schema
  const schema: any = fields.reduce((schema, field) => { // <-------------------- ANY
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
          // TODO https://newbedev.com/how-do-i-validate-if-a-start-date-is-after-an-end-date-with-yup
          yupSchemaPart = Yup.date(); // DATE
          break;
        case "box":
          // let obj: {[x:string]:any} = {}
          // const obj = ; //field.fields.reduce( (obj, field) => { return field } );
          // yupSchemaPart = Yup.array().of( Yup.object().shape(createYupSchema(field.fields)));
          yupSchemaPart = Yup.array().of(createYupSchema(field.fields));
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
