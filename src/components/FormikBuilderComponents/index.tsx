// // Types
// import {
//   ArrayInputProps,
//   CommonInputProps,
//   FormTitleProps,
//   // RedErrorBelowProps,
//   SubmitButtonProps,
// } from "../utils/types";
// // Input Components prepared for different user interfaces
// import * as antdComp from "./antd";

// export type possibleUis = "antd" | "materialui";
// type UIComponentsType = {
//   [x in possibleUis]: {
//     [x: string]: (...props: any) => JSX.Element;
//     // ArrayInput: (props: ArrayInputProps) => JSX.Element;
//     // FormTitle: (props: FormTitleProps) => JSX.Element;
//     // SubmitButton: (props: SubmitButtonProps) => JSX.Element;
//     // RedErrorBelow: (props: RedErrorBelowProps) => JSX.Element;
//     // text: (props: CommonInputProps) => JSX.Element;
//     // email: (props: CommonInputProps) => JSX.Element;
//   };
// };

// const UIComponents: UIComponentsType = {
//   antd: {
//     // basic
//     // ArrayInput: antdComp["ArrayInput"],
//     ArrayInput: antdComp.ArrayInput,
//     FormTitle: antdComp.FormTitle,
//     SubmitButton: antdComp.SubmitButton,
//     // RedErrorBelow: antdComp.RedErrorBelow,

//     // by type
//     text: antdComp.TextInput,
//     email: antdComp.TextInput,
//     phone: antdComp.TextInput,
//   },
//   materialui: {

//   }
// };

// const TryToRender = (ui: possibleUis, el: string, props: any) => {
//   const comp = UIComponents[ui][el];
//   return comp ? (
//     comp(props)
//   ) : (
//     <span style={{ backgroundColor: 'pink' }}>
//       {/* COMPONENT {el} MISSING FOR LIBRARY {ui} */}
//       Falta añadir el componente '{el}' dentro de '{ui}' en el objeto 'UIComponents' en FormikBuilder2/components/index.tsx !
//     </span>
//   );
// };

// export const ArrayInput = (props: { ui: possibleUis } & ArrayInputProps) => {
//   return TryToRender(props.ui, "ArrayInput", props);
// };

// export const FormTitle = (props: { ui: possibleUis } & FormTitleProps) => {
//   return TryToRender(props.ui, "FormTitle", props);
// };

// export const SubmitButton = (props: { ui: possibleUis } & SubmitButtonProps) => {
//   return TryToRender(props.ui, "SubmitButton", props);
// };

// // export const RedErrorBelow = (props: { ui: possibleUis } & RedErrorBelowProps) => {
// //   return TryToRender(props.ui, "RedErrorBelow", props);
// // };

// export const FieldComponent = (props: { ui: possibleUis } & CommonInputProps) => {
//   return TryToRender(props.ui, props.fieldInfo.type, props);
// };

export const aa = 1;