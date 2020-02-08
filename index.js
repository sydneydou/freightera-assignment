$(document).ready(function() {
  $.ajax({
    method: "GET",
    url: "https://api.freightera.com/api/geolocation/mex"
  }).done(function(data) {
    console.log(data);
  });
});
