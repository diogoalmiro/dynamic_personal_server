# Dynamic Personal Server

This server will allow to authenticated users to have personalized space.

## Details

 - `hostname/` will have a login/register page  
 - `hostname/userid` will have the files of 
 userid's public directory (under hostname/userid/public) or all the files for the userid if it is authenticaded

Any user can add/delete/modify the their files when athenticaded.

Any user can add a `server,js` in it's root. When a user connects to `hostname/userid` that file will be checked.

## TODO

 - Fix the english in this README page.
 - Create the server.
 - Try to keep it simple and maintanable (modular).

