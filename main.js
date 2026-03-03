function compareNumbers(a, b) {
  return a - b;
}

function getMinValue(root) {
  let currentNode = root;
  while (currentNode.left != null) {
    currentNode = currentNode.left;
  }
  return currentNode.data;
}

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    arr = arr.filter((item, index) => arr.indexOf(item) === index);
    arr.sort(compareNumbers);
    let root = this.buildTreeRec(arr, 0, arr.length - 1);
    return root;
  }

  buildTreeRec(arr, start, end) {
    if (start > end) return null;
    let mid = Math.floor(end / 2);
    let root = new Node(arr[mid]);

    root.left = this.buildTreeRec(
      arr.slice(start, mid),
      0,
      arr.slice(start, mid).length - 1,
    );
    root.right = this.buildTreeRec(
      arr.slice(mid + 1, end + 1),
      0,
      arr.slice(mid + 1, end + 1).length - 1,
    );
    return root;
  }

  includes(value) {
    let node = this.root;
    while (node != null) {
      if (node.data === value) {
        return true;
      } else {
        if (node.data > value) {
          node = node.left;
        } else {
          node = node.right;
        }
      }
    }
    return false;
  }

  insert(value) {
    let node = this.root;
    while (true) {
      if (node.data === value) {
        return;
      }
      if (node.data > value) {
        if (node.left == null) {
          node.left = new Node(value);
          return;
        } else {
          node = node.left;
        }
      } else {
        if (node.right == null) {
          node.right = new Node(value);
          return;
        } else {
          node = node.right;
        }
      }
    }
  }

  delete(value) {
    this.root = this.deleteRec(this.root, value);
  }

  deleteRec(root, value) {
    if (root === null) return null;

    if (root.data > value) {
      root.left = this.deleteRec(root.left, value);
    } else if (value > root.data) {
      root.right = this.deleteRec(root.right, value);
    } else {
      if (!root.left) return root.right;
      if (!root.right) return root.left;

      root.data = getMinValue(root.right);
      root.right = this.deleteRec(root.right, root.data);
    }

    return root;
  }

  levelOrderForEach(callback) {
    if (
      typeof callback != "function" ||
      callback == undefined ||
      callback == NaN
    )
      throw new Error("provide a function!");
    let queue = [];
    let currItem = null;
    if (this.root == null) return;
    queue.push(this.root);
    while (queue.length > 0) {
      currItem = queue.shift();
      if (currItem.left) queue.push(currItem.left);
      if (currItem.right) queue.push(currItem.right);
      callback(currItem.data);
    }
  }

  inOrderTraversalForEach(callback) {
    if (
      typeof callback != "function" ||
      callback == undefined ||
      callback == NaN
    )
      throw new Error("provide a function!");
    this.inOrderTraversal(this.root, callback);
  }

  inOrderTraversal(root, callback) {
    if (root == null) return;
    this.inOrderTraversal(root.left, callback);
    callback(root.data);
    this.inOrderTraversal(root.right, callback);
  }

  preOrderTraversalForEach(callback) {
    if (
      typeof callback != "function" ||
      callback == undefined ||
      callback == NaN
    )
      throw new Error("provide a function!");
    this.preOrderTraversal(this.root, callback);
  }

  preOrderTraversal(root, callback) {
    if (root == null) return;
    callback(root.data);
    this.preOrderTraversal(root.left, callback);
    this.preOrderTraversal(root.right, callback);
  }

  postOrderTraversalForEach(callback) {
    if (
      typeof callback != "function" ||
      callback == undefined ||
      callback == NaN
    )
      throw new Error("provide a function!");
    this.postOrderTraversal(this.root, callback);
  }

  postOrderTraversal(root, callback) {
    if (root == null) return;
    this.postOrderTraversal(root.left, callback);
    this.postOrderTraversal(root.right, callback);
    callback(root.data);
  }

  height(value) {
    let currentNode = this.root;
    while (currentNode != null) {
      if (currentNode.data == value) {
        return this.heightRec(currentNode);
      } else if (currentNode.data > value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return undefined;
  }

  heightRec(node) {
    if (node == null) return 0;
    if (!node.right && !node.left) return 0;
    return 1 + Math.max(this.heightRec(node.left), this.heightRec(node.right));
  }

  depth(value) {
    let depth = 0;
    let currentNode = this.root;
    while (currentNode != null) {
      if (currentNode.data == value) {
        return depth;
      } else if (currentNode.data > value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
      depth += 1;
    }
    return undefined;
  }

  isBalanced() {
    function checkHeight(node) {
      if (node == null) return 0;
      let left_h = checkHeight(node.left);
      if (left_h == -1) return -1;

      let right_h = checkHeight(node.right);
      if (right_h == -1) return -1;

      if (Math.abs(right_h - left_h) <= 1) {
        return 1 + Math.abs(right_h - left_h);
      } else {
        return -1;
      }
    }
    if (checkHeight(this.root) >= 0) {
      return true;
    } else {
      return false;
    }
  }

  rebalance() {
    function DFS(node) {
      if (node == null) {
        return [];
      } else {
        let left = DFS(node.left);
        let right = DFS(node.right);
        return left.concat([node.data], right);
      }
    }
    this.root = this.buildTree(DFS(this.root));
  }
}

const BST = new Tree([1, 2, 3, 4, 5, 6, 7]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};
