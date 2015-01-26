module.exports = function() {

  var queue = [];

  var sortByDistance = function(a, b) {
    return a.distance - b.distance;
  }

  // Using distance here to mean the total
  // cost to reach this node.
  var add = function(node, distance) {
    queue.push({
      node: node,
      distance: distance
    });
  };

  var removeMin = function() {
    if(queue.length === 0) return null;

    queue.sort(sortByDistance);
    return queue.shift();
  }

  return {
    add: add,
    removeMin: removeMin
  }

};