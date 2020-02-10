$(document).ready(function() {
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

        $("#search-input")
          .autocomplete({
            source: suggestedCity,
            autoFocus: true,
            dataType: "json",
            select: function(event, ui) {
              $("#search-input").val(ui.item.value);

              selectInput = $("#search-input").val();
              console.log(selectInput);
            }
          })
          .focus(function() {
            $(this).autocomplete("search", $(this).val());
            console.log($(this).val());
          });

        [
          ("popular", "country_full", "dif", "per_dif", "soundex", "scale")
        ].forEach(key => delete data[i][key]);
      }

      $("#search").on("click", function() {
        event.preventDefault();

        console.log(selectInput);
        if (selectInput) {
          let splt = selectInput.split(",");
          console.log(splt);
          console.log(data);

          let obj = data.find(obj => obj.CityName == splt[0]);
          console.log(obj);
        }

        $("#table-heading").empty();
        $("#table-value").empty();

        $(".search-container ").addClass("show-table");

        $.each(obj || data[0], (key, value) => {
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
