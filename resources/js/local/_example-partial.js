
// add a class of 'intro' to the first paragraph
// do this on every page apart from the blog page
if (!page('blog'))
{
  const intro = document.querySelector('.content > p');

  if (intro) {
    intro.classList.add('intro');
  }
}
