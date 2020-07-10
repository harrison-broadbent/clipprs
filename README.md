# Clipprs - CLI Personal Relations System
  - this is not ready for an initial release yet!

## Quickstart guide

### Installation
- Install Clipprs with - 
    
      npm install -g clipprs

### Add
  -  Add a new clip to your system with -
  
    > clipprs new

    ? Add a person to your Clips -  … 
    First Name :  
    Last Name  : …
    Birthday   : …
    Bio        : …

  You can use *ctrl + n* to add fields and *ctrl + r* to remove fields. 
  
  Note that the four initial fields are required and cannot be removed. 

### View
  -  View all your clips with -
  
    > clipprs view

    ┌────────────────┬────────────────┬────────────────┬────────────────┐
    │ First Name     │ Last Name      │ Birthday       │ Bio            │
    ├────────────────┼────────────────┼────────────────┼────────────────┤
    │ Steve          │ Austin         │ ???            │ He is stone    │
    │                │                │                │ cold.          │
    ├────────────────┼────────────────┼────────────────┼────────────────┤
    │ Harrison       │ Broadbent      │ 21-02-2002     │ Engineering    │
    │                │                │                │ student, likes │
    │                │                │                │ to run and     │
    │                │                │                │ code, eats a   │
    │                │                │                │ lot.           │
    └────────────────┴────────────────┴────────────────┴────────────────┘

  By default this will only show the four required fields, like above. 
  You can view all the fields within your database of clips by passing the -a flag - 

    > clipprs view -a

  This will attempt to show you the the value of each entry for all the fields in your database, with blanks used to show an undefined field, ie - 

      ┌────────────────┬────────────────┬────────────────┬────────────────┬────────────────┐
      │ First Name     │ Last Name      │ Birthday       │ Bio            │ Favourite      │
      │                │                │                │                │ Colour         │
      ├────────────────┼────────────────┼────────────────┼────────────────┼────────────────┤
      │ Steve          │ Austin         │ ???            │ He is stone    │                │
      │                │                │                │ cold.          │                │
      ├────────────────┼────────────────┼────────────────┼────────────────┼────────────────┤
      │ Harrison       │ Broadbent      │ 21-02-2002     │ Engineering    │ Carolina blue  │
      │                │                │                │ student, likes │                │
      │                │                │                │ to run and     │                │
      │                │                │                │ code, eats a   │                │
      │                │                │                │ lot.           │                │
      └────────────────┴────────────────┴────────────────┴────────────────┴────────────────┘

  If the table containing all the fields in the database is too wide for the terminal however, the table will be truncated and only show a portion of all the fields. 

  All the fields for a given entry can be viewed by searching for an entry and then viewing it, as discussed in the following section. 

### Search
  -  Search, Edit, View and Delete your clips -
  
    > clipprs search

    ? Search and edit your Clips -  …
    Harrison Broadbent
    Steve Austin

  Select a clip with *enter*, and then select from the given options using the arrow keys - 

    ?  …
    ❯ View
      Edit
      Delete
      Close

  - **View**: Shows an extended view of *all* fields for a given entry.
  - **Edit**: Allows you to edit the entry, add and remove fields etc.
  - **Delete**: Deletes an entry after confirmation.
  - **Close**: Closes the dialogue.

### Erase
  - You can erase your database of clips using - 
    
        > clipprs erase

    and then choosing (y) for both of the confirmations. 
    
    THIS CANNOT BE UNDONE!

### Help
  - At any time, you can get help using - 
    
        > clipprs help  
        
        // OR

        > clipprs help [command]
