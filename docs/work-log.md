--- 2020-07-08 21:01 ---
	? add an erase command - cliprs erase - to clear out db?
	? think of changing the name to clipers or clippers or clipprs
	- added view and view -a distinction
	- styled table and it looks pretty good!
		- [ ] work on what to do when content > width of screen
			? maybe truncate and then have a full view option in the search -> person entry


--- 2020-07-07 ---
	--- 19:45 ---

	- YES! Received an answer to my stackoverflow question from one of the people I emailed - doowb - and it looks promising. 
	?? - add a bio fields as required (limit it to the size of a tweet - 120 / 240 chars)
	?? - cliprs view should show shortened view (fName, lName, bio, DOB, X additional fields...) & cliprs view -a / --all should show all fields (like it currently does automatically).
	
	--- 21:42 ---
		- created a fork of enquirer called 'cliprs-enquirer'. 
			- currently this adds the ability to remove non-required fields from an Editable using ctrl+r, with ctrl+n used to add elements. 

	--- 22:40 ---
		- solid effort today
		- have a bug though where Object.create(Template) is creating an empty object in new.js
		- fixed it by using json.parse(json.stringify(template)) rather than object.create(template)
		- [ ] todo - add view and view -a options


--- 2020-07-06 21:33 ---
	- implemented deletion of entries within the search command
		- created a confirmation prompt to double check, not sure if thats necessary though or if it is more seamless to just auto-delete. Actually, thats probably a bad idea...
		?? it would be cool to prompt the users to put the db under version control or something incase something happens - and then ex. commit the changes after each change.
		- added a view command using cli-table3
			? maybe colour in the firstname and lastname colums to differentiate them.


--- 2020-07-05 10:33 --- 
	?? it would be cool if instead of closing an entry, we return to the search field
	- no further luck in my SO post... nor my emails....
	- after accidentally deleting the DB, we can now edit entries...
	- use console.error rather than this.error (only the first works ???)
	


--- 2020-07-04 19:31 ---
	- create an edit function using the 'select' prompt
	- spent a lot of time trying to do something smart with searching the databse, decided to just search for the matching first and last name instead using .filter()
	- posted on stackoverflow and emailed some people for help with custom form prompt as well...


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