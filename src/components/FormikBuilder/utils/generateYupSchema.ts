import * as yup from "yup";
import { schemaField, schemaFieldValidator } from "./types";

export const genYupLvl2 = (options: any[][]) => {
  //console.log("genYupLvl2");
  return options.reduce((part, option) => {
    const type: string = option[0];
    let params = [...option];
    params.shift();
    if (Array.isArray(params[1])) // oneOf
    params[1] = params[1].map(x => typeof x === "string" && x.startsWith("field.")
        ? yup.ref(x.replace("field.", ""))
        : x);
    // @ts-ignore
    if (part[type]) {
      console.log(`OK ${type}`);
      // @ts-ignore
      part = part[type](...params);
    }// @ts-ignore
    else if (yup[type]) {
      console.log(`OK ${type}`);
      // @ts-ignore
      part = yup[type](...params);
    }
    else {
      console.log(` X ${type}`);
    }
    // console.log(part);
    return part;
  }, {});
}
// EXAMPLE ARGS:
// const options = [
//   ["required", "tranlationId"],
//   ["string", "Age must be a string"]
// ]
// GenerateThenOrOtherwise(options);

export const genYupLvl3 = (validator: schemaFieldValidator, fieldId: string) => {
  
  // if (validator.hasOwnProperty("validateAt")) return validator;

  let result: any;
  if (validator.always) result = genYupLvl2(validator.always);


  validator.when?.reduce((result, value) => {
    result = yup.mixed().when(value.field === 'this' ? fieldId : value.field, {
      is: value.is,// @ts-ignore
      then: genYupLvl2(value.then),// @ts-ignore
      // otherwise: genYupLvl2(value.otherwise),
    })
    return result;
  }, result)

}
// EXAMPLE ARGS:
// const validator = {
//   when: ['name', {
//       is: 'demo',
//       then: [
//           ["required", "tranlationId"],
//           ["string", "Age must be a string"]
//       ],
//       otherwise: [
//           ["string", "Age must be a string"]
//       ]
//   }]
// }
// genYupLvl3(validator);


export const GenerateYupSchema = (fields: schemaField[]) => {
  console.log("GenerateYupSchema");
  return yup.object().shape(fields.reduce((schema: any, field) => {
    if (field.validator) schema[field.id] = genYupLvl3(field.validator, field.id);
    return schema;
  }, {}))
}
// EXAMPLE ARGS:
// const fields = [
//   {
//       id: "name",
//       type: "text",
//       required: true,
//   },
//   {
//       id: "age",
//       type: "number",
//       visible: "values.name === 'demo'",
//       validator: {
//           when: ['name', {
//               is: 'demo',
//               then: [
//                   ["required", "tranlationId"],
//                   ["string", "Age must be a string"]
//               ],
//               otherwise: [
//                   ["string", "Age must be a string"]
//               ]
//           }]
//       }
//   }
// ]
// GenerateYupSchema(fields);