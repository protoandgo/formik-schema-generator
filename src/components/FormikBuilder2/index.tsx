import React from "react";
import { Formik, Field, Form, FieldArray, FormikProps } from "formik";
import { schema, schemaField } from "./utils/types";
import { ArrayInput, TextInput, FormTitle, SubmitButton, NumberInput, CheckboxInput, DateInput, SelectInput, TextAreaInput, AddInput } from "./components/antd";
import { GenerateYupSchema } from "./utils/generateYupSchema";
import { GenerateInitValues } from "./utils/generateInitValues";
import "./index.css";
import { GenerateVisibilityConditions } from "./utils/generateVisibilityConditions";

const inputComponents: { [x: string]: { [x: string]: (props: any) => JSX.Element } } = {
  antd: {
    text: TextInput,
    email: TextInput,
    number: NumberInput,
    checkbox: CheckboxInput,
    date: DateInput,
    select: SelectInput,
    textarea: TextAreaInput,
    addinput: AddInput,
  },
};

// const CreateCondition = (writtenCondition: string | undefined): Function => {
//   console.log("CreateCondition");
//   // eslint-disable-next-line no-new-func
//   return new Function("values", `return ${writtenCondition || "true"};`);
// };

export const RenderField = (
  formikContext: FormikProps<any>,
  visibilityConditions: { [x: string]: Function },
  x: schemaField,
  i: number,
  beforeName: string
) => {
  const fullName = beforeName + x.name;

  

  // console.log(fullName);
  // console.log(formikContext.values[fullName]); //<------------ SYNTHETIC BASE EVENT ???????????

  // return (<div className="fieldd" key={fullName}>

  // </div>

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
                  x.fields.map((xxx, iii) =>
                    {
                      // const VisibleCondition: Function = CreateCondition(xxx.visible);
                    
                      // if (!VisibleCondition(formikContext.values)) return <React.Fragment></React.Fragment>;
                      // else 
                      return RenderField(formikContext, visibilityConditions, xxx, iii, `${fullName}[${ii}].`)}
                  )
                )
              : [];
            return ArrayInput(arrayElements, () => push(example), remove, x);
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
    };
    return (
      <div className="fieldd" key={fullName}>
        <Field
          {...fieldProps}
          component={inputComponents["antd"][x.type]}
          onChange={null}
        />
      </div>
    );
  }
};

const FormikBuilder = ({
  schema,
  initialValues,
}: {
  schema: schema;
  initialValues?: any;
}) => {
  const visibilityConditions = GenerateVisibilityConditions(schema.fields);
  return (
  <React.Fragment>
    <FormTitle text={schema.title} />
    <Formik
      initialValues={GenerateInitValues(schema.fields, initialValues)}
      // initialValues={initialValues || {}}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));

        console.log(values);
        alert(JSON.stringify(values, null, 2));
      }}
      validationSchema={GenerateYupSchema(schema.fields)}
    >
      {(formikContext) => (
        <Form>
          {/* {ArrayField(formikContext, x, "", undefined)} */}
          {schema.fields.map((x, i) => {
            return RenderField(formikContext, visibilityConditions, x, i, "");
          })}
          <SubmitButton text={schema.submitButtonText} />
        </Form>
      )}
    </Formik>
  </React.Fragment>
)};

const FormikBuilderExample = () => {
  const schema: schema = {
    title: "Invite Friends",
    submitButtonText: "Invite",
    fields: [
      {
        name: 'addaninput',
        type: 'addinput'
      },
      {
        name: 'areatexto',
        type: 'textarea',
      },
      {
        name: 'seleccion',
        type: 'select',
        options: {
          'value': 'string',
          'value2': 'string2',
          'value3': 'string3'
        }
      },
      {
        name: 'fecha',
        type: 'date'
      },
      {
        name: 'otracosa',
        type: 'checkbox'
      },
      {
        name: "loquesea",
        type: "number"
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
      initialValues={
        {
          yourname: "ha",
          // friends: [
          //   {
          //     name: "Hola",
          //     email: ""
          //   }
          // ]
        }
      }
    />
  );
};

export default FormikBuilderExample;
