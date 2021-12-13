import { schemaFieldValidator } from "./types";

export const validatePhone = (): [string, ...any[]][] | schemaFieldValidator => {
  return [
    ["string", "Your name must be a string"],
    [
      "matches",
      "/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im",
      "That is not the correct format",
    ],
  ];
};
// TODO email, phone, password, address, etc

export const validatePasswordConfirm = (): [string, ...any[]][] | schemaFieldValidator  => {
  return [
    ["string", "Password must be a string"],
    ["required", "This field is required"],
    ["oneOf", ["field.pass"], "Password must be the same"]
  ]
}