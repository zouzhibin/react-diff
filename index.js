import React from "react";
import ReactDOM from "react-dom";
import { createElement, render, renderDom } from "./element";
import diff from './diff'

let vertualDom = createElement("ul", { class: "list" }, [
  createElement("li", { class: "item" }, ["a"]),
  createElement("li", { class: "item" }, ["b"]),
  createElement("li", { class: "item" }, ["c"])
]);

let vertualDom1 = createElement("ul", { class: "list-group" }, [
    createElement("li", { class: "item" }, ["1"]),
    createElement("li", { class: "item" }, ["b"]),
    createElement("li", { class: "item" }, ["3"])
  ]);
let el = render(vertualDom);
renderDom(el, document.getElementById("root"));
let patch = diff(vertualDom,vertualDom1)
console.log(vertualDom, el);
// ReactDOM.render(vertualDom, document.getElementById('root'));

// DOM Diff 比较两个DOM区别 比较两个对象的区别
// dom diff作用 根据两个虚拟对象创建出补丁 描述改变的内容
// 将这个补丁用来更新dom
