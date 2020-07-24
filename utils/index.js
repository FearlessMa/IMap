const createElement = (src, type, element = 'script') => {
  const Ele = document.createElement(element);
  Ele.src = src;
  Ele.type = type;
  return Ele;
};

const appendElement = (element, parentElement = 'body') => {
  const parentEle = document.querySelector(parentElement);
  parentEle.appendChild(element);
  return parentEle;
};

export { createElement, appendElement };
