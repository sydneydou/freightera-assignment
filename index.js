$(document).ready(function() {
  $("#search-input").on("input", function() {
    let searchInput = $("#search-input").val();
    $.ajax({
      method: "GET",
      url: "https://api.freightera.com/api/geolocation/" + searchInput
    }).done(function(data) {
      let suggestedCity = [];
      for (let i = 0; i < data.length; i++) {
        let cityname = data[i].CityName + ", " + data[i].province;
        suggestedCity.push(cityname);

        [
          "popular",
          "country_full",
          "dif",
          "per_dif",
          "soundex",
          "scale"
        ].forEach(key => delete data[i][key]);

        console.log(searchInput);

        console.log(suggestedCity);
        if (suggestedCity) {
          $("#search-input")
            .autocomplete({
              source: suggestedCity,
              autoFocus: true
            })
            .focus(function() {
              $(this).autocomplete("search", $(this).val());
            });
        }
      }
      $("#search").on("click", function() {
        event.preventDefault();

        console.log(data);
        $("#table-heading").empty();
        $("#table-value").empty();

        console.log(data);

        $(".search-container ").addClass("show-table");
        $.each(data[0], (key, value) => {
          let titles = key.replace("CityName", "City Name");

          $("#table-heading").append(`<th class='title'>${titles}</th>`);
          $("#table-value").append(`<td>${value}</td>`);
        });
        $("#search-input").val(" ");
      });
    });
  });
  // .fail(() => {
  //   $(".table").prepend(
  //     "<p> Sorry, there was an error with your request </p>"
  //   );
  // });
});
