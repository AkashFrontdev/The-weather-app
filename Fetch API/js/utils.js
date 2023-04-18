function selectElement(selector, parent = document) {
    return parent.querySelector(selector);
  }
  
  function createElement(elementName) {
    return document.createElement(elementName);
  }
  
  function debounce(callback, wait) {
    let timeoutId = null;
  
    return (...args) => {
      window.clearTimeout(timeoutId);
  
      timeoutId = setTimeout(() => {
        callback.apply(null, args);
      }, wait);
    };
  }
  
  let request = async (path, options = { method: 'GET' }) => {
    let res = await fetch(`${BASE_URL}${path}`, options);
  
    let data = await res.json();
  
    return data;
  };
  