#Graphs

##Maker Square assignment

Original spec: Create a graph (using a city/road metaphor) and use Dijkstra's algorithm to calculate the shortest path between cities.

Two priority queue implementations included:
  - One solution using simple sorting of an array after insertion (priority-queue-array)
  - The other a true min-heap (priority-queue)

##To Do
  - ~~Implement a true priority queue~~
    - ~~Current implementation of Dijkstra's algo uses an array as the 'priority queue'.~~
  - Clean up _findPath.  Some duplication of code there.
  - Improve the Priority Queue spec.  Need to at least capture simple edge cases (e.g. removeMin on empty queue, removeMin on 1 item queue)
