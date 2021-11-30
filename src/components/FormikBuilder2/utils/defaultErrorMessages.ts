// const fillInfo = (msg: string, extra: any) => {
//     return msg.replace("??", extra.toString());
// }

const symbol = "??";

// TODO give intl IDs instead of messages directly
const defaultErrorMessages = {
  required: "This field is required",
  // invalidFormat: (type: string) => fillInfo(`Please write a valid ??`, type),
  // numberTooLow: (min: number) => fillInfo(`Number cannot be below ??`, min),
  // numberTooHigh: (max: number) => fillInfo(`Number cannot be above ??`, max),
  // stringTooShort: (min: number) => fillInfo(`Cannot be shorter than ?? characters`, min),
  // stringTooLong: (max: number) => fillInfo(`Cannot be longer than ?? characters`, max),
  // dateTooEarly: (min: string) => fillInfo(`Date can't be before ??`, min),
  // dateTooLate: (max: string) => fillInfo(`Date can't be after ??`, max),
  invalidFormat: (type: string) => `Please write a valid ??`.replace(symbol, type),
  numberTooLow: (min: number) => `Number cannot be below ??`.replace(symbol, min.toString()),
  numberTooHigh: (max: number) => `Number cannot be above ??`.replace(symbol, max.toString()),
  stringTooShort: (min: number) => `Cannot be shorter than ?? characters`.replace(symbol, min.toString()),
  stringTooLong: (max: number) => `Cannot be longer than ?? characters`.replace(symbol, max.toString()),
  dateTooEarly: (min: string) => `Date can't be before ??`.replace(symbol, min.toString()),
  dateTooLate: (max: string) => `Date can't be after ??`.replace(symbol, max.toString()),
}

export default defaultErrorMessages;