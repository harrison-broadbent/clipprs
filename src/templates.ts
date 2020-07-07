
export const DEFAULT_TEMPLATE_PERSON = {
  'First Name': '',
  'Last Name': '',
  Birthday: '',
  Bio: '',
}

export const PROMPT_TEMPLATE = {
  name: '',
  message: '',
  initial: '',
  editable: true,
  required: undefined,
  result(value: any) {
    return value.trim()
  },
}

// export let BLANK_INPUT_TEMPLATE = {
// 	name: 'test-blank-field',
// 	message: prompt({
// 		type: 'input',
// 		name: 'name',
// 		message: ''
// 	}),
// 	initial: "",
// }
