export const validatePhone = () => {
  return {
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
}
// TODO email, phone, password, address, etc