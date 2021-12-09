import moment from "moment";
import { schemaField } from "./types";

export const GenerateInitValues = (schemaFields: schemaField[], initialValues?: any) => {
  if (!initialValues) initialValues = {};
  schemaFields.forEach((field) => {
    if (field.type === "array" && field.fields) {
      initialValues[field.id] = GenerateInitValues(field.fields, []);
    } else if (initialValues[field.id] === undefined) {
        switch (field.type) {
          case "text":
          case "password":
          case "textarea":
            initialValues[field.id] = "";
            break;
          case "number":
            initialValues[field.id] = 0;
            break;
          case "checkbox":
            initialValues[field.id] = false;
            break;
          // case "date":
          //   initialValues[field.id] = moment().toISOString(); <--- da error "date.clone is not a function"
          //   break;
          case "select":
            initialValues[field.id] = field.options ? field.options[0] : "";
            break;
          case "array":
          case "addinput":
            initialValues[field.id] = [];
            break;
        }
    }
  });
  return initialValues;
};
