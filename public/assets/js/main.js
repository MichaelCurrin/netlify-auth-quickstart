$(document).ready(function () {
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
