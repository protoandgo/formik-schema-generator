import * as yup from "yup";
import { schemaField, schemaFieldValidator } from "./types";


const genYupLvl3 = (options: [string, ...any[]][]) => {
  console.log("genYupLvl3");
  const index = options.findIndex((x) =>
    ["boolean", "date", "number", "object", "string"].includes(x[0])
  );
  if (index !== -1) options.splice(0, 0, options.splice(index, 1)[0]);
  let firstDone: boolean = index === -1;
  return options.reduce((part, option) => {
    console.log(part);
    const type: string = option[0];
    let params = [...option];
    params.shift();
    if (params.length > 0 && Array.isArray(params[0])) {
      params[0] = params[0].map((x) =>
        x.startsWith("field.") ? yup.ref(x.replace("field.", "")) : x
      );
    } // @ts-ignore
    if (part[type]) {
      // @ts-ignore
      part = part[type](...params);
      console.log(`OK n ${type}`);
    } // @ts-ignore
    else if (!firstDone && yup[type]) {
      // @ts-ignore
      part = yup[type](...params);
      firstDone = true;
      console.log(`OK 1 ${type}`);
    } else console.log(` X ${type}`);
    return part;
  }, {});
};


const genValidator = (
  validator: schemaFieldValidator,
  id: string,
  genYupLvl2Function: any,
  extraAlways?: [string, ...any[]][]
) => {
  let alwayys: [string, ...any[]][] | undefined;
  if (validator.always && extraAlways) alwayys = [...extraAlways, ...validator.always];
  else if (validator.always) alwayys = validator.always;
  else if (extraAlways) alwayys = extraAlways;
  else alwayys = undefined;
  if (id === "yourname") {
    console.log("validator.always");
    console.log(validator.always);
    console.log("extraAlways");
    console.log(extraAlways);
    console.log("alwayys");
    console.log(alwayys);
  }
  if (validator.when) 
    return validator.when.reduce((result, value) => {
      result = result.when(value.field === "this" ? id : value.field, {
        is: value.is,
        then: genYupLvl2Function(id, alwayys, value.then),
      });
      return result;
    }, yup.mixed());
  else if (alwayys) return genYupLvl3(alwayys);
  else return {};
};


const genYupLvl2 = (
  id: string,
  always?: [string, ...any[]][],
  then?: [string, ...any[]][] | schemaFieldValidator
) => {
  if (id === "yourname")
  {
    console.log("genYupLvl2 always");
    console.log(always);
  }
  if (then)
    if (Array.isArray(then))
      if (always) return genYupLvl3([...always, ...then]);
      else return genYupLvl3(then);
    else return genValidator(then, id, genYupLvl2, always);
  else if (always) return genYupLvl3(always);
  else return {};
};


export const GenerateYupSchema = (fields: schemaField[]) => {
  console.log("GenerateYupSchema");
  return yup.object().shape(
    fields.reduce((schema: any, field) => {
      const { validator, id } = field;
      if (validator)
        if (validator.when) schema[id] = genValidator(validator, id, genYupLvl2, []);
        else if (validator.always) schema[id] = genYupLvl2(id, validator.always);
      if (id === "yourname") {
        console.log("SCHEMA");
        console.log(schema);
      }
      return schema;
    }, {})
  );
};
