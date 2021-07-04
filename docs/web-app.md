# Web app

<div align="center">

[![View - Demo site](https://img.shields.io/badge/View-Demo_site-2ea44f?style=for-the-badge)](https://netlify-auth-quickstart.netlify.app/)

</div>

You can't access `/login` and `/profile` as URLs directly. But on the root page, you can use the menu in the top right. From there you can login and then view your Profile.


## Functions

There are two endpoints.

The first returns info about the user. It requires user to be authorized only.

- `/.netlify/functions/me` - see [netlify/functions/me/me.js](/netlify/functions/me/me.js) module.

The second retrieves some shows data from an external API (this could be a database query in a real app). This required additional permissions.

- `/.netlify/functions/shows` - see [netlify/functions/shows/shows.js](/netlify/functions/shows/shows.js) module.

Specifically, only users who have the `read:shows` permissions scope can access this endpoint, as that scope is set up in the JS file. Grant this permission to a user in the Auth0 manager view - _User Management_, _Permissions, _Add Permissions_. Or grant a user a role, such as "Editor" which has "write" access to multiple endpoints.


## How do you know the Functions are only showing data to authorized users?

You can try an endpoint in the browser directly, but you'll get an error that you are missing a token.

- https://netlify-auth-quickstart.netlify.app/.netlify/functions/me

You can do a request with URL with a bad token and the endpoint will reject you.

> Token does not contain the required 'read:shows' scope
