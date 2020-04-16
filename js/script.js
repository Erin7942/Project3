console.clear();
(function (window, document) {
  var post = document.getElementById('post'),
      postOffset = post.scrollLeft,
      toggler = document.getElementById('js-toggle-reading-mode'),
      
      // Make the scroll speed a little slower (if < 1)
      SCROLL_SPEED_MULTIPLIER = 0.4,
      
      // The width of the element that's scrolled
      // Keeping track so that we don't scroll past it's edges
      postWidth,
      
      // Handle scrolls
      update = function (event) {
        var deltaX = event.wheelDeltaX,
            deltaY = event.wheelDeltaY;
        
        // Stop scrolling if we're at the end of the container
        if (postOffset > postWidth) {
          postOffset = postWidth;
          return;
        } 
        
        // Also stop if we're at the beginning
        if (postOffset < 0) {
          postOffset = 0;
          return;
        } 
        
        // No edge cases: do scrollin'
        event.preventDefault();

        // Vertical scroll detected
        if (Math.abs(deltaY) > 3) {
          postOffset -= (deltaY * SCROLL_SPEED_MULTIPLIER);
        }

        // Horizontal scroll detected
        else if (Math.abs(deltaX) > 3) {
          postOffset -= (deltaX * SCROLL_SPEED_MULTIPLIER);
        }

        // Do the actual scrolling
        post.scrollLeft = postOffset;
      },
      
      onResize = _.debounce(function () {
        postWidth = post.scrollWidth;
      }, 100),
  
      readMode = {
        'isHorz': true
      };
      
      var attachHorzMode = function () {
        post.classList.add('post-horizontal');
        onResize.call();
        post.addEventListener("wheel", update, false);
        window.addEventListener("resize", onResize, false);
      },
      
      detachHorzMode = function () {
        post.removeEventListener("wheel", update);
        window.removeEventListener("resize", onResize);
      },
      
      onToggleMode = function () {
        post.classList.toggle('post-horizontal');
        readMode.isHorz = !readMode.isHorz;
        
        (!readMode.isHorz ? detachHorzMode : attachHorzMode).call();
      },
      
      postWidth = post.scrollWidth;
  
  toggler.addEventListener('click', onToggleMode, false);
  if (readMode.isHorz) {
    attachHorzMode();
  } else {
    detachHorzMode();
  }
  
}(this, this.document));