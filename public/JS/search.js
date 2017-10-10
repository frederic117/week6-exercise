// BE CARREFUL this feature required JQuery

$("#search-query").autocomplete({
  source: function(request, response) {
    console.log("test");
    axios
      .get("/search_stock", {
        params: {
          term: request.term
        }
      })
      .then(result => {
        response(
          $.map(result.data, function(el) {
            return {
              label: el.longName,
              value: el._id
            };
          })
        );
      });
  },

  // The minimum number of characters a user must type before a search is performed.
  minLength: 2,

  // set an onFocus event to show the result on input field when result is focused
  focus: function(event, ui) {
    this.id = ui.item.longLabel;
    // Prevent other event from not being execute
    event.preventDefault();
  },
  select: function(event, ui) {
    // Prevent value from being put in the input:
    this.id = ui.item.longLabel;
    // Set the id to the next input hidden field
    $(this)
      .next("input")
      .val(ui.item.id);
    // Prevent other event from not being execute
    event.preventDefault();
    // optionnal: submit the form after field has been filled up
    $("#quicksearch").submit();
  }
});
