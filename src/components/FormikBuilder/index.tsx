// #region imports
// React
import React, { useState } from "react";
// Formik
import { Formik, Field, Form, FieldArray, FormikProps } from "formik";
// Types
import { componentCommonProps, schema, schemaField } from "./utils/types";
// Generators
import { GenerateYupSchema } from "./utils/generateYupSchema";
import { GenerateInitValues } from "./utils/generateInitValues";
import { GenerateConditionsFor } from "./utils/generateConditions";
// Components
import { registry } from "./utils/ComponentRegistry";
// Style
import "./index.css";
// #endregion

// Functional Component:
const FormikBuilder = ({
  schema,
  initialValues,
}: {
  schema: schema;
  initialValues?: any;
}) => {

  // #region generate visible & enabled condition functions and yup validation schema
  const [visibilityConditions] = useState(GenerateConditionsFor("visible", schema.fields || []));
  const [enabledConditions] = useState(GenerateConditionsFor("enabled", schema.fields || []));
  const [validationSchema, setValidationSchema] = useState(GenerateYupSchema(schema.fields));
  // #endregion

  // #region get common components from component registry
  const commonComponents = {
    ArrayInput: registry.get("ArrayInput"),
    FormTitle: registry.get("FormTitle"),
    SubmitButton: registry.get("SubmitButton"),
  };
  // #endregion

  // #region function to render a single field
  const RenderField = (
    schemaFieldInfo: schemaField,
    formikContext: FormikProps<any>,
    beforeName?: string,
    forceDisabled?: boolean, // used when an array is disabled: all its elements are disabled as well
  ) => {
    // Get the 'path' that this field will have in the formik context:
    const fullName = beforeName + schemaFieldInfo.id; // example without beforeName: 'friends'  |  example with beforeName: 'friends[0].name'

    // If the field is invisible, return empty React Fragment:
    if (visibilityConditions[fullName] && !visibilityConditions[fullName](formikContext.values))
      // return <p key={schemaFieldInfo.id}>Component {schemaFieldInfo.id} invisible!</p>;
      return <React.Fragment key={schemaFieldInfo.id}/>;

    const disabled = forceDisabled || (enabledConditions[fullName] && !enabledConditions[fullName](formikContext.values))

    const formikField = formikContext.getFieldProps(fullName);

    const regenerateYup = () => setValidationSchema(GenerateYupSchema(schema.fields))

    const fieldProps: componentCommonProps = {
      fieldInfo: schemaFieldInfo, // info given in the schema for customization (label, options for select, rows for textarea, etc)
      meta: formikContext.getFieldMeta(fullName), // meta to show errors on component
      setFieldValue: formikContext.setFieldValue, // Manually set the field value on every component's onChange/onOk/etc depending on how the component works
      inputProps: {
        ...formikField, // name and value
        id: formikField.name,
        checked: formikField.value, // otherwise, if it's a checkbox it will give a warning
        onBlur: regenerateYup, // Regenerate yup schema on blur on every field
        disabled: disabled, // if disabled condition exists and it returns false, then disabled is true
      }
    }

    return (
      <div className="field" key={fullName}>
        {schemaFieldInfo.fields ? (
          // ------------------------------------------------- if has subfields, FieldArray
          <FieldArray
            name={schemaFieldInfo.id}
            render={({ remove, push }) => (
                <commonComponents.ArrayInput
                  {...fieldProps}
                  arrayFields={
                    formikField.value.map((_: any, index: number) => // map through each element in the array (form values that can change). example of element: { firstName: 'Timmy', age: 3 }
                      schemaFieldInfo.fields?.map((subfield) => // map through each field in the element (schema values that are fixed). example of field: { id: firstName, label: "First Name:", type: "text" }
                        RenderField(subfield, formikContext, `${fullName}[${index}].`, disabled) // render that field.
                      )
                    ) || [] // if the user hasn't added any entries to the array yet, then it's empty.
                  }
                  onAdd={() => { // on (+Add) button click, add a new empty element to the array
                    push(GenerateInitValues(schemaFieldInfo.fields || []))
                    regenerateYup();
                  }}
                  onRemove={(index: number) => { // on (-Remove) button click, delete that element (by index)
                    remove(index);
                    regenerateYup();
                  }}
                />
              )
            }
          />
        ) : (
          // ------------------------------------------------- if not, Field
          <Field
            {...fieldProps}
            component={registry.get(schemaFieldInfo.type)}
            onChange={null}
          />
        )}
      </div>
    );
  };
  // #endregion

  // #region return FormikBuilder
  return (
    <React.Fragment>
      {/* Title of the form */}
      <commonComponents.FormTitle text={schema.title} />
      {/* Formik component with initialValues, onSubmit and validationSchema */}
      <Formik
        initialValues={GenerateInitValues(schema.fields, initialValues)}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          console.log(values);
          alert(JSON.stringify(values, null, 2));
        }}
        validationSchema={validationSchema}
      >
        {(formikContext) => (
          <Form>
            {/* Render each field in the schema */}
            {schema.fields.map((fieldInfo: schemaField, index: any) => 
              RenderField(fieldInfo, formikContext, "")
            )}
            {/* Button to submit form */}
            <commonComponents.SubmitButton text={schema.submitButtonText} />
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
  // #endregion
};

export default FormikBuilder;
