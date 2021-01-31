/**
 * DEBOUNCE FUNCTION
 * Make sure callback cannot be called too often (only every "interval" ms).
 */
function debounce(callback, interval) {
  let timer;
  return _ => {
    clearTimeout(timer);
    timer = setTimeout(_ => {
      timer = null;
      callback.apply(this, arguments);

    }, interval)
  };
}

export {debounce};