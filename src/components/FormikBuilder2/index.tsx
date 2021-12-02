// React
import React, { useState } from "react";
// Formik
import { Formik, Field, Form, FieldArray, FormikProps, FormikConsumer } from "formik";
// Types
import { schema, schemaField } from "./utils/types";
// Generators
import { GenerateYupSchema } from "./utils/generateYupSchema";
import { GenerateInitValues } from "./utils/generateInitValues";
import { GenerateConditionsFor } from "./utils/generateConditions";
// Style
import "./index.css";

type Components = { [x: string]: (...props: any) => JSX.Element };

type GeneralData = {
  formikContext: FormikProps<any>;
  visibilityConditions: { [x: string]: Function };
  enabledConditions: { [x: string]: Function };
};

export const RenderField = (
  // enabled: boolean,
  // formikContext: FormikProps<any>,
  // visibilityConditions: { [x: string]: Function },
  // ui: possibleUis,
  fieldd: schemaField,
  // index: number,
  beforeName: string,
  generalData: GeneralData,
  components: Components,
  regenerateYup: () => void,
) => {
  const fullName = beforeName + fieldd.id;
  const { formikContext, visibilityConditions, enabledConditions } = generalData;

  const setValidate = (values: any, beforeName?: string) => {
    Object.entries/*Array.isArray(values) ? values : */ (values)
      .forEach(([key, value], i) => {
        if (!key.startsWith("validate_")) {
          // if (Array.isArray(value)) {
          //   setValidate(value, `${beforeName + key}[i]`)
          // }
          // else {
          formikContext.setFieldValue(
            `validate_${beforeName + key}`,
            visibilityConditions[key]
              ? visibilityConditions[key](formikContext.values)
              : true && enabledConditions[key]
              ? enabledConditions[key](formikContext.values)
              : true
          );
          // }
        }
      });
  };

  const checkIfValuesShouldBeValidated = () => {
    setValidate(formikContext.values, "");
    // // DONT VALIDATE IF NOT VISIBLE:
    // Object.entries(visibilityConditions).forEach(([key, value], i) => {
    //   formikContext.setFieldValue(`isVisible_${key}`, value(formikContext.values))
    // })
    // // DONT VALIDATE IF NOT ENABLED:
    // Object.entries(enabledConditions).forEach(([key, value], i) => {
    //   formikContext.setFieldValue(`isEnabled_${key}`, value(formikContext.values))
    // })
    // DONT VALIDATE IF NOT ENABLED:
    let beforeName = "";
    // Object.entries(formikContext.values).forEach(([key, value], i) => {
    //   if (!key.startsWith("validate_")) {
    //     if (Array.isArray(value)) {

    //     }
    //     else {
    //       formikContext.setFieldValue(`validate_${beforeName + key}`,
    //       visibilityConditions[key] ? visibilityConditions[key](formikContext.values) : true &&
    //       enabledConditions[key] ? enabledConditions[key](formikContext.values) : true)
    //     }
    //   }
    // })
  };

  // console.log(visibilityConditions);
  if (
    visibilityConditions[fullName] &&
    !visibilityConditions[fullName](formikContext.values)
  )
    return <span>INVISIBLEEE</span>;

  const enabled =
    !enabledConditions[fullName] || enabledConditions[fullName](formikContext.values);

  if (fieldd.type === "array" && fieldd.fields) {
    // const example: any = {};
    // fieldd.fields.forEach((xx, ii) => {
    //   example[xx.name] = "";
    // });
    const example = GenerateInitValues(fieldd.fields);
    // TODO array can also be disabled entirely
    return (
      <div className="fieldd" key={fullName}>
        <FieldArray
          name={fullName}
          render={({ insert, remove, push }) => {
            const arrayElements = formikContext.values[fullName]
              ? formikContext.values[fullName].map((xx: any, ii: any) =>
                  fieldd.fields?.map((subfieldd, subindex) => {
                    return RenderField(
                      // enabled,
                      // formikContext,
                      // visibilityConditions,
                      // ui,
                      subfieldd,
                      // subindex,
                      `${fullName}[${ii}].`,
                      generalData,
                      components,
                      regenerateYup,
                    );
                  })
                )
              : [];
            return (
              <components.ArrayInput
                onAdd={() => push(example)}
                arrayElements={arrayElements}
                remove={remove}
                x={fieldd}
              />
            );
          }}
        />
      </div>
    );
  } else {
    const fieldProps = {
      enabled,
      name: fullName,
      fieldInfo: fieldd, // label, options si es un select, etc
      field: formikContext.getFieldProps(fullName),
      meta: formikContext.getFieldMeta(fullName),
      helpers: formikContext.getFieldHelpers(fullName),
      setFieldValue: formikContext.setFieldValue,
      // visible: !visibilityConditions[fullName] || visibilityConditions[fullName](formikContext.values),
      // enabled: !enabledConditions[fullName] || enabledConditions[fullName](formikContext.values),
      // components: components,
      inputProps: {
        onBlur: regenerateYup,
        // onBlur: () => {
        //   // DONT VALIDATE IF NOT VISIBLE:
        //   Object.entries(visibilityConditions).forEach(([key, value], i) => {
        //     formikContext.setFieldValue(`isVisible_${key}`, value(formikContext.values))
        //   })
        //   // DONT VALIDATE IF NOT ENABLED:
        //   Object.entries(enabledConditions).forEach(([key, value], i) => {
        //     formikContext.setFieldValue(`isEnabled_${key}`, value(formikContext.values))
        //   })
        //   // DONT VALIDATE IF NOT ENABLED:
        //   // Object.keys(formikContext.values).forEach((fullNamee, i) => {
        //   //   if (!fullNamee.startsWith("validate_"))
        //   //   formikContext.setFieldValue(`validate_${fullNamee}`,
        //   //     visibilityConditions[fullNamee] ? visibilityConditions[fullNamee](formikContext.values) : true &&
        //   //     enabledConditions[fullNamee] ? enabledConditions[fullNamee](formikContext.values) : true)
        //   // })
        // }
      },
    };
    return (
      <div className="fieldd" key={fullName}>
        <Field
          {...fieldProps}
          component={
            components[fieldd.type] ||
            ((props: any) => (
              <span>No component given for field of type {fieldd.type}</span>
            ))
          }
          onChange={null}
        />
      </div>
    );
  }
};

