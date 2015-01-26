// Just an augmented array.  There were operations I was
// going to be doing a lot on a regular array so, rather
// than messing with the built in type, I thought I'd 
// make my modifications to the array I'm going to be
// using.

module.exports = function() {

  var array = [],
      self  = array;

  self.includes = function(nodeId) {
    return array.indexOf(nodeId) === -1 ? false : true;
  }

  return self;

};