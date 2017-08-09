/* 1. BINARY SEARCH 
runtime: O(log n)*/

function binarySearch(arr, item) {
  //find index of item in the array
  var min = 0;
  var max = arr.length - 1;
  
  while (min <= max) {
    var mid = Math.round((min + max) / 2);
    var guess = arr[mid];
    if (guess === item) {
      return mid;
    }
    if (guess > item) {
      max = mid - 1;
    }
    if (guess < item) {
      min = mid + 1;
    }
  }
  return null;
}

console.log(binarySearch([1, 2, 3, 4, 10, 11, 12, 13, 14, 20], 20));

/* 2. SELECTION SORT
runtime:  O(n*n)*/

function findSmallest(arr) {
  var smallestIndex = 0;
  
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < arr[smallestIndex]) {
      smallestIndex = i;
    }
  }
  return smallestIndex;
}

function selectionSort(arr) {
  var sortedList = [];
  
  while (arr.length > 0) {
    var smallest = arr.splice(findSmallest(arr), 1)[0];
    sortedList.push(smallest);
  }
  console.log(sortedList);
  return sortedList;
}
selectionSort([9,8,7,6,5,4,3,100]);

//capital names are given priority over lowercase


///////////////////////////
//3. RECURSION

var mainBox = {thimble: 'thimble', needle: 'needle', cartridge: 'cartidge', 
            book: 'book', box1: {thread: 'thread', cup: 'cup'}, 
            book1: 'book', dust: 'dust', box2: {card: 'card', key: 'key'}};
                                                                           

function lookForKeyRecurs(box) {
  for (item in box) {
    console.log(item);
    if (item.includes('box')) {
      lookForKeyRecurs(box[item]);
    }
    else if (item === 'key') {
      console.log('key');
      return box[item];
    }
  }
}

lookForKeyRecurs(mainBox);

//////////////////////////////////
/* 4. Factorial function employing the call stack and 
recursion*/

var factorial = function(num) {
  if (num === 1) {
    return 1;
  }
  
  return num * factorial(num - 1);
};

console.log(factorial(3));

//////////////////////////////////////
// 5. SINGLY LINKED LIST DATA STRUCTURE

function Node(data) {
    this.data = data;
    this.next = null;
}
 
function SinglyList() {
    this._length = 0;
    this.head = null;
}
 
SinglyList.prototype.add = function(value) {
    var node = new Node(value),
        currentNode = this.head;
 
    // 1st use-case: an empty list
    if (!currentNode) {
        this.head = node;
        this._length++;
 
        return node;
    }
 
    // 2nd use-case: a non-empty list
    while (currentNode.next) {
        currentNode = currentNode.next;
    }
 
    currentNode.next = node;
 
    this._length++;
     
    return node;
};
 
SinglyList.prototype.searchNodeAt = function(position) {
    var currentNode = this.head,
        length = this._length,
        count = 1,
        message = {failure: 'Failure: non-existent node in this list.'};
 
    // 1st use-case: an invalid position
    if (length === 0 || position < 1 || position > length) {
        throw new Error(message.failure);
    }
 
    // 2nd use-case: a valid position
    while (count < position) {
        currentNode = currentNode.next;
        count++;
    }
 
    return currentNode;
};



SinglyList.prototype.remove = function(position) {
  var currentNode = this.head;
  var deletedNode = null;
  var nodeToBeDeleted = null;
  var previousNode = null;
  var counter = 1;
  
  //1st user case: error 
  if (position > this._length || position <= 0) {
    console.log('position does not exist');
  }
  
  //2nd user case: removing first node
  if (position === 1) {
    this.head = currentNode.next;
    deletedNode = currentNode;
    currentNode = null;
    this._length--;
    return deletedNode;
  }
  
  //3rd user case: any other position
  
  while (counter < position) {
  previousNode = currentNode;
  currentNode = currentNode.next;
  counter++;
  }
  //node to be deleted is the node after previousNode
  nodeToBeDeleted = previousNode.next;
  deletedNode = nodeToBeDeleted;
  //link previousNode to the node after deletedNode
  previousNode.next = nodeToBeDeleted.next;
  nodeToBeDeleted = null;
  this._length--;
  return deletedNode;
}

var test = new SinglyList();
test.add('one');
test.add('two');
test.add('three');
test.add('four');
test.add('five');
test.add('six');
console.log(test.searchNodeAt(3));
test.remove(5);
console.log(test);

/////////////////////////////////////////////
/* 6. FINDING THE MAXIMUM NUMBER IN AN ARRAY RECURSIVELY (DIVIDE AND CONQUER)*/
var maxNumber = function(arr) {
  //set base case: list length is 2, return larger value
  
  
  //base case for subMax so arr does not endlessly decrement by 1
  if (arr.length === 2) {
    if (arr[0] > arr[1]) {
      return arr[0];
    } else {
      return arr[1];
    }
  }
  //each arr.slice(1) is stored in the execution context of each function call
  var subMax = maxNumber(arr.slice(1));
  //compare the subMax to array[0] stored in that specific execution context
  if (subMax > arr[0]) {
    return subMax;
  } else {
    return arr[0];
  }
};

console.log(maxNumber([1, 15, 21, 1000, 25, 30]));