const FormikBuilder = ({
  schema,
  initialValues,
  // ui,
  components,
}: {
  schema: schema;
  initialValues?: any;
  // ui: possibleUis;
  components: Components;
}) => {
  const visibilityConditions = GenerateConditionsFor("visible", schema.fields || []);
  const enabledConditions = GenerateConditionsFor("enabled", schema.fields || []);
  const [validationSchema, setValidationSchema] = useState(GenerateYupSchema(schema.fields));
  return (
    <React.Fragment>
      <components.FormTitle text={schema.title} />
      <Formik
        initialValues={GenerateInitValues(schema.fields, initialValues)}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));

          console.log(values);
          // dont send hidden values & dont send non-validated values
          let result: any = {...values};
          // For each value...
          // Object.entries(values).forEach(([key, value]) => {
          //   // The value will be part of the final result of the form if:
          //   if (
          //     // It is not a hidden validation field
          //     !key.startsWith("validate_")
          //     // And
          //     &&
          //     // There's a hidden validation field that says that this field should be validated
          //     Object.entries(values).find(([keyy, valuee]) => valuee === true && keyy === `validate_${key}`)
          //     )
          //       result[key] = value;
          //   });

            Object.entries(visibilityConditions).forEach(([fieldName, visible]) => {
              if (!visible(values)) delete result[fieldName];
            })
          
          // alert(JSON.stringify(values, null, 2));
          alert(JSON.stringify(result, null, 2));
        }}
        validationSchema={validationSchema}
      >
        {(formikContext) => {
          const persistent: GeneralData = {
            formikContext: formikContext,
            visibilityConditions: visibilityConditions,
            enabledConditions: enabledConditions,
          };
          return (
            <Form>
              {schema.fields.map((x: schemaField, i: any) => {
                return RenderField(x, "", persistent, components, () => { setValidationSchema(GenerateYupSchema(schema.fields)) });
              })}
              <components.SubmitButton text={schema.submitButtonText} />
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default FormikBuilder;
