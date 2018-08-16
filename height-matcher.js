(function (getBoundingClientRect) {

  /**
   * Gets an element's pixel height including borders and padding,
   * excluding margin
   */
  function getHeight(el) {
    var _ = el[getBoundingClientRect]();
    return _.bottom - _.top;
  }

  /*
   * 
   */
  function getTop(el) {
    return el[getBoundingClientRect]().top;
  }

  /*
   * Sets the height of an element so that its bounding box (offset height) will
   * be the height given, regardless of borders, padding, box-sizing or units of
   * measurement
   */
  function setHeight(el, height) {
    var style = el.style
    var actualHeight;

    // set the height naively
    style._height = style.height;
    style.height = height + 'px';

    // test the element's new height
    actualHeight = getHeight(el);

    // if it isn't correct, adjust
    if (actualHeight !== height) {
      style.height = (height + height - actualHeight) + 'px';
    }
  }

  /*
   * Removes any previously applied heights to an element
   */
  function restoreHeight(el) {
    el.style.height = el.style._height || '';
    el.style._height = null;
  }

  /*
   * Batches elements up into groups that lie on the same row as each other
   */
  function getRows(elems) {
    var rows = [];
    var elem;
    var i;

    for (i = 0; i < elems.length; i++) {
      elem = elems[i];

      // if this is the first element, or the top of this element isn't in line
      // with the previous element, start a new row
      if (!rows.length || Math.floor(Math.abs(getTop(elem) - getTop(elems[i-1]))) > 1) {
        rows.push([elem]);
      }
      // else, add to the end of the current row
      else {
        rows[rows.length - 1].push(elem);
      }
    }

    return rows;
  }

  /*
   * 
   */
  function matchHeight(elems, all) {
    var rows = all ? [elems] : getRows(elems);
    var maxHeight;
    var i, j;

    matchHeight.restore(elems);

    // in each row
    for (i = 0; i < rows.length; i++) {
      maxHeight = 0;
      
      // find the tallest element
      for (j = 0; j < rows[i].length; j++) {
        maxHeight = Math.max(getHeight(rows[i][j]), maxHeight);
      }
      
      // adjust all other elemets to match
      for (j = 0; j < rows[i].length; j++) {
        setHeight(rows[i][j], maxHeight);
      }
    }
  }
  
  /*
   *
   */
  matchHeight.restore = function (elems) {
    var i;
    
    for (i = 0; i < elems.length; i++) {
      restoreHeight(elems[i]);
    }
  }
  
  // expose the function
  window.matchHeight = matchHeight;
})('getBoundingClientRect'); // improves compression
