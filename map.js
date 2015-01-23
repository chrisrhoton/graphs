var Vertex = function(node, weight) {
  this.node     = node;
  this.weight   = weight;
};

var Node = function(name) {

  this.id         = name;
  this.vertices   = {};

};

Node.prototype.addVertex = function(node, weight) {
  var vertex = new Vertex(node, weight);
  this.vertices[node.id] = vertex;
  return this;
};

Node.prototype.isConnected = function(nodeId) {
  return this.vertices[nodeId] != null;
};

Node.prototype.getVertexWeight = function(nodeId) {
  return this.vertices[nodeId].weight;
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
        vertexIds    = Object.keys(currNode.vertices),
        numVertices  = vertexIds.length,
        i,
        vertex;

    path.push(currNode.id);

    if(currNode.isConnected(searchNodeId)) {
      return currNode.getVertexWeight(searchNodeId);
    }

    for(i = 0; i < numVertices; i++) {
      vertex = currNode.vertices[vertexIds[i]];
      // Ignore any node already in our path
      if(path.indexOf(vertex.node.id) !== -1 ) {
        continue;
      }

      // Recurse
      weight = _findPath(vertex.node, searchNodeId, path);

      // If weight is null, we didn't find the node.  Need to
      // reset the path to strip of nodes added during the
      // recursive call
      if(!weight) {
        path = path.slice(0, path.indexOf(currNode.id) + 1);
      }
      else {
        return weight + currNode.getVertexWeight(vertex.node.id);
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

    nodeA.addVertex(nodeB, weight);
    nodeB.addVertex(nodeA, weight);
    return true;

  };
  
  return {
    addCity: addCity,
    findPath: findPath,
    addRoad: addRoad
  }
}