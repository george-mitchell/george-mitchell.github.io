// Get the list of blog posts
var posts = document.querySelectorAll('.post');

// Convert the NodeList to an array
posts = Array.prototype.slice.call(posts);

// Sort the posts by date
posts.sort(function(a, b) {
  var dateA = new Date(a.querySelector('.date').textContent);
  var dateB = new Date(b.querySelector('.date').textContent);
  return dateA - dateB;
});

// Append the sorted posts back to the page
var container = document.querySelector('#posts-container');
container.innerHTML = '';
posts.forEach(function(post) {
  container.appendChild(post);
});