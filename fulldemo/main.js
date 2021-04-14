import {Graph} from './Graph.js';
import * as constants from './constants.js';

var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
};


ready(() => {
  // Divs
  let next = document.getElementById("next");
  let back = document.getElementById("back");
  let body = document.getElementById("body-area");
  
  let graph = null;
  let cur_index = 0;

  back.disabled = true;
  body.innerHTML = constants.bodies[0][1];
  document.title = constants.bodies[0][0];

  let setHTML = (index) => {
    document.title = constants.bodies[index][0];
    body.innerHTML = constants.bodies[index][1];
    back.disabled = false;
    next.disabled = false;

    if (index == 2) {
      if (graph == null)
        graph = new Graph(document.getElementById('graph-space'));
      document.getElementById('size-submit').onclick = function(event) {
        event.preventDefault();
        graph.initialize(document.getElementById('size-entry').value);
      };
    }
    else if (index == 0)
      back.disabled = true;
    else if (index == constants.bodies.length - 1) {
      next.disabled = true;
    }
  }

  next.onclick = (event) => { setHTML(++cur_index); };
  back.onclick = (event) => { setHTML(--cur_index); };
});