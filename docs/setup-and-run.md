# Set up and run

How to set up and run this example.


## Notes

- None of the details used here are sensitive. You can commit them safely.
- In this example, the intended URL for the app will be `https://netlify-auth-quickstart.netlify.app`, so that is used throughout.


## Local development

You can **no** longer use `http` URLs when configuring the Auth0 app, when means that `http:localhost` will be rejected when configuring. So you **must** set up a remote-only app - or figure out a way to get localhost running on `https` and with a cert.

If you just want to edit the HTML and JS files and preview the UI locally, then start a web server in the [public](/public/) directory.


## Steps

### 0. Planned config values

Before you start, make sure to define the following desired values, which you'll use across Netlify, Auth0 and your codebase.

- Netlify app URL (aka `Domain` or `Audience`) 
    - e.g. `https://netlify-auth-quickstart.netlify.app/` for this tutorial. 
    - e.g. `https://my-app.netlify.app/`.
- Auth0 app URL (aka `JWT Issuer`)
    - e.g. `dev-x1rgzxvi.eu.auth0.com` for this tutorial as an auto-generated value.
    - e.g. `my-app.eu.auth0.com`.
- Auth0 permissions, if you want to use this feature.
    - e.g. `read:shows`

### 1. Create repo

1. Get a copy of this repo.
    - [Use this template](https://github.com/MichaelCurrin/netlify-auth-quickstart/generate).
    - Or fork this repo (just know that your repo will diverge from the original because of config changes, so it can be contributing PRs harder).

### 2. Auth0

1. Set up an account on [Auth0](https://auth0.com).
    - A free account will be fine - it allows thousands of request a month on the free tier.
    - Sign up with your GitHub account if you like , for passwordless sign in.
1. Create a tenant.
    - You might want to keep the generated default one as your dev environment. e.g. `dev-x1rgzxvi.us.auth0.com` for this tutorial.
    - This can't be renamed.
    - You can make new ones later for staging and production. e.g. `my-app.eu.auth0.com`.
1. Go to Applications tab and create an application.
1. Configure it. Example values:
    - Name: `Netlify Auth Quickstart`
    - Application: `Single-Page Application`
    - Application Login URI, Allowed Callback URLs, Allowed Logout URLs, Allowed Web Origins - set all of them to `https://netlify-auth-quickstart.netlify.app`
1. Take note of auto-generated values. Example:
    - Domain: `dev-x1rgzxvi.us.auth0.com`
    - Client ID - `bzH1tzixL8W34435UoA67hjVhk3AieEd`
    - Client Secret - this must be kept **secret** and never made public or in version control. You do **not** need this value fo this project.
1. Go to APIs tab and create API.
1. Configure it. Example values:
    - Name: `Netlify Auth Quickstart`
    - Identifier (audience) - `https://netlify-auth-quickstart.netlify.app/` (your app URL)
    - Permissions: Add item:
        - Permisions: `read:shows`
        - Description: `Shows`

### 3. Netlify

1. Set up an account on [Netlify](https://netlify.com).
    - The free tier has plenty of allocated usage to build multiple projects for free. You can also configure your app with a custom domain that you own, without being billed by Netlify.
1. Create a Netlify app, hooked
1. Set environment variables under _Build & Deploy_ then _Environment_. Example values:
    - `JWT_AUDIENCE` - `https://netlify-auth-quickstart.netlify.app/` (your app URL)
    - `JWT_ISSUER` - `https://dev-x1rgzxvi.us.auth0.com/` (from `Domain` in Auth0)

### 4. Configure codebase

1. Edit the [public/auth_config.json](/public/auth_config.json) file.
1. Configure all the values in the file. Note when protocol or trailing slash are added or excluded - your app can break otherwise. Example:
    - `domain` - `dev-x1rgzxvi.us.auth0.com` (from `Domain` in Auth0)
    - `clientId` - `bzH1tzixL8W34435UoA67hjVhk3AieEd` (from `Client ID` in Auth0)
    - `audience` `https://netlify-auth-quickstart.netlify.app/` (your app URL)
    - `scope` - `openid profile read:shows` (standard permissions plus a custom scope)

When you commit on GitHub or push local code, that will trigger Netlify to deploy your app.

### 5. Testing

Now you can test your site on your app URL.

Sign in as your Auth0 user.

Or, in Auth0, create a new user by email address and sent out an invite.

You can also enable _Registration_ so that any user can register at the Auth0 login screen.
