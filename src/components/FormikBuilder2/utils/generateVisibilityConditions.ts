import { schemaField } from "./types";

const CreateCondition = (writtenCondition: string | undefined): Function => {
  console.log("CreateCondition");
  // eslint-disable-next-line no-new-func
  return new Function("values", `return ${writtenCondition || "true"};`);
};

export const GenerateVisibilityConditions = (
  fields: schemaField[],
  beforeName?: string,
): { [x: string]: Function } => {
  let visible: { [x: string]: Function } = {};
  fields.forEach(x => {
    const fullName = (beforeName || "") + x.name;
    if (x.visible) visible[fullName] = CreateCondition(x.visible);
    if (x.type === "array") {
      const arrayFieldsVisible = GenerateVisibilityConditions(x.fields, fullName);
      visible = {...visible, ...arrayFieldsVisible}; // Object.assign ??
    }
  })
  return visible;
};