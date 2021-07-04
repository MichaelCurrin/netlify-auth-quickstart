// URL mapping, from hash to a function that responds to that URL action.
const router = {
  "/": () => showContent("content-home"),
  "/#/login": () => login(),
  "/#/profile": () =>
    requireAuth(() => showContent("content-profile"), "/#/profile"),
  "/#/external-api": () =>
    requireAuth(() => showContent("content-external-api"), "/#/external-api"),
};

/**
 * Iterate over the elements matching 'selector' and passes them to 'fn'.
 *
 * @param {string} selector The CSS selector to find
 * @param {Function} fn The function to execute for every element
 */
function eachElement(selector, fn) {
  for (let e of document.querySelectorAll(selector)) {
    fn(e);
  }
}

// Warning - those this was based is badly organized. app.js depends on ui.js but ui.js here has
// showContentFromUrl which depends on app.js.
/**
 * Display a content panel that is referenced by the specified route URL. These are matched using
 * the router.
 *
 * @param {*} url The route URL.
 */
function showContentFromUrl(url) {
  if (router[url]) {
    router[url]();

    return true;
  }

  return false;
}

/**
 * @param {*} el The element to check.
 */
function isRouteLink(el) {
  return el.tagName === "A" && el.classList.contains("route-link");
}

/**
 * Display a content panel specified by the given element ID.
 *
 * All the panels that participate in this flow should have the 'page' class applied, so that it can
 * be correctly hidden before the requested content is shown.
 *
 * @param {string} id The ID of the content to show.
 */
function showContent(id) {
  eachElement(".page", (p) => p.classList.add("hidden"));

  document.getElementById(id).classList.remove("hidden");
}

/**
 * Update the user interface.
 */
async function updateUI() {
  try {
    const isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
      const user = await auth0.getUser();

      document.getElementById("profile-data").innerText = JSON.stringify(
        user,
        null,
        2
      );

      document.querySelectorAll("pre code").forEach(hljs.highlightBlock);

      eachElement(".profile-image", (e) => (e.src = user.picture));
      eachElement(".user-name", (e) => (e.innerText = user.name));
      eachElement(".user-email", (e) => (e.innerText = user.email));
      eachElement(".auth-invisible", (e) => e.classList.add("hidden"));
      eachElement(".auth-visible", (e) => e.classList.remove("hidden"));
    } else {
      eachElement(".auth-invisible", (e) => e.classList.remove("hidden"));
      eachElement(".auth-visible", (e) => e.classList.add("hidden"));
    }
  } catch (err) {
    console.log("Error updating UI!", err);

    return;
  }

  console.log("UI updated");
}

window.onpopstate = (e) => {
  if (e.state && e.state.url && router[e.state.url]) {
    showContentFromUrl(e.state.url);
  }
};