/////////////////////////////////////////////
//7. QUICKSORT ALGORITHM 

function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  } else {
  var pivot = arr[0];
  var arrToFilter = arr.slice(1);
  var less = arrToFilter.filter(function(item) {
    return item <= pivot;
  });
  var greater = arrToFilter.filter(function(item) {
    return item > pivot;
  });
  return quickSort(less).concat(pivot, quickSort(greater));
  }
}

var sorted = quickSort([5, 4, 10, 12, 2, 25, 900, 14]);
console.log(sorted);

///////////////////////////////////////////////
//8. MERGE SORT ALGORITHM 


//only first evaluates when left arr and right r have a length of 1 (base case)
var merge = function(left, right) {
//take two arrays and produce and new array which sorts them
  console.log(right);
  var result = [];
  var leftc = 0;
  var rightc = 0;

  while (leftc < left.length && rightc < right.length) {
    if (left[leftc] < right[rightc]) {
      result.push(left[leftc]);
      leftc++;
    } else {
      result.push(right[rightc]);
      rightc++;
    } 
  }
  return result.concat(left.slice(leftc)).concat(right.slice(rightc));
};


var mergeSort = function(arr) {

  //base case: when an array has a length of 1
  if (arr.length < 2) {
    return arr;
  }
  //recursive case: divide arrays into two until they have a length of 1
  var mid = Math.round(arr.length / 2);
  var left = arr.slice(0, mid);
  var right = arr.slice(mid);
  
  return merge(mergeSort(left), mergeSort(right));
};

console.log(mergeSort([5,1,6,7,8,22,14,-5,22222,3]));

//////////////////////////////
//9. GRAPH & QUEUE DATA STRUCTURES, BREADTH-FIRST SEARCH
// O(V + E) V for number of vertices/nodes added to the queue, E for number of edges you follow


//directed graph: edges only go one way
var graph = {
  me: ['alice', 'bob', 'claire', 'anuj'],
  bob: ['anuj', 'peggy'],
  alice: ['peggy'],
  claire: ['thom', 'jonny'],
  anuj: [],
  peggy: [],
  thom: [],
  jonny:[]
};


var addArrToQueue = function(arr, queue) {
  arr.forEach(function(item) {
    queue.push(item);
  });
};

var alreadyChecked = [];
var search_queue = [];
addArrToQueue(graph.me, search_queue);

while (search_queue.length !== 0) {
  var person = search_queue.shift();
  var personRepeat = checkPerson(person, alreadyChecked);
  if (personRepeat === false) {
    var mangoSeller = personIsMangoSeller(person);
    if (mangoSeller) {
      console.log(person);
      break;
    } else {
      addArrToQueue(graph[person], search_queue);
      alreadyChecked.push(person);
    }
  }
}

function personIsMangoSeller(person) {
  if (person.charAt(person.length - 1) === 'm') {
    return true;
  } else {
    return false;
  }
}

function checkPerson(person, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === person) {
      return true;
    }
  };
  return false;
}

/////////////////////////////
//DIJKSTRA'S ALGORITHM

//property name: neighbor, property value: weight
var graph = {};

graph.start = {
   a: 6,
   b: 2
 };

graph.a = {
  fin: 1
};

graph.b = {
  a: 3,
  fin: 5
};

graph.fin = {};
/////////////////////////
//costs table: how long it takes to get to a specified node from the start node
var infinity = 1 / 0;
var costs = {};
costs.a = 6;
costs.b = 2;
costs.fin = infinity;

///////////////
//parents table
var parents = {}; 
parents.a = "start";
parents.b = "start";
parents.fin = null;

///////////
function findLowestCostNode(costs) {
  //value of lowestCost node
  var lowestCost = infinity; 
  //property name of lowest cost node
  var lowestCostNode = null;
  
  for (var node in costs) {
    var cost = costs[node];
    if (cost < lowestCost && !processed.includes(node)) {
      lowestCost = cost;
      lowestCostNode = node;
    } 
  }
  return lowestCostNode;
}
//array to keep track of processed nodes 
var processed = [];
//find node with the lowest cost, returns prop name of node 
var node = findLowestCostNode(costs);
while (node !== null) {
  //cost of cheapest node found through function
  var cost = costs[node];
  //neighbors contains the neighbors of the cheapest node
  var neighbors = graph[node];

  //loop through the neighbors, n is a neighbor of the cheapest node
  for (var n in neighbors) {
    /*calculate cost to get to node n (neighbor of cheapest node) through cheapest node.
    cost = cost to get to cheapest node from start
    neighbors[n] = distance from cheapest node to neighbor n 
    cost + neighbors[n] = distance from start to neighbor of cheapest node by following an edge of the cheapest node*/
    var newCost = cost + neighbors[n];
    
    if (costs[n] > newCost) {
      costs[n] = newCost;
      parents[n] = node;
    }
  }
  processed.push(node);
  node = findLowestCostNode(costs);
}

console.log(parents);

///find the path with the least cost 

function findPath(parents) {
  var pathArray = ["end"];
  var child = "end";
  while (child !== "start") {
    var parent = parents[child];
    console.log('child: ' + child + ', parent: ' + parent)
    pathArray.unshift(parent);
    child = parent;    
  }
  return pathArray;
}
  

console.log(findPath(parents));


































