// TODO give intl IDs instead of messages directly
const defaultErrorMessages = {
    required: "This field is required",
    invalidFormat: (type: string) => `Please write a valid ${type}`,
    numberTooLow: (min: number) => `Number cannot be below ${min}`,
    numberTooHigh: (max: number) => `Number cannot be above ${max}`,
    stringTooShort: (min: number) => `Cannot be shorter than ${min} characters`,
    stringTooLong: (max: number) => `Cannot be longer than ${max} characters`,
    dateTooEarly: (min: string) => `Date can't be before ${min}`,
    dateTooLate: (max: string) => `Date can't be after ${max}`,
}

export default defaultErrorMessages;