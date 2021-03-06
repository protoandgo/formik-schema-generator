// Types
import FormikBuilder from "../../components/FormikBuilder";
// import { ArrayInput, TextInput, FormTitle, SubmitButton, NumberInput, CheckboxInput, DateInput, SelectInput, TextAreaInput, AddInput, PasswordInput } from "../../components/FormikBuilderComponents/antd";
// import { schema } from "../../components/FormikBuilder/utils/types";
import { registry } from "../../components/FormikBuilder/utils/ComponentRegistry";
import '../../components/FormikBuilderComponents/antd/style.css'
//import { ArrayInput, TextInput, FormTitle, SubmitButton, NumberInput, CheckboxInput, DateInput, SelectInput, TextAreaInput, AddInput } from "../../components/FormikBuilderComponents/antd";
import { schema, schemaField } from "../../components/FormikBuilder/utils/types";
import { AddInput } from "../../components/FormikBuilderComponents/materialUI/AddInput";
import { ArrayInput, FormTitle, SubmitButton } from "../../components/FormikBuilderComponents/materialUI/BasicComponents";
import { CheckboxInput } from "../../components/FormikBuilderComponents/materialUI/CheckboxInput";
import { DateInput } from "../../components/FormikBuilderComponents/materialUI/DateInput";
import { NumberInput } from "../../components/FormikBuilderComponents/materialUI/NumberInput";
import { TextAreaInput } from "../../components/FormikBuilderComponents/materialUI/TextAreaInput";
import { TextInput } from "../../components/FormikBuilderComponents/materialUI/TextInput";

import * as yup from "yup";

// interface schemaExampleWithAllTypes extends schema {
//   fields: [
//     { type: 'text' } & schemaField,
//     { type: 'password' } & schemaField,
//     { type: 'textarea' } & schemaField,
//     { type: 'checkbox' } & schemaField,
//     { type: 'date' } & schemaField,
//     { type: 'number' } & schemaField,
//     { type: 'select' } & schemaField,
//     { type: 'array' } & schemaField,
//     { type: 'addinput' } & schemaField,
//   ]
// }

const schemaTest: schema = {
  title: "Invite Friends",
  submitButtonText: "Invite",
  fields: [
    {
      label: "Your Name",
      id: "yourname",
      type: "text",
      // validator: [{
        // when: ['desc', {
        //   is: 'demo',
        //   then: [
        //     ["string", "Your name must be a string"],
        //     ['min', 6, 'SIX CHARACTERS MINIMUM'],
        //   ],
        //   otherwise: [
        //     ["string", "Your name must be a string"],
        //     ["required"]
        //   ]
        // }]
      // },
      // { always: [
      //   ["string", "Your name must be a string"]
      // ] }]
    },
    {
      label: 'Entrar requiere contrase??a',
      type: 'checkbox',
      id: 'passYesNo',
    },
    {
      label: "Contase??a",
      id: "pass",
      type: 'password',
      visibleCondition: 'values.passYesNo === true',
      validator: {
        when: [
          {
            field: "passYesNo",
            is: true,
            then: [
              ["string", "Password must be a string"],
              ["required", "This field is required"],
            ]
          }
        ]
      }
    },
    {
      label: "Contase??a Repetir",
      id: "passRepeat",
      type: 'password',
      visibleCondition: 'values.passYesNo === true',
      // validator: yup.string().required().oneOf([yup.ref("pass")]),
      validator: {
        when: [
          {
            field: "passYesNo",
            is: true,
            then: [
              ["string", "Password must be a string"],
              ["required", "This field is required"],
              ["oneOf", ["field.pass"], "Password must be the same"]
            ]
          }
        ]
      }
    },
    // {
    //   label: "Repite",
    //   id: "pass2",
    //   type: "passwordconfirm",
    //   passwordFieldid: "pass"
    // },
    {
      label: "Descripcion de la fiesta",
      id: "desc",
      type: "textarea",
      rows: 5,
    },
    {
      label: 'Obligatorio sombreritos de colores',
      type: 'checkbox',
      id: 'hats',
    },
    {
      label: "Fecha de la fiesta:",
      type: 'date',
      id: 'partydate',
    },
    {
      label: "Dias que va a durar la fiesta",
      id: "dias",
      type: "number",
      // validator: [
      //   [ 'number', 'pls write number' ],
      //   [ 'min', 4 ],
      //   [ 'aaaa', 'eeeee' ],
      // ]
    },
    {
      label: "Traer confetti",
      id: "opcion",
      type: "select",
      options: {
        rojo: "Rojo",
        azul: "Azul",
        amarillo: "Amarillo"
      }
    },
    {
      label: 'Invitar amigos',
      type: 'checkbox',
      id: 'invite',
    },
    {
      label: "Amigos",
      id: "friends",
      type: "array",
      enabledCondition: 'values.invite === true',
      fields: [
        {
          id: "name",
          label: "Name",
          type: "text",
        },
        // {
        //   id: "email",
        //   label: "Email",
        //   type: "email",
        // },
        {
          type: 'checkbox',
          id: 'ok',
          label: 'El invitado acepta los terminos'
        }
      ],
    },
    {
      type: 'addinput',
      id: 'adders',
      label: "Aqui pon cosas"
    },
  ],
};
// REGISTER COMPONENTS
registry.registerAll({
  // basic
  ArrayInput: ArrayInput,
  // ArrayInput: (prop: {num: number}) => <span>ey{prop.num}</span>,
  FormTitle: FormTitle,
  SubmitButton: SubmitButton,
  // SubmitButton: (num: number) => <span>{num}</span>,

  // by type
  text: TextInput,
  email: TextInput,
  phone: TextInput,
  // password: PasswordInput,
  passwordconfirm: TextInput,
  textarea: TextAreaInput,
  checkbox: CheckboxInput,
  date: DateInput,
  number: NumberInput,
  // select: SelectInput,
  addinput: AddInput,
});

const FormikBuilderExample = () => {

  // RETURN VIEW
  return (
    <FormikBuilder
      schema={schemaTest}
      initialValues={{
        yourname: "ha",
      }}
    />
  );
};

export default FormikBuilderExample;