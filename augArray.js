// Wanted to add an include method to an array I was going to be using
// but didn't want to mess with the built in type.  Also wanted to
// preserve the semantics of writing if(array.includes(element))
// rather than using something like 'call'

module.exports = function() {

  var array = [],
      self  = array;

  self.includes = function(nodeId) {
    return array.indexOf(nodeId) === -1 ? false : true;
  }

  return self;

};