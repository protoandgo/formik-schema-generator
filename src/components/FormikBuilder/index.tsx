// Imports:
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
// Style
import "./index.css";

// Components: TODO register components instead
type Components = { [x: string]: (...props: any) => JSX.Element }; // TODO register components instead

// Functional Component:
const FormikBuilder = ({
  schema,
  initialValues,
  components,
}: {
  schema: schema;
  initialValues?: any;
  components: Components;
}) => {
  // Generate conditions for visibility and enable:
  const visibilityConditions = GenerateConditionsFor("visible", schema.fields || []);
  const enabledConditions = GenerateConditionsFor("enabled", schema.fields || []);
  const [validationSchema, setValidationSchema] = useState(GenerateYupSchema(schema.fields));

  // Function that will be called onBlur on every field, to regenerate the yup validation schema:
  const regenerateYup = () => {
    setValidationSchema(GenerateYupSchema(schema.fields))
  }

  // =========== FUNCTIONAL COMPONENT =========== //
  // Function to render a single field (Field) / an array of fields (FieldArray):
  const RenderField = (
    schemaFieldInfo: schemaField,
    beforeName: string,
    formikContext: FormikProps<any>,
  ) => {
    // Know the 'path' to this property in values to be able to get the field with getFieldProps:
    const fullName = beforeName + schemaFieldInfo.id; // example without beforeName: 'friends'  |  example with beforeName: 'friends[0].name'
    const formikField = formikContext.getFieldProps(fullName);

    // Check if the field should be visible: (TODO: Fix! DOES NOT WORK)
    const visible = (
      !visibilityConditions[fullName] ||
      visibilityConditions[fullName](formikContext.values)
    );
    if (schemaFieldInfo.id === 'pass') console.log(schemaFieldInfo.id + " visible? " + visible);

    // If the field is invisible, return empty React Fragment:
    if (!visible) return <p key={schemaFieldInfo.id}>Component {schemaFieldInfo.id} invisible!</p>

    // Check if the field should be enabled: (TODO: FieldArray should also be affected by this)
    const enabled =
      !enabledConditions[fullName] || enabledConditions[fullName](formikContext.values);

    // =========== DISPLAY ARRAY FIELD =========== //
    // If the field is an array, display a FieldArray
    if (schemaFieldInfo.type === "array" && schemaFieldInfo.fields) {
      const example = GenerateInitValues(schemaFieldInfo.fields);
      return (
        <div className="fieldd" key={fullName}>
          <FieldArray
            name={schemaFieldInfo.id}
            render={({ insert, remove, push }) => {
              // For each element in the array (dynamic value, user can add and remove)...
              // examples:
              // formikContext.values[fullName] = []
              // formikContext.values[fullName] = ['Hola']
              // formikContext.values[fullName] = [ { name: 'Hola' } ]
              // ...
              const arrayFields = formikContext.values[fullName].map((element: any, index: number) =>
                // For each element in the field (fixed value, depending on the schema), render the field...
                // examples:
                // schemaFieldInfo.fields = undefined   --->  won't happen
                // schemaFieldInfo.fields = []   --->  won't happen
                // schemaFieldInfo.fields = [ { label: 'Name', id: 'name', type: 'text' } ]
                // ...
                schemaFieldInfo.fields?.map((subfieldd, subindex) => {
                  return RenderField(
                    subfieldd,
                    `${fullName}[${index}].`,
                    formikContext
                  );
                })
              )
                || [];
              return (
                // Use the basic component ArrayInput, giving it
                <components.ArrayInput
                  arrayFields={arrayFields}
                  onAdd={() => push(example)}
                  remove={remove}
                  fieldInfo={schemaFieldInfo}
                />
              );
            }}
          />
        </div>
      );
      // =========== DISPLAY FIELD =========== //
      // If the field is NOT an array, display a Field which 'component' depends on the type of the field
    } else {
      const fieldProps: componentCommonProps = {
        fieldInfo: schemaFieldInfo, // info given in the schema for customization (label, options for select, rows for textarea, etc)
        meta: formikContext.getFieldMeta(fullName), // meta to show errors on component
        setFieldValue: formikContext.setFieldValue, // Manually set the field value on every component's onChange/onOk/etc depending on how the component works
        inputProps: { // Props to give directly to the input inside the component. Example: <input {...inputProps} />
          ...formikField, // name and value
          checked: formikField.value, // otherwise, if it's a checkbox it will give a warning
          onBlur: regenerateYup, // Regenerate yup schema on blur on every field
          disabled: !enabled, // usually components dont have an "enabled" prop, but instead a "disabled" prop...
        }
      };
      // Get component by type
      const componentToDisplay =
        components[schemaFieldInfo.type] ||
        ((props: any) => (<span>No component given for field of type {schemaFieldInfo.type}</span>))
      // Display Field with component
      return (
        <div className="fieldd" key={fullName}>
          <Field
            {...fieldProps}
            component={componentToDisplay}
            onChange={null}
          />
        </div>
      );
    }
  };
  // =========== RETURN =========== //
  return (
    <React.Fragment>
      {/* Title of the form */}
      <components.FormTitle text={schema.title} />
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
            {schema.fields.map((fieldInfo: schemaField, index: any) => {
              return RenderField(fieldInfo, "", formikContext);
            })}
            {/* Button to submit form */}
            <components.SubmitButton text={schema.submitButtonText} />
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default FormikBuilder;
