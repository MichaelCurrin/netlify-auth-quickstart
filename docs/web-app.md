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

This endpoint is used for the DataTables demo, such that the table's setup step requests the Function URL, with a token. The Function serves this JSON to the requester, if they are authenticated.

- `/.netlify/functions/people` - see [netlify/functions/shows/people.js](/netlify/functions/shows/people.js) module.

This endpoint has a static JSON file that is only visible to the Function and **not** served as a public file.

- [netlify/lib/peopleData.json](/netlify/lib/peopleData.json)

The actual content of the JSON file is mock data provided on the jQuery DataTables docs.

In a real app, this could be replaced with something like:

- Replace the file with a call to another API or to your database, done on every _endpoint_ request. If you have data that changes frequently, do that.
    ```toml
    [build]
      command = "./bin/external-request.sh > _data/foo.json && cp _data/foo.json netlify/lib/"
    ```
- Update the JSON file with your own private file (make sure your GitHub repo is private).
    ```toml
    [build]
      command = "cp _data/foo.json netlify/lib/"
    ```
- Do an API or database request at build time, or use some other local data in the repo to generate the JSON file such as with Jekyll, then output the file.
    ```toml
    [build]
        command = "make build && cp _site/foo.json netlify/lib/"
    ```

Here are two approaches for loading the file.

- You could choose to load the file using `require`, so that it be comes a JS object, then return some or all of the file, filtering or limiting the results, converting to a JSON string before returning.
    ```javascript
    const FOO_DATA = require("../../lib/foo.json");

    // ...
    statusCode = 200;
    body = JSON.stringify(FOO_DATA);
    ```
- Read the JSON file as text and return the file as text, if you are happy to serve the file unaltered. This will be more efficient because you don't process the contents of the file, and therefore it will be faster and cheaper.
    ```javascript
    const fs = require("fs");

    const FOO_DATA = fs.readFileSync('../../lib/foo.json', 'utf-8');

    // ...
    statusCode = 200;
    body = FOO_DATA;
    ```
- As a variation on the above, you could even use this approach to serve other formats such as YAML data or HTML pages.
    ```javascript
    const fs = require("fs");

    const FOO_DATA = fs.readFileSync('../../lib/foo.html', 'utf-8');

    // ...
    statusCode = 200;
    body = FOO_DATA;
    // OR 'Content-Type' if this doesn't work.
    headers = { contentType: "text/html" }
    ```

The file could exist somewhere like:

- In you repo root in version control (be careful that it doesn't get accidentally server publicly, using an ignore rule or moving the file at build time).
- In the build directory if created by Jekyll for example, before being moved to `netlify` for safety.
- In the `netlify` directory (in version control, or generated there directly).


## How do you know the Functions are only showing data to authorized users?

You can try an endpoint in the browser directly, but you'll get an error that you are missing a token.

- https://netlify-auth-quickstart.netlify.app/.netlify/functions/me

You can do a request with URL with a bad token and the endpoint will reject you.

> Token does not contain the required 'read:shows' scope

This is still useful in case you have a syntax error in your Function code, as the result will appear in the browser as an error traceback.

You can also check the Function Logs section of the Netlify settings.
