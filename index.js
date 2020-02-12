$(document).ready(function() {
  $("#search").on("click", function() {
    $("input").removeClass("hidden", 1000);
    $("#search").addClass("active-search", 1000);
  });
  $("#search-input").on("keypress", function() {
    let searchInput = $("#search-input").val();
    $.ajax({
      method: "GET",
      url: "https://api.freightera.com/api/geolocation/" + searchInput
    }).done(function(data) {
      let suggestedCity = [];
      let selectInput;
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

        let hyperlinkCity = data[i].CityName;
        data[i][
          "hyperlink"
        ] = `<a href='https://www.google.com/search?q=${hyperlinkCity}'>Click Here</a>`;

        $("#search-input")
          .autocomplete({
            source: suggestedCity,
            autoFocus: true,
            dataType: "json",
            minLength: 1,
            select: function(event, ui) {
              $("#search-input").val(ui.item.value);

              selectInput = $("#search-input").val();
            }
          })
          .focus(function() {
            $(this).autocomplete("search", $(this).val());
          });
      }

      $("#search").on("click", function() {
        event.preventDefault();

        let obj;

        if (selectInput) {
          let splt = selectInput.split(", ");
          obj = data.find(
            obj => obj.CityName == splt[0] && obj.province == splt[1]
          );
        }
        $("#table-heading").empty();
        $("#table-value").empty();
        $(".input-section").addClass("active-table", 1000);

        $.each(obj || data[0], (key, value) => {
          let titles = key.replace("CityName", "City Name");

          //maybe add, did you mean data[1]?

          $("#table-heading").append(`<th class='title'>${titles}</th>`);
          $("#table-value").append(`<td>${value}</td>`);
          $(".search-container ").addClass("show-table");
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
