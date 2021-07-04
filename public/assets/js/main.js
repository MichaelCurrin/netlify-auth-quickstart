$(document).ready(async function () {
  console.log("Setting up DataTable")

  if (typeof auth0 === 'undefined') {
    console.error('auth0 not defined')
    return
  }
  else if (auth0 === null) {
    console.warn('auth0 not set - not logged in?')
    return
  } else {
    console.log('Authenticated!')
  }

  const token = await auth0.getTokenSilently();

  const options = {
    ajax: {
      url: PEOPLE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  };

  const target = $("#example");
  target.DataTable(options);
});
