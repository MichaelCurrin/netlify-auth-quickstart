# Netlify Function Auth Quickstart

[![Netlify Status](https://api.netlify.com/api/v1/badges/36b6eb3a-9f3c-4c07-bf1f-4d75e03dae85/deploy-status)](https://app.netlify.com/sites/netlify-function-auth-quickstart/deploys)


## Preview

<div align="center">
    <a href="https://netlify-function-auth-quickstart.netlify.app/">
        <img src="/sample.png" alt="Sample screenshot" title="Sample screenshot" width="400" />
    </a>
</div>


## Web app

[![View - Demo site](https://img.shields.io/badge/View-Demo_site-2ea44f)](https://netlify-function-auth-quickstart.netlify.app/)

You can't access `/login` and `/profile` as URLs directly. But on the root page, you can use the menu in the top right. From there you can login and then view your Profile.

### Functions

There are two endpoints.

The first returns info about the user. It requires user to be authorized only.

- `/.netlify/functions/me` - see [netlify/functions/me/me.js](/netlify/functions/me/me.js) module.

The second retrieves some shows data from an external API (this could be a database query in a real app). This required additional permissions.

- `/.netlify/functions/shows` - see [netlify/functions/shows/shows.js](/netlify/functions/shows/shows.js) module.

Specifically, only users who have the `read:shows` permissions scope can access this endpoint, as that scope is set up in the JS file. Grant this permission to a user in the Auth0 manager view - _User Management_, _Permissions, _Add Permissions_. Or grant a user a role, such as "Editor" which has "write" access to multiple endpoints.

### How do you know the Functions are only showing data to authorized users?

You can try an endpoint in the browser directly, but you'll get an error that you are missing a token.

- https://netlify-function-auth-quickstart.netlify.app/.netlify/functions/me

You can do a request with URL with a bad token and the endpoint will reject you.

> Token does not contain the required 'read:shows' scope


## About

### Built on

- [Netlify](https://netlify.com/)
    - Deploy and host
    - Restrict access to paths if no token is present.
    - [Netlify Functions](https://functions.netlify.com/) to run serverless JS code in the cloud.
- [Auth0](https://auth0.com/)
    - Control login.
- [jQuery DataTables](https://datatables.net)
    - Create an HTML table using JS and JSON data.

### Flow

The Netlify Function and Auth0 part of this example is based on the Gatsby example in [serverless-jwt](https://github.com/sandrinodimattia/serverless-jwt) repo.

The HTML part was based on the [Plain JavaScript](https://auth0.com/docs/quickstart/spa/vanillajs) tutorial and corresponding [auth0-javascript-samples](https://github.com/auth0-samples/auth0-javascript-samples) repo. The first example there has the login flow set up and second example provides a call to an API on the frontend using `callApi` function. That example uses Express as a Node server, so that part was ignored here in favor of Express.

An API was set up in Auth0 for this to work.

The scope was also set up on the API in Auth0 and in the app - I don't know if this is required or not for a basic app but it seems like anything beyond getting your user's profile data needs to be scoped.

1. A user clicks sign in on the frontend of your site.
2. That does request to `https://MY_APP.auth0.com/authorize` with parameters.
3. The user is returned to the configured callback URL of your site and the JWT token is set for the user.
4. A request is does to Netlify Function on `/.netlify/function/FUNCTION_NAME`.
5. The function takes the user's auth details and does a request to the Auth0 app to valid the details.
6. A response is returned, such as HTML or data.
    - If valid, the user gets a successful response from the Function. In this case, JSON data is returned.
    - If not valid or not authenticated, the Function returns an error.

### Data

The JSON data for this example is protected to only be accessible by authenticated users. In real world application, this would be private data.

The jQuery DataTables package is used to display the data as a table.

The [Ajax sourced data](https://datatables.net/examples/data_sources/ajax.html) tutorial was a good start.

But since a `POST` request was needed, the [POST data](https://datatables.net/examples/server_side/post.html) example was looked up.

Note this is needed for the `POST` too.

```
headers: {
    Authorization: `Bearer ${accessToken}`
}
```
