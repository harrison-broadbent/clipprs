const { prompt } = require('enquirer');


export const DEFAULT_TEMPLATE_PERSON = {
	"First Name"		: "",
	"Last Name" 		: "", 
	"Date of Birth" : ""
}

export let PROMPT_TEMPLATE = {
	name: '',
	message: '',
	initial: '',
	result(value: any) {
		return value.trim()
	}
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