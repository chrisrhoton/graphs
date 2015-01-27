var PriorityQueue = require("../priority-queue-array");

describe("PriorityQueue", function(){
  describe("removeMin", function(){
    beforeEach(function(done){
      this.queue = new PriorityQueue();
      this.queue.insert("c1", 5);
      this.queue.insert("c2", 8);
      this.queue.insert("c3", 10);
      this.queue.insert("c4", 4);
      this.queue.insert("c5", 2);
      this.queue.insert("c6", 9);
      this.queue.insert("c1", 3);
      done();
    });

    describe("simple removal of unsorted inputs", function(){
      it("returns the nodes in the proper order", function(){
        var min = this.queue.removeMin();
        expect(min.distance).toEqual(2);

        min = this.queue.removeMin();
        expect(min.distance).toEqual(3);

        min = this.queue.removeMin();
        expect(min.distance).toEqual(4);

        min = this.queue.removeMin();
        expect(min.distance).toEqual(5);

        min = this.queue.removeMin();
        expect(min.distance).toEqual(8);

        min = this.queue.removeMin();
        expect(min.distance).toEqual(9);

        min = this.queue.removeMin();
        expect(min.distance).toEqual(10);
      });
    });
  });
});