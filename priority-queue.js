module.exports = function() {

  // Array-based heap implementation
  // Root: i = 0
  // Children: 2i+1, 2i+2
  // Parent: Math.floor(((i-1)/2))
  var queue = [];

  // Using distance here to mean the total
  // cost to reach this node.
  var insert = function(node, distance) {

    var length,
        nodeIndex,
        parentIndex,
        temp;

    queue.push({
      node: node,
      distance: distance
    });

    length = queue.length;
    nodeIndex = length - 1;

    parentIndex = Math.floor(((nodeIndex - 1) / 2));

    while(parentIndex >= 0 && queue[nodeIndex].distance < queue[parentIndex].distance) {
      temp = queue[nodeIndex];
      queue[nodeIndex] = queue[parentIndex];
      queue[parentIndex] = temp;

      nodeIndex = parentIndex;
      parentIndex = Math.floor(((nodeIndex - 1) / 2));
    }
    return;

  };

  var getMinChildIndex = function(index) {

    var leftIndex     = 2*index + 1,
        rightIndex    = 2*index + 2,
        length        = queue.length;

    if(leftIndex < length && rightIndex < length) {
      return queue[leftIndex].distance < queue[rightIndex].distance ? leftIndex : rightIndex;
    }
    else if(leftIndex < length && rightIndex >= length) {
      return leftIndex;
    }
    else if(rightIndex < length && leftIndex >= length) {
      return rightIndex;
    }
    else {
      return null;
    }

  }

  var removeMin = function() {

    var minNode,
        lastNode,
        minChildIndex,
        currIndex,
        temp;

    if(queue.length === 0) {
      return null;
    }

    minNode   = queue[0];
    lastNode  = queue.pop();

    if(queue.length === 0) {
      return minNode;
    }

    queue[0]      = lastNode;
    currIndex     = 0;
    minChildIndex = getMinChildIndex(currIndex);

    while(minChildIndex !== null && queue[currIndex].distance > queue[minChildIndex].distance) {
      // Swap
      temp                  = queue[currIndex];
      queue[currIndex]      = queue[minChildIndex];
      queue[minChildIndex]  = temp;

      currIndex     = minChildIndex;
      minChildIndex = getMinChildIndex(currIndex);
    }
    return minNode;

  };

  return {
    insert: insert,
    removeMin: removeMin
  };

};