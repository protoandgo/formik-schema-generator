import { schemaField } from "./types";

export const GenerateInitValues = (schemaFields: schemaField[], initialValues?: any) => {
  if (!initialValues) initialValues = {};
  schemaFields.forEach((field) => {
    if (field.type === "array" && field.fields) {
      initialValues[field.id] = GenerateInitValues(field.fields, []);
    } else if (initialValues[field.id] === undefined) {
      if (["text", "email", "password", "phone", "textarea"].includes(field.type))
        initialValues[field.id] = "";
      else
        switch (field.type) {
          case "number":
            initialValues[field.id] = 0;
            break;
          case "checkbox":
            initialValues[field.id] = false;
            break;
          // case "date":
          //   initialValuesEmpty[field.id] = moment().toISOString();
          //   break;
          case "select":
            if (field.options) initialValues[field.id] = field.options[0];
            break;
        }
    }
  });
  return initialValues;
};
