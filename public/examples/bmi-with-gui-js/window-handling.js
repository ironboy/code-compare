// Create a new window and add html to it, create a button to open it
export function createWindow($, title, sizeYPercent, sizeXPercent, html){
  document.title = title; // set title of window
  $('body').innerHTML = location.search.includes('run') ?
    html : '<button class="run">Run program</button>';
  $('.run')?.addEventListener('click', () => {
    // get the screen dimensions
    let screenWidth = window.screen.width;
    let screenHeight = window.screen.height;
    // calculate window size
    let windowWidth = screenWidth * sizeXPercent / 100;
    let windowHeight = screenHeight * sizeYPercent / 100 - 28;
    // calculate offset for centering
    let centerX = screenWidth / 2 - windowWidth / 2;
    let centerY = screenHeight / 2 - windowHeight / 2;
    // size and offset the window correctly
    open('?run', title, `left=${centerX},top=${centerY},` + 
      `width=${windowWidth},height=${windowHeight}`);
  });
}