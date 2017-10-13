// Add link href to the babble

module.exports = function(text) {
  return text.replace(/#(\w+)(?:\W|$)/g, '<a href="/stock/$1">#$1</a>');
};
