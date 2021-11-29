import React from "react";
import { Formik, Field, Form, FieldArray, FormikProps } from "formik";
import { schema, schemaField } from "./utils/types";
import './index.css';
import CreateYupSchema from "./utils/yupSchemaBuilder";
import { ArrayInput, TextInput, FormTitle, SubmitButton } from "./components/antd";

const inputComponents: { [x: string]: { [x: string]: (props: any) => JSX.Element } } = {
  "antd": {
    "text": TextInput,
    "email": TextInput,
  }
};

export const RenderField = (
  formikContext: FormikProps<any>,
  x: schemaField,
  i: number,
  beforeName: string) => {

  const fullName = beforeName + x.name;
  // console.log(fullName);

  // return (<div className="fieldd" key={fullName}>

  // </div>

  if (x.type === "array") {
    const example: any = {};
    x.fields.forEach((xx, ii) => {
      example[xx.name] = '';
    });

    console.log(formikContext.values[fullName]);

    return (<div className="fieldd" key={fullName}>
      <FieldArray
        name={fullName}
      >
        {({ insert, remove, push }) =>

          ArrayInput(formikContext.values[fullName]
            ? formikContext.values[fullName].map((xx: any, ii: any) =>
              x.fields.map((xxx, iii) => (
                RenderField(formikContext, xxx, iii, `${fullName}[${ii}].`)
              ))
            ) :
            [], push, remove, x)
        }
      </FieldArray>
    </div>);

  }
  else {
    const fieldProps = {
      name: fullName,
      fieldInfo: x, // label, options si es un select, etc
      field: formikContext.getFieldProps(fullName),
      meta: formikContext.getFieldMeta(fullName),
      helpers: formikContext.getFieldHelpers(fullName),
      setFieldValue: formikContext.setFieldValue,
    }
    return (<div className="fieldd" key={fullName}>
      <Field
        {...fieldProps}
        component={inputComponents["antd"][x.type]}
        onChange={null}
      />
    </div>);
  }
}

const FormikBuilder = ({ schema, initialValues }: { schema: schema, initialValues: any }) => (
  <React.Fragment>
    <FormTitle text={schema.title} />
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        console.log(values);
        alert(JSON.stringify(values, null, 2));
      }}
      validationSchema={CreateYupSchema(schema.fields)}
    >
      {(formikContext) => (
        <Form>
          {/* {ArrayField(formikContext, x, "", undefined)} */}
          {schema.fields.map((x, i) => {
            return RenderField(formikContext, x, i, "");
          })}
          <SubmitButton text={schema.submitButtonText} />
        </Form>
      )}
    </Formik>
  </React.Fragment>
);

const FormikBuilderExample = () => {
  const schema: schema = {
    title: "Invite Friends",
    submitButtonText: "Invite",
    fields: [{
      name: "yourname",
      label: "Your Name",
      type: "text",
      required: true
    }, {
      name: "friends",
      label: "Friends",
      type: "array",
      fields: [{
        name: "name",
        label: "Name",
        type: "text"
      }, {
        name: "email",
        label: "Email",
        type: "email"
      }]
    }]
  }
  return <FormikBuilder
    schema={schema}
    initialValues={{
      // friends: [
      //   {
      //     name: "Hola",
      //     email: ""
      //   }
      // ]
    }}
  />
}

export default FormikBuilderExample;