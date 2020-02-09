$(document).ready(function() {
  $("#search-input").on("keypress", function() {
    let searchInput = $("#search-input").val();

    $.ajax({
      method: "GET",
      url: "https://api.freightera.com/api/geolocation/" + searchInput
    }).done(function(data) {
      let suggestedCity = [];
      for (let i = 0; i < data.length; i++) {
        let cityname = data[i].CityName;
        suggestedCity.push(cityname);

        // console.log(data[i]);

        delete data[i].popular;
        delete data[i].country_full;
      }

      console.log(suggestedCity);

      $("#search-input")
        .autocomplete({
          source: suggestedCity,
          minLength: 0,
          autoFocus: true
        })
        .focus(function() {
          $(this).autocomplete("search", $(this).val());
        });

      $("#search").on("click", function() {
        event.preventDefault();

        $("#table-heading").empty();
        $("#table-value").empty();
        console.log(data);
        $.each(data[0], (key, value) => {
          let titles = key.replace("CityName", "City Name");

          $("#table-heading").append(`<th class='title'>${titles}</th>`);
          $("#table-value").append(`<td>${value}</td>`);
        });
        $("#search-input").val(" ");
      });
    });
    // .fail(() => {
    //   $(".table").prepend(
    //     "<p> Sorry, there was an error with your request </p>"
    //   );
    // });
  });
});
