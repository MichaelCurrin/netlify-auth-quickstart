# Web app

<div align="center">

[![View - Demo site](https://img.shields.io/badge/View-Demo_site-2ea44f?style=for-the-badge)](https://netlify-auth-quickstart.netlify.app/)

</div>


## Functions

There are three endpoints.

### Me

The first returns info about the user. It requires user to be authorized only.

- `/.netlify/functions/me` - see [netlify/functions/me/me.js](/netlify/functions/me/me.js) module.

### Shows

The second retrieves some shows data from an external API (this could be a database query in a real app). This required additional permissions.

- `/.netlify/functions/shows` - see [netlify/functions/shows/shows.js](/netlify/functions/shows/shows.js) module.

Specifically, only users who have the `read:shows` permissions scope can access this endpoint, as that scope is set up in the JS file. Grant this permission to a user in the Auth0 manager view - _User Management_, _Permissions, _Add Permissions_. Or grant a user a role, such as "Editor" which has "write" access to multiple endpoints.

### People

This endpoint has a static JSON file that is only visible to the Function and not served as a public file.

The Function serves this file to the requester, if they are authenticated.

- `/.netlify/functions/people` - see [netlify/functions/shows/people.js](/netlify/functions/shows/people.js) module.

This endpoint is used for the DataTables demo, such the table set up step requests the Function URL with a token.


## How do you know the Functions are only showing data to authorized users?

You can try an endpoint in the browser directly, but you'll get an error that you are missing a token.

- https://netlify-auth-quickstart.netlify.app/.netlify/functions/me

You can do a request with URL with a bad token and the endpoint will reject you.

> Token does not contain the required 'read:shows' scope
