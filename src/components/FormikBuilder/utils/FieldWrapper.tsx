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


// const FilterPasses = (filter: FB_Field_VisibilityFilter, deps: any) => {
//   if (filter.hasOwnProperty("field")) {
//     if (filter.hasOwnProperty("otherField")) {
//       const xAs = filter as FB_Field_VisibilityFilter_FieldComparisonOtherField;
//       switch (xAs.is) {
//         case "less than":
//           return deps[xAs.field] < deps[xAs.otherField];
//         case "equal":
//           return deps[xAs.field] === deps[xAs.otherField];
//         case "more than":
//           return deps[xAs.field] > deps[xAs.otherField];
//       }
//     } else if (filter.hasOwnProperty("value")) {
//       const xAs = filter as FB_Field_VisibilityFilter_FieldComparisonValue;
//       switch (xAs.is) {
//         case "less than":
//           return deps[xAs.field] < xAs.value;
//         case "equal":
//           return deps[xAs.field] === xAs.value;
//         case "more than":
//           return deps[xAs.field] > xAs.value;
//       }
//     } else {
//       const xAs = filter as FB_Field_VisibilityFilter_FieldEmpty;
//       console.log(xAs);
//       switch (xAs.is) {
//         case "empty":
//           console.log(xAs.field + " is empty?");
//           return deps[xAs.field] === "";
//         case "not empty":
//           console.log(
//             xAs.field + " is not empty? " + (deps[xAs.field] !== "")
//           );
//           return deps[xAs.field] !== "";
//       }
//     }
//   }
//   return false;
// };

const FieldWrapper = (props: {
  fieldParams: FieldSchema;
  // field: FieldInputProps<any>;
  // meta: FieldMetaProps<any>;
  formikContext: FormikContextType<typeof fieldParams>;
  
}) => {
  const { fieldParams } = props;

  // Component is part of a Formik form
  // const [field, meta] = useField({ name: fieldParams.name });

  // Component by type will need to know that it is in a Formik form
  const additionalProps = {
    field: props.field,
    meta: props.meta,
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