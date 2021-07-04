function setupTable(elSelector, url, token) {
  const options = {
    ajax: {
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };

  $(elSelector).DataTable(options);
}

$(document).ready(async function () {
  const elSelector = "#example";

  await initialize();

  if (!auth0.isAuthenticated()) {
    alert("Please login from the homepage");

    return;
  }

  let token = null;

  try {
    token = await auth0.getTokenSilently();
  } catch (e) {
    console.error(e);

    return;
  }

  console.log("Setting up DataTable");
  setupTable(elSelector, PEOPLE_URL, token);
});
