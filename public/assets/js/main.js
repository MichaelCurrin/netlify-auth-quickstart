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
  const elSelector = "#example"

  await initialize();

  console.log('Checking login status')
  const token = await auth0.getTokenSilently();

  if (token.isAuthenticated()) {
    console.log("Setting up DataTable");
    setupTable(elSelector, PEOPLE_URL, token)
  } else {
    alert('Not authenticated!')
  }
});
