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

    var nodeA   = cities[nodeIdA],
        nodeB   = cities[nodeIdB],
        path    = [];

    if(!nodeA || !nodeB) {
      return null;
    }

    if(nodeA.id === nodeB.id) {
      return 0;
    }

    return _findPath(nodeA, nodeIdB, path);
  };

  var _findPath = function(currNode, searchNodeId, path) {

    var weight       = null,
        edgeIds    = Object.keys(currNode.edges),
        numEdges  = edgeIds.length,
        i,
        edge;

    path.push(currNode.id);

    if(currNode.isConnected(searchNodeId)) {
      return currNode.getEdgeWeight(searchNodeId);
    }

    for(i = 0; i < numEdges; i++) {
      edge = currNode.edges[edgeIds[i]];
      // Ignore any node already in our path
      if(path.indexOf(edge.node.id) !== -1 ) {
        continue;
      }

      // Recurse
      weight = _findPath(edge.node, searchNodeId, path);

      // If weight is null, we didn't find the node.  Need to
      // reset the path to strip of nodes added during the
      // recursive call
      if(!weight) {
        path = path.slice(0, path.indexOf(currNode.id) + 1);
      }
      else {
        return weight + currNode.getEdgeWeight(edge.node.id);
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