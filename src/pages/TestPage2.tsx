import { Typography } from "antd";
import { Formik, FormikProps } from "formik";
import Form from "rc-field-form/es/Form";
import React from "react";

const RenderNestedField = () => {
  // TODO
};

const RenderField = (
  x: [string, any],
  i: number,
  formikProps: FormikProps<{ [x: string]: any }>
) => {

  let field = null;

  switch (typeof x) {
    case 'string': 
      field = <input name={x}></input>
      break;
  
    default:
      break;
  }

  return <div key={i}>
    {field}
  </div>
};

const TestFB = (props: { title: string; initialValues: { [x: string]: any } }) => {
  return (
    <React.Fragment>
      <Typography.Title>{props.title}</Typography.Title>
      <Formik
        initialValues={props.initialValues}
        onSubmit={console.log}
        render={(formikProps) => (
          <Form>
            {Object.entries(props.initialValues).map((x, i) =>
              RenderField(x, i, formikProps)
            )}
          </Form>
        )}
      />
    </React.Fragment>
  );
};

const TestPage2 = () => {
  return (
    <TestFB
      title="Formulario"
      initialValues={{ users: [{ userName: "", hobbies: [{ hobby: "" }] }] }}
    />
  );
};

export default TestPage2;
