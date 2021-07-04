$(document).ready(async function () {
  if (typeof auth0 === 'undefined' || auth0 === 'null') {
    throw new Error('auth0 not set')
  }

  const token = await auth0.getTokenSilently();

  const options = {
    ajax: "data.json",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const target = $("#example");
  target.DataTable(options);
});
