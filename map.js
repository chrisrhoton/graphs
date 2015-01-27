var Edge = function(node, weight) {
  this.node     = node;
  this.weight   = weight;
};

var Node = function(name) {

  this.id         = name;
  this.edges   = {};

};

Node.prototype.addEdge = function(node, weight) {
  var edge = new Edge(node, weight);
  this.edges[node.id] = edge;
  return this;
};

Node.prototype.isConnected = function(nodeId) {
  return this.edges[nodeId] != null;
};

Node.prototype.getEdgeWeight = function(nodeId) {
  return this.edges[nodeId].weight;
};

Node.prototype.getEdges = function() {
  var keys = Object.keys(this.edges),
      self = this;

  if(keys.length === 0) return [];

  return keys.map( function(key) {
    return self.edges[key];
  });
};

var PriorityQueue = require('./priority-queue-array'),
    AugArray      = require('./augArray');

module.exports = function(){

  var cities = {};

  var addCity = function(name){

    if(cities[name]) {
      return this;
    }

    cities[name] = new Node(name);
    return this; 
    
  };

  var findPath = function(nodeIdA, nodeIdB) {

    var solved     = new AugArray(),
        startNode  = cities[nodeIdA],
        finishNode = cities[nodeIdB],
        discovered = new PriorityQueue();

    if(!startNode || !finishNode) {
      return null;
    }

    if(startNode.id === finishNode.id) {
      return 0;
    }

    discovered.add(startNode, 0);

    return _findPath(solved, discovered, nodeIdB);

  };

  var _findPath = function(solved, discovered, searchTerm) {

    var next       = discovered.removeMin(),
        pathWeight = null,
        edges   = [];

    while(next && solved.includes(next.node.id)) {
      next = discovered.removeMin();
    }

    while(next) {
      solved.push(next.node.id);
      pathWeight = next.distance;
      edges = next.node.getEdges();

      edges.forEach( function(edge) {
        discovered.add(edge.node, pathWeight + edge.weight);
      });

      next = discovered.removeMin();
      while(next && solved.includes(next.node.id)) {
        next = discovered.removeMin();
      }

      if(next && next.node.id === searchTerm) {
        return next.distance;
      }

    }

    return null;

  };

  var addRoad = function(nodeIdA, nodeIdB, weight){

    var nodeA   = cities[nodeIdA],
        nodeB   = cities[nodeIdB];

    if(!nodeA || !nodeB || weight <= 0 || nodeA === nodeB) {
      return false;
    }

    nodeA.addEdge(nodeB, weight);
    nodeB.addEdge(nodeA, weight);
    return true;

  };
  
  return {
    addCity: addCity,
    findPath: findPath,
    addRoad: addRoad
  }
}