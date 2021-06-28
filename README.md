# Netlify Function Auth Quickstart


## Preview

<div align="center">
    <a href="https://netlify-function-auth-quickstart.netlify.app/">
        <img src="/sample.png" alt="Sample screenshot" title="Sample screenshot" width="400" />
    </a>
</div>


## Web app

[![View - Demo site](https://img.shields.io/badge/View-Demo_site-2ea44f)](https://netlify-function-auth-quickstart.netlify.app/)


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

An API was set up in Auth0 for this to work.

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
