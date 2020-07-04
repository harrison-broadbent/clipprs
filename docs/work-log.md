--- 2020-07-03 23:04 ---
	- bit of a setback with the custom input, struggling to figure out how to implement the blank:blank form. 
	- going to move on and come back to that: 
		- [ ] search through all entries
		- [ ] edit people
		- [ ] custom templates (although might be better to wait for b:b prompts for this as well)



--- 2020-07-01 21:03 ---
	- implemented format of input
		- now automatically runs 'input'.trim()
	[ ] look into custom prompts to allow for additional fields. 
		- https://github.com/enquirer/enquirer#-custom-prompts



--- 2020-06-30 20:22 ---
	- Looking to add enquirer to facilitate the 'new' flow. 
		- need to work out how to add custom fields etc. 
		- form prompt
			- perhaps have a final field called 'add field' : ______
				- should be only one word? 
		- want to dynamically generate form from template

	[X] Dynamically generating prompt in new based on a template*
	[X] Next step is to use enquirer to display the prompt, then 
	[ ] allow the user to input arbitrary tags. * 