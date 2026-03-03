import { Tree } from "./main.js";

function randomArray(len) {
  let arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(Math.random() * 101);
  }
  return arr;
}

const BST = new Tree(randomArray(50));

console.log(BST.isBalanced());

BST.levelOrderForEach(console.log);
console.log("-------------");
BST.preOrderTraversalForEach(console.log);
console.log("-------------");
BST.postOrderTraversalForEach(console.log);
console.log("-------------");
BST.inOrderTraversalForEach(console.log);
console.log("-------------");

BST.insert(100);
BST.insert(105);
BST.insert(106);

console.log(BST.isBalanced());
BST.rebalance();
console.log(BST.isBalanced());
BST.levelOrderForEach(console.log);
console.log("-------------");
BST.preOrderTraversalForEach(console.log);
console.log("-------------");
BST.postOrderTraversalForEach(console.log);
console.log("-------------");
BST.inOrderTraversalForEach(console.log);
console.log("-------------");
