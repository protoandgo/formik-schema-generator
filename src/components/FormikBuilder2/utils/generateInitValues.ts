import { schemaField } from "./types";

export const GenerateInitValues = (schemaFields: schemaField[], initialValues?: any) => {
  if (!initialValues) initialValues = {};
  schemaFields.forEach((field) => {
    if (field.type === "array") {
      initialValues[field.name] = GenerateInitValues(field.fields, []);
    } else if (initialValues[field.name] === undefined) {
      if (["text", "email", "password", "phone", "textarea"].includes(field.type))
        initialValues[field.name] = "";
      else
        switch (field.type) {
          case "number":
            initialValues[field.name] = 0;
            break;
          case "checkbox":
            initialValues[field.name] = false;
            break;
          // case "date":
          //   initialValuesEmpty[field.name] = moment().toISOString();
          //   break;
          case "select":
            initialValues[field.name] = field.options[0];
            break;
        }
    }
  });
  return initialValues;
};
