import {NormalNodeSize, EnlargedNodeSize} from './constants.js'
import {Matrix} from './Matrix.js'

export class Graph {
  constructor(div) {
    this.div = div;
    this.paper = null;
    this.nodes = [];
    this.edges = [];
    this.values = [];
    this.initialized = false;
    this.matrix = null;
  }

  /**
   * Construct a circular graph of num nodes
   * @param {number} num Number of nodes in the graph
   */
  createGraph(num) {
    // Degree of separation between nodes
    let deg = 360 / num;
    // Stating position offset, makes the graph look a little better
    let offset = (num % 2) ? 90 : ((num % 4) ? 0 : 45 / (num / 4));
    // Save the graph's context
    let graph = this;

    for (let i = 0; i < num; i++) {
      this.values.push([]);
      for (let j = 0; j < num; j++)
        this.values[i].push([]);
    }

    // Create (num) nodes in a (num)-gon pattern
    for (let i = 0; i < num; i++) {
      this.nodes.push(this.paper.circle(
        this.paper.width * (.5 + .375 * dCos(deg * i - offset)),
        this.paper.height * (.5 + .375 * dSin(deg * i - offset)),
        10
      ));

      // Set circle fill
      this.nodes[i].attr({ "fill": "#f00", "stroke": "#f00" });
      this.nodes[i].node.setAttribute('class', 'node');

      // Create hover animation for nodes
      this.nodes[i].hover(
        function () {
          // Enlarge circle
          this.animate({ 'r': EnlargedNodeSize, 'stroke-width': 0 }, 100, 'linear');

          // Fill in incident edges
          graph.edges.forEach(edge => {
            if ((edge.start === i || edge.end === i) && edge.path.attr('stroke') === 'black') {
              edge.path.attr('opacity', 1);
              document.getElementsByName(index(edge.start, edge.end))[0].style.background = 'yellow';
              if (edge.start !== edge.end)
                document.getElementsByName(index(edge.end, edge.start))[0].style.background = 'yellow';
            }
          });
        },

        function () {
          // Shrink circle
          this.animate({ 'r': NormalNodeSize, 'stroke-width': 0 }, 300, 'linear');

          // Uncolor incident edges
          graph.edges.forEach(item => {
            if ((item.start === i || item.end === i) && item.path.attr('stroke') === 'black') {
              item.path.attr('opacity', 0.6);
              document.getElementsByName(index(item.start, item.end))[0].style.removeProperty('background');
              if (item.start !== item.end)
                document.getElementsByName(index(item.end, item.start))[0].style.removeProperty('background');
            }
          });
        });
    }
    // Create edges between nodes
    let createEdge = function (edge) {
      edge.attr({ 'stroke': 'grey', 'opacity': 0.3 });
      edge.hover(
        function () {
          if (this.attr('stroke') == 'black') {
            this.attr('opacity', 1);
            graph.edges.forEach(item => {
              if (item.path === this) {
                document.getElementsByName(index(item.start, item.end))[0].style.background = 'yellow';
                if (item.start !== item.end)
                  document.getElementsByName(index(item.end, item.start))[0].style.background = 'yellow';
              }
            });
          }
        },
        function () {
          if (this.attr('stroke') == 'black')
            this.attr('opacity', 0.6);
          graph.edges.forEach(item => {
            if (item.path === this) {
              document.getElementsByName(index(item.start, item.end))[0].style.removeProperty('background');
              if (item.start !== item.end)
                document.getElementsByName(index(item.end, item.start))[0].style.removeProperty('background');
            }
          });
        }
      );
    }

    // Iterate through each node position
    for (let node1 = 0; node1 < num; node1++) {
      // Iterate through future node positions
      for (let node2 = node1 + 1; node2 < num; node2++) {
        let c1 = this.nodes[node1].attr();
        let c2 = this.nodes[node2].attr();
        let path = "M" + c1.cx + "," + c1.cy + " L" + c2.cx + "," + c2.cy;
        let edge = this.paper.path(path);
        createEdge(edge);

        this.edges.push(
          {
            start: node1,
            end: node2,
            path: edge
          }
        );
      }
    }

    // Draw nodes on top of edges
    for (let i = 0; i < this.nodes.length; i++)
      this.nodes[i].toFront();

    this.initialized = true;
  }

  /**
   * Update an edge to have a new value
   * @param {Array} nodes Pair of node indices this edge is between
   * @param {number} value New value for the edge
   */
  UpdateEdge(nodes, value) {
    // Match matrix entries to indices
    nodes[0]--; nodes[1]--;

    // Look for edge in edges
    this.edges.forEach(item => {
      if (nodes[0] === item.start && nodes[1] === item.end) {
        if (value == 0)
          item.path.attr({ 'stroke-width': 1, 'stroke': 'grey', 'opacity': .3 });
        else
          item.path.attr({ 'stroke-width': value * 10, 'stroke': 'black', 'opacity': .6 });

        return;
      }
    });
  }

  setValue(row, col, value) {
    this.values[row][col] = value;
  }

  initialize(size) {
    let paperSize = Math.min(this.div.offsetWidth, this.div.offsetHeight) * .75;
    this.paper = Raphael(this.div, paperSize, paperSize);
    document.getElementById("graph-space").innerHTML = "";
    document.getElementById("matrix").innerHTML = "";

    this.matrix = new Matrix();
    if (this.matrix.createMatrix(size) == false)
      return;
    
    this.createGraph(size);

    Array.from(document.getElementsByClassName("relation")).forEach(
      (element) => { element.addEventListener("input", function () { UpdateGraph(this, graph) }); }
    );
  }

  update(context) {
    // Set opposite entry value to this one's to preserve symmetry
    let index = context.name.match(/\d+/g).map(n => parseInt(n));
    if (index[0] !== index[1]) {
      let new_index = '(' + index[1] + ', ' + index[0] + ')';
      document.getElementsByName(new_index)[0].value = context.value;
    }

    // Make sure value is a number in [0, 1]
    if (isNaN(context.value) || context.value > 1 || context.value < 0) {
      context.backgroundcolor = red;
      return;
    }

    this.setValue(index[0], index[1], context.value);

    // Update edge
    this.UpdateEdge(index, context.value);
  }
}

/** Compute the cosine for deg given in degrees */
function dCos(deg) { return Math.cos(deg * Math.PI / 180); }

/** Compute the sine for deg given in degrees */
function dSin(deg) { return Math.sin(deg * Math.PI / 180); }

function index(a, b) { return `(${a + 1}, ${b + 1})`; }