import { schemaField } from "./types";

const CreateCondition = (writtenCondition: string | undefined): Function => {
  console.log("CreateCondition");
  // eslint-disable-next-line no-new-func
  return new Function("values", `return ${writtenCondition || "true"};`);
  // return new Function("values", writtenCondition ? `return "${writtenCondition}";` : "return true;");
};

export const GenerateConditionsFor = (
  forWhat: "visible" | "enabled",
  fields: schemaField[],
  beforeName?: string,
) : { [x: string]: Function } => {
  console.log("Generating conditions");
  let condition: { [x: string]: Function } = {};
  fields.forEach(x => {
    const fullName = (beforeName || "") + x.id;
    if (forWhat === 'visible' && x.visibleCondition) {
      console.log("generate visibility condition " + x.visibleCondition)
      condition[fullName] = CreateCondition(x.visibleCondition);
      // console.log("Created visibility  condition for " + fullName);
    }
    else if (forWhat === 'enabled' && x.enabledCondition) {
      console.log("generate enabled condition " + x.enabledCondition)
      condition[fullName] = CreateCondition(x.enabledCondition);
    }
    if (x.type === "array" && x.fields) {
      const arrayFieldsVisible = GenerateConditionsFor(forWhat, x.fields, fullName);
      condition = {...condition, ...arrayFieldsVisible};
    }
  })
  return condition;
}