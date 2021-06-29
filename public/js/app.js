const SHOWS_URL = "/.netlify/functions/shows"

let auth0 = null;

/**
 * Starts the authentication flow
 */
async function login(targetUrl) {
  try {
    console.log("Logging in", targetUrl);

    const options = {
      redirect_uri: window.location.origin
    };

    if (targetUrl) {
      options.appState = { targetUrl };
    }

    await auth0.loginWithRedirect(options);
  } catch (err) {
    console.log("Log in failed", err);
  }
}

/**
 * Executes the logout flow
 */
function logout() {
  try {
    console.log("Logging out");
    auth0.logout({
      returnTo: window.location.origin
    });
  } catch (err) {
    console.log("Log out failed", err);
  }
}

/**
 * Retrieve the auth configuration from the server
 */
function fetchAuthConfig() {
  return fetch("/auth_config.json");
}

/**
 * Initialize the Auth0 client.
 */
async function configureClient() {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId
  });
}

/**
 * Check if the user is authenticated. If so, `fn` is executed. Otherwise, the user is prompted to
 * log in.
 *
 * @param {*} fn The function to execute if the user is logged in
 */
async function requireAuth(fn, targetUrl) {
  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    return fn();
  }

  return login(targetUrl);
};

/**
 * Call the API endpoint with an authorization token.
 */
async function callApi(url) {
  try {
    const token = await auth0.getTokenSilently();
    const payload = {
      method: 'POST',
      body: "",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await fetch(url, payload);

    const json = await response.json();
    const responseElement = document.getElementById("api-call-result");

    responseElement.innerText = JSON.stringify(json, {}, 2);

    document.querySelectorAll("pre code").forEach(hljs.highlightBlock);

    eachElement(".result-block", (c) => c.classList.add("show"));
  } catch (e) {
    console.error(e);
  }
}

window.onload = async () => {
  await configureClient();

  // If unable to parse the history hash, default to the root URL
  if (!showContentFromUrl(window.location.pathname)) {
    showContentFromUrl("/");
    window.history.replaceState({ url: "/" }, {}, "/");
  }

  const bodyElement = document.getElementsByTagName("body")[0];

  // Listen out for clicks on any hyperlink that navigates to a #/ URL
  bodyElement.addEventListener("click", (e) => {
    if (isRouteLink(e.target)) {
      const url = e.target.getAttribute("href");

      if (showContentFromUrl(url)) {
        e.preventDefault();
        window.history.pushState({ url }, {}, url);
      }
    } else if (e.target.getAttribute("id") === "call-api") {
      e.preventDefault();

      callApi(SHOWS_URL);
    }
  });

  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    console.log("> User is authenticated");
    window.history.replaceState({}, document.title, window.location.pathname);
    updateUI();

    return;
  }

  console.log("> User not authenticated");

  const query = window.location.search;
  const shouldParseResult = query.includes("code=") && query.includes("state=");

  if (shouldParseResult) {
    console.log("> Parsing redirect");
    try {
      const result = await auth0.handleRedirectCallback();

      if (result.appState && result.appState.targetUrl) {
        showContentFromUrl(result.appState.targetUrl);
      }

      console.log("Logged in!");
    } catch (err) {
      console.log("Error parsing redirect:", err);
    }

    window.history.replaceState({}, document.title, "/");
  }

  updateUI();
};