// 虚拟dom元素的类
class Element {
  constructor(type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}
/**
 * @func 设置属性
 * @param {*} node 节点标签元素
 * @param {*} key 属性名称
 * @param {*} value  属性值
 */
function setArr(node, key, value) {
  switch (key) {
    // node 是一个input 或者textarea
    case "value":
      if (
        node.tagName.toUpperCase() === "INPUT" ||
        node.tagName.toUpperCase() === "TEXTAREA"
      ) {
        node.value = value;
      } else {
        node.setAttribute(key, value);
      }
      break;
    case "style":
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
}
// 返回虚拟节点
function createElement(type, props, children) {
  return new Element(type, props, children);
}

// render 方法可以将vnode转化成真实dom
function render(eleObj) {
  let el = document.createElement(eleObj.type);
  for (let key in eleObj.props) {
    // 设置属性的方法
    setArr(el, key, eleObj.props[key]);
  }
  eleObj.children.forEach(child => {
    // 首先判断子元素是否是createElement包裹的元素
    // 判断是否是他的实例
    // 如果不是则创建文本节点
    if (child instanceof Element) {
      child = render(child);
    } else {
      child = document.createTextNode(child);
    }
    el.appendChild(child);
  });
  return el;
}

// 将虚拟DOM插入到真实dom中去
function renderDom(el, target) {
  target.appendChild(el);
}
export { createElement, render, Element, renderDom };
