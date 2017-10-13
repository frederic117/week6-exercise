$(document).ready(function() {
  // Add link href to the babble

  // function putLink(text) {
  //   return text.replace(/#(\w+)(?:\W|$)/g, '<a href="/stock/$1">#$1</a>');

  const link = $(".babble-body")
    .html()
    .replace(/#(\w+)(\W|$)/g, '<a href="/stock/$1">#$1$2</a>');

  $(".babble-body").html(link);
  console.log(link);
});
