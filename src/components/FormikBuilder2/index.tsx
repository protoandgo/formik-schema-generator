// React
import React from "react";
// Formik
import { Formik, Field, Form, FieldArray, FormikProps } from "formik";
// Types
import { schema, schemaField } from "./utils/types";
// Components prepared for different UI Libraries
import {
  ArrayInput,
  FieldComponent,
  FormTitle,
  possibleUis,
  SubmitButton,
} from "./components";
// Generators
import { GenerateYupSchema } from "./utils/generateYupSchema";
import { GenerateInitValues } from "./utils/generateInitValues";
import { GenerateVisibilityConditions } from "./utils/generateVisibilityConditions";
// Style
import "./index.css";

export const RenderField = (
  formikContext: FormikProps<any>,
  visibilityConditions: { [x: string]: Function },
  ui: possibleUis,
  x: schemaField,
  i: number,
  beforeName: string
) => {
  const fullName = beforeName + x.name;

  if (x.type === "array") {
    const example: any = {};
    x.fields.forEach((xx, ii) => {
      example[xx.name] = "";
    });
    return (
      <div className="fieldd" key={fullName}>
        <FieldArray
          name={fullName}
          render={({ insert, remove, push }) => {
            const arrayElements = formikContext.values[fullName]
              ? formikContext.values[fullName].map((xx: any, ii: any) =>
                  x.fields.map((xxx, iii) => {
                    return RenderField(
                      formikContext,
                      visibilityConditions,
                      ui,
                      xxx,
                      iii,
                      `${fullName}[${ii}].`
                    );
                  })
                )
              : [];
            return (
              <ArrayInput
                ui={ui}
                onAdd={() => push(example)}
                arrayElements={arrayElements}
                remove={remove}
                x={x}
              />
            );
          }}
        />
      </div>
    );
  } else {
    const fieldProps = {
      name: fullName,
      fieldInfo: x, // label, options si es un select, etc
      field: formikContext.getFieldProps(fullName),
      meta: formikContext.getFieldMeta(fullName),
      helpers: formikContext.getFieldHelpers(fullName),
      setFieldValue: formikContext.setFieldValue,
      ui: ui,
    };
    return (
      <div className="fieldd" key={fullName}>
        <Field {...fieldProps} component={FieldComponent} onChange={null} />
      </div>
    );
  }
};

const FormikBuilder = ({
  schema,
  initialValues,
  ui,
}: {
  schema: schema;
  initialValues?: any;
  ui: possibleUis;
}) => {
  const visibilityConditions = GenerateVisibilityConditions(schema.fields);
  return (
    <React.Fragment>
      <FormTitle ui={ui} text={schema.title} {...ui} />
      <Formik
        initialValues={GenerateInitValues(schema.fields, initialValues)}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));

          console.log(values);
          alert(JSON.stringify(values, null, 2));
        }}
        validationSchema={GenerateYupSchema(schema.fields)}
      >
        {(formikContext) => (
          <Form>
            {schema.fields.map((x, i) => {
              return RenderField(formikContext, visibilityConditions, ui, x, i, "");
            })}
            <SubmitButton ui={ui} text={schema.submitButtonText} />
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default FormikBuilder;

// ============================================ USAGE EXAMPLE:

export const FormikBuilderExample = () => {
  const schema: schema = {
    title: "Invite Friends",
    submitButtonText: "Invite",
    fields: [
      {
        name: "dias",
        type: "number",
      },
      {
        label: "Your phone",
        name: "phone",
        type: "phone",
      },
      {
        name: "yourname",
        label: "Your Name",
        type: "text",
        required: true,
        min: 4,
      },
      {
        name: "friends",
        label: "Friends",
        type: "array",
        fields: [
          {
            name: "name",
            label: "Name",
            type: "text",
          },
          {
            name: "email",
            label: "Email",
            type: "email",
          },
        ],
      },
    ],
  };
  return (
    <FormikBuilder
      schema={schema}
      initialValues={{
        yourname: "ha",
        // friends: [
        //   {
        //     name: "Hola",
        //     email: ""
        //   }
        // ]
      }}
      ui="antd"
    />
  );
};