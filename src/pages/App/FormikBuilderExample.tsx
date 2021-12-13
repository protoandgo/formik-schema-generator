// Types
import FormikBuilder from "../../components/FormikBuilder";
//import { ArrayInput, TextInput, FormTitle, SubmitButton, NumberInput, CheckboxInput, DateInput, SelectInput, TextAreaInput, AddInput } from "../../components/FormikBuilderComponents/antd";
import { schema, schemaField } from "../../components/FormikBuilder/utils/types";
import { AddInput } from "../../components/FormikBuilderComponents/materialUI/AddInput";
import { ArrayInput, FormTitle, SubmitButton } from "../../components/FormikBuilderComponents/materialUI/BasicComponents";
import { CheckboxInput } from "../../components/FormikBuilderComponents/materialUI/CheckboxInput";
import { DateInput } from "../../components/FormikBuilderComponents/materialUI/DateInput";
import { NumberInput } from "../../components/FormikBuilderComponents/materialUI/NumberInput";
import { TextAreaInput } from "../../components/FormikBuilderComponents/materialUI/TextAreaInput";
import { TextInput } from "../../components/FormikBuilderComponents/materialUI/TextInput";

interface schemaExampleWithAllTypes extends schema {
  fields: [
    { type: 'text' } & schemaField,
    { type: 'password' } & schemaField,
    { type: 'textarea' } & schemaField,
    { type: 'checkbox' } & schemaField,
    { type: 'date' } & schemaField,
    { type: 'number' } & schemaField,
    { type: 'select' } & schemaField,
    { type: 'array' } & schemaField,
    { type: 'addinput' } & schemaField,
  ]
}

const FormikBuilderExample = () => {
  const schema: schemaExampleWithAllTypes = {
    title: "Invite Friends",
    submitButtonText: "Invite",
    fields: [
      {
        label: "Your Name",
        id: "yourname",
        type: "text",
        // validator: [
        //   [ 'string', 'has to be text' ],
        //   [ 'min', 4 ],
        //   [ 'aaaa', 'eeeee' ],
        // ]
        validator: {
          when: ['desc', {
            is: 'demo',
            then: [
              ["string", "Your name must be a string"],
              ['min', 6, 'SIX CHARACTERS MINIMUM'],
            ],
            otherwise: [
              ["string", "Your name must be a string"]
            ]
          }]
        }
      },
      // {
      //   label: "Tu Email:",
      //   type: 'email',
      //   id: "email",
      // },
      // {
      //   label: "Your phone",
      //   id: "phone",
      //   type: "phone",
      //   enabled: "values.yourname === 'keyy'"
      // },
      {
        label: "Contaseña",
        id: "pass",
        type: 'password',
        visibleCondition: 'values.yourname === 123'
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
        label: "Amigos",
        id: "friends",
        type: "array",
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
      // ui="antd"
      components={{
        // basic
        ArrayInput: ArrayInput,
        FormTitle: FormTitle,
        SubmitButton: SubmitButton,

        // by type
        text: TextInput,
        email: TextInput,
        phone: TextInput,
        password: TextInput,
        passwordconfirm: TextInput,
        textarea: TextAreaInput,
        checkbox: CheckboxInput,
        date: DateInput,
        number: NumberInput,
        //select: SelectInput,
        addinput: AddInput,
        //TextInput: TextInput,
      }}
    />
  );
};

export default FormikBuilderExample;