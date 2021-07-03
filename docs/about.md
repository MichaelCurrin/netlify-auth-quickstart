# About

## Built on

- [Netlify](https://netlify.com/)
    - Deploy and host
    - Restrict access to paths if no token is present.
    - [Netlify Functions](https://functions.netlify.com/) to run serverless JS code in the cloud.
- [Auth0](https://auth0.com/)
    - Control login with JWT and manage users from an admin view.
- [jQuery DataTables](https://datatables.net)
    - Create an HTML table using JS and JSON data.
- Plain JS (no React)



## Flow

The Netlify Function and Auth0 part of this example is based on the Gatsby example in [serverless-jwt](https://github.com/sandrinodimattia/serverless-jwt) repo.

The HTML part was based on the [Plain JavaScript](https://auth0.com/docs/quickstart/spa/vanillajs) tutorial and corresponding [auth0-javascript-samples](https://github.com/auth0-samples/auth0-javascript-samples) repo. The first example there has the login flow set up and second example provides a call to an API on the frontend using `callApi` function. That example uses Express as a Node server, so that part was ignored here in favor of Express.

An API was set up in Auth0 for this to work.

The scope was also set up on the API in Auth0 and in the app. This is optional. See [Scope](#scope).

1. A user clicks sign in on the frontend of your site.
2. That does request to `https://MY_APP.auth0.com/authorize` with parameters.
3. The user is returned to the configured callback URL of your site and the JWT token is set for the user.
4. A request is does to Netlify Function on `/.netlify/function/FUNCTION_NAME`.
5. The function takes the user's auth details and does a request to the Auth0 app to valid the details.
6. A response is returned, such as HTML or data.
    - If valid, the user gets a successful response from the Function. In this case, JSON data is returned.
    - If not valid or not authenticated, the Function returns an error.


## Data

The JSON data for this example is protected to only be accessible by authenticated users. In real world application, this would be private data.

The jQuery DataTables package is used to display the data as a table.

The [Ajax sourced data](https://datatables.net/examples/data_sources/ajax.html) tutorial was a good start.

When the jQuery DataTables AJAX request is made, authentication is needed anlso headers must be set to include the token.

```
headers: {
    Authorization: `Bearer ${accessToken}`
}
```


## Scope

The scope set up here requires a user to have a specific scope to hit the _Shows_ endpoint, while the _Me_ endpoint is setup to be accessed by any Authorized user. 

This requires extra configuration as follows

- On the endpoint (one line to wrap the Function.
- In the repoo's auth config JSON file.
- Auth0 user management - explicitly giving a user the scope or role with scopes so they can access the data on the API

If you have a simple app or just don't care about granular scope, you can skip the scope configuration and take the scope out of this _Shows_ endpoint.
