# Set up and run

How to set up and run this example.


## Notes

- None of the details used here are sensitive. You can commit them safely.
- In this example, the intended URL for the app will be `https://netlify-auth-quickstart.netlify.app`, so that is used throughout.


## Local development

You can **no** longer use `http` URLs when configuring the Auth0 app, when means that `http:localhost` will be rejected when configuring. So you **must** set up a remote-only app - or figure out a way to get localhost running on `https` and with a cert.

If you just want to edit the HTML and JS files and preview the UI locally, then start a web server in the [public](/public/) directory.


## Steps

### 1. Create repo

1. Fork this repo on GitHub so that you can edit the code.

### 1. Auth0

1. Set up an account on [Auth0](https://auth0.com).
    - A free account will be fine - it allows thousands of request a month on the free tier.
1. Go to Applications tab and create an application.
1. Configure it. Example values:
    - Name: `Netlify Function Auth Quickstart`
    - Application: `Single-Page Application`
    - Application Login URI, Allowed Callback URLs, Allowed Logout URLs, Allowed Web Origins - set all of them to `https://netlify-auth-quickstart.netlify.app`
1. Take note of auto-generated values. Example:
    - Domain: `dev-x1rgzxvi.us.auth0.com`
    - Client ID - `bzH1tzixL8W34435UoA67hjVhk3AieEd`
    - Client Secret - this must be kept **secret** and never made public or in version control. You do **not** need this value fo this project.
1. Go to APIs tab and create API.
1. Configure it. Example values:
    - Name: `Netlify Function Auth Quickstart`
    - Identifier (audience) - `https://netlify-auth-quickstart.netlify.app/` (your app URL)
    - Permissions: Add item:
        - Permisions: `read:shows`
        - Description: `Shows`

### 2. Netlify

1. Set up an account on [Netlify](https://netlify.com).
    - The free tier has plenty of allocated usage to build multiple projects for free. You can also configure your app with a custom domain that you own, without being billed by Netlify.
1. Create a Netlify app, hooked
1. Set environment variables under _Build & Deploy_ then _Environment_. Example values:
    - `JWT_AUDIENCE` - `https://netlify-auth-quickstart.netlify.app/` (your app URL)
    - `JWT_ISSUER` - `https://dev-x1rgzxvi.us.auth0.com/` (from `Domain` in Auth0)

### 3. Configure codebase

1. Edit the [public/auth_config.json](/public/auth_config.json) file.
1. Configure all the values in the file. Note when protocol or trailing slash are added or excluded - your app can break otherwise. Example:
    - `domain` - `dev-x1rgzxvi.us.auth0.com` (from `Domain` in Auth0)
    - `clientId` - `bzH1tzixL8W34435UoA67hjVhk3AieEd` (from `Client ID` in Auth0)
    - `audience` `https://netlify-auth-quickstart.netlify.app/` (your app URL)
    - `scope` - `openid profile read:shows` (standard permissions plus a custom scope)

When you commit on GitHub or push local code, that will trigger Netlify to run.

Now you can test your site on your app URL.

Sign in as your Auth0 user.

Or in Auth0, create a new user by email address and sent out an invite.

You can also enable Registration so that any user can register at the Auth0 sign-in screen in your flow.
