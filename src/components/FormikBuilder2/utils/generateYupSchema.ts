// @ts-ignore
import * as yup from "yup";
import { schemaField, schemaFieldValidator } from "./types";

// const genYupLvl1 = (validator: string[], part: any) => {
//   console.log("genYupLvl1");
// // let yupp;
//   // return validator.reduce((yupp, validation) => {
//     const type: string = validator[0];
//     const params = [...validator];
//     params.shift();
// // @ts-ignore
//     if (part ? part[type] : yup[type]) {
//       console.log(`OK ${type}`);// @ts-ignore
//       part = part ? part[type](...params) : yup[type](...params);
//     }
//     else {
//       console.log(` X ${type}`);
//       console.log(part);
//     }
//     return part;
//   // }, part);
// }
// // EXAMPLE ARGS:
// // const validator = ["required", "tranlationId"];
// // const part = yup.string()     OR     yup.array().of(......)     OR     null
// // genYupLvl1(validator, part);


export const genYupLvl2 = (options: string[][]) => {
  console.log("genYupLvl2");
  return options.reduce((part, option) => {



    const type: string = option[0];
    const params = [...option];
    params.shift();
// @ts-ignore
    if (part[type]) {
      console.log(`OK ${type}`);// @ts-ignore
      part = part[type](...params);
    }// @ts-ignore
    else if (yup[type]) {
      console.log(`OK ${type}`);// @ts-ignore
      part = yup[type](...params);
    }
    else {
      console.log(` X ${type}`);
    }
    console.log(part);
    return part;










    // // let part;
    // // if (option.fields) {
    // //   part = yup.array().of(genYupLvl2(option.fields));
    // // }
    // // if (option.validator) {
    //   part = genYupLvl1(option, part);
    // // }
    // return part;// ? { ...schema, [option.id]: part } : schema;
  }, {});
}
// EXAMPLE ARGS:
// const options = [
//   ["required", "tranlationId"],
//   ["string", "Age must be a string"]
// ]
// GenerateThenOrOtherwise(options);


export const genYupLvl3 = (validator: schemaFieldValidator) => {
  console.log("genYupLvl3");
  return Object.entries(validator).reduce((result, [key, value]) => {
    if (key === 'when') {
      result = yup.mixed().when(value[0], {
        is: value[1].is,// @ts-ignore
        then: genYupLvl2(value[1].then),// @ts-ignore
        otherwise: genYupLvl2(value[1].otherwise),
      })
    }
    // TODO else
    return result;
  }, {})
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
    if (field.validator) schema[field.id] = genYupLvl3(field.validator);
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