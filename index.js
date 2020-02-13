$(document).ready(function() {
  $("#search").on("click", function() {
    $("input").removeClass("hidden", 1000);
    $("#search").addClass("active-search", 1000);
  });
  $("#search-input").on("keypress", function() {
    let searchInput = $("#search-input").val();
    let value = " " + searchInput;
    $.ajax({
      method: "GET",
      headers: { "Content-Type": "application/json" },
      url: "https://api.freightera.com/api/geolocation/" + value
    })
      .done(function(data) {
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
          let hyperlinkCity;
          let hyperlinkProvince;
          if (selectInput) {
            let splt = selectInput.split(", ");
            obj = data.find(
              obj => obj.CityName == splt[0] && obj.province == splt[1]
            );
          } else {
            obj = data[0];
          }

          $("#table-heading").empty();
          $("#table-value").empty();
          $("table").addClass("table");
          $(".input-section").addClass("active-table", 1000);

          if (obj) {
            hyperlinkCity = obj.CityName;
            hyperlinkProvince = obj.province;
            obj[
              "CityName"
            ] = `<a class="value" target="_blank" href='https://www.google.com/search?q=${hyperlinkCity} ${hyperlinkProvince}'>${hyperlinkCity}</a>`;
          }

          $.each(obj || data[0], (key, value) => {
            let titles = key.replace("CityName", "City Name");
            $("#table-heading").append(`<th class='title'>${titles}</th>`);
            $("#table-value").append(
              `<td><div class="value">${value}</div></td>`
            );

            $(".search-container ").addClass("show-table");
          });

          $("#search-input").val("");
        });
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Error:" + textStatus);
      });
  });
});
