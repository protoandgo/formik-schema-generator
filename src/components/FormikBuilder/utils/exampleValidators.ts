export const validatePhone = () => {
  return {
    when: ['', {
      is: 'demo', // que pasa si no quiero un when, quiero una simple validacion?
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