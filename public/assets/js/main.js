$(document).ready(async function () {
  console.log("Setting up DataTable");

  await initialize();

  if (auth0 === null) {
    console.warn("auth0 not set - not logged in?");
    return;
  } else {
    console.log("Authenticated!");
  }

  const token = await auth0.getTokenSilently();

  const options = {
    ajax: {
      url: PEOPLE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };

  const target = $("#example");
  target.DataTable(options);
});
