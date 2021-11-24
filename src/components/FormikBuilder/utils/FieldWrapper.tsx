import { FieldInputProps, FieldMetaProps, FormikContextType, useField, useFormikContext } from "formik";
import React, { useState } from "react";
import {
  TextInput,
  SelectInput,
  CheckboxInput,
  DateInput,
} from "../components";
import { conslog } from "./testUtil";
import { FieldSchema } from "./types";

const FieldWrapper = (props: {
  fieldParams: FieldSchema;
  // field: FieldInputProps<any>;
  // meta: FieldMetaProps<any>;
  formikContext: FormikContextType<typeof fieldParams>;
  
}) => {
  const { fieldParams, formikContext } = props;

  // Component is part of a Formik form
  // const [field, meta] = useField({ name: fieldParams.name });

  // Component by type will need to know that it is in a Formik form
  const additionalProps = {
    field: formikContext.getFieldProps(fieldParams.name),
    meta: formikContext.getFieldMeta(fieldParams.name),
  };

  // conslog("PROPS", props);

  // Get Component by type
  const componentByType = () => {
    switch (fieldParams.type) {
      case "text":
        return <TextInput {...additionalProps} {...fieldParams} />;
      // case "textArea":
      //   return <TextAreaInput key={x.name} {...fieldParams} />;
      case "select":
        return <SelectInput {...additionalProps} {...fieldParams} />;
      case "checkbox":
        return <CheckboxInput {...additionalProps} {...fieldParams} />;
      case "date":
        return <DateInput {...additionalProps} {...fieldParams} />;
      // case "upload":
      //   return <UploadInput {...additionalProps} {...fieldParams} />
      default:
        return <React.Fragment></React.Fragment>;
    }
  };

  // Return the Component by type with key and visibility
  return componentByType();
};

export default FieldWrapper;