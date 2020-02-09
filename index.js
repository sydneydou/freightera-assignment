//   $(".table").append(`<li>${value.CityName}</li>`);

//append this is autocomplete options

$(document).ready(function() {
  $("#search").on("click", function() {
    event.preventDefault();

    $("#table-heading").empty();
    $("#table-value").empty();

    console.log($("#search-input").val());
    let searchInput = $("#search-input").val();

    $.ajax({
      method: "GET",
      url: "https://api.freightera.com/api/geolocation/" + searchInput
    }).done(function(data) {
      $.each(data[0], (key, value) => {
        $("#table-heading").append(`<th>${key}</th>`);
        $("#table-value").append(`<td>${value}</td>`);
      });
    });
    $("#search-input").val(" ");
  });
});
