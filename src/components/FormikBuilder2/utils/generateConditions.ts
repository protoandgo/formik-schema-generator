import { schemaField } from "./types";

const CreateCondition = (writtenCondition: string | undefined): Function => {
  console.log("CreateCondition");
  // eslint-disable-next-line no-new-func
  return new Function("values", `return ${writtenCondition || "true"};`);
};

type TypeOfCondition = "visible" | "enabled";
export const GenerateConditionsFor = (
  forWhat: TypeOfCondition,
  fields: schemaField[],
  beforeName?: string,
) : { [x: string]: Function } => {
  console.log("Generating conditions");
  let condition: { [x: string]: Function } = {};
  fields.forEach(x => {
    const fullName = (beforeName || "") + x.id;
    if (forWhat === 'visible' && x.visible) condition[fullName] = CreateCondition(x.visible);
    else if (forWhat === 'enabled' && x.enabled) condition[fullName] = CreateCondition(x.enabled);
    if (x.type === "array" && x.fields) {
      const arrayFieldsVisible = GenerateConditionsFor(forWhat, x.fields, fullName);
      condition = {...condition, ...arrayFieldsVisible}; // Object.assign ??
    }
  })
  return condition;
}

// export const GenerateVisibilityConditions = (
//   fields: schemaField[],
//   beforeName?: string,
// ): { [x: string]: Function } => {
//   let visible: { [x: string]: Function } = {};
//   fields.forEach(x => {
//     const fullName = (beforeName || "") + x.id;
//     if (x.visible) visible[fullName] = CreateCondition(x.visible);
//     if (x.type === "array") {
//       const arrayFieldsVisible = GenerateVisibilityConditions(x.fields, fullName);
//       visible = {...visible, ...arrayFieldsVisible}; // Object.assign ??
//     }
//   })
//   return visible;
// };