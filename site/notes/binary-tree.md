A type of [[tree]] with two child nodes. Don't assume it's sorted unless you know it's a [[binary search tree]].

## Binary Tree Javascript Class Implementation
``` js
class TreeNode {
    constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
```
## Breadth First Search
 Breadth first search starts at the tree root and explores all nodes at the present depth prior to moving on to the nodes at the next depth level.

### Animation
![Breadth First Search Algorithm Animation](/images/notes/bfs-tree-algorithm.gif)

### Implementation
```js
function breadthFirstSearch() {
  const visited = [],
      queue = [],
      current = this.root;

  queue.push(current);
  while (queue.length) {
    current = queue.shift();
    visited.push(current.val);

    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }

    return visited;
}
```
## Depth First Search
Depth first search starts at the root node and explores as far as possible along each branch before backtracking. 

There are three types of depth first search: **preorder traversal**, **inorder traversal**, and **postorder traversal**. For each type of depth first search, there are both iterative and recursive algorithms.

### Animation
![Depth First Search Algorithm Animation](/images/notes/dfs-tree-algorithm.gif)

## Preorder Traversal
1. Visit the root.
2. Traverse the left subtree - preorder(node.left)
3. Traverse the right subtree - preorder(node.right)
### Animation

![Preorder Traversal Depth First Search Tree Algorithm Animation](/images/notes/preorder-traversal.gif)
### Recursive Implementation
```js
function preOrderRecursive(node) { 
  console.log(node.val) 
  node.left && this.preOrder(node.left) 
  node.right && this.preOrder(node.right) 
} 
```
### Iterative Implementation
```js
function preOrderIterative(root) {
    const stack = [];
    // do not push the root node onto the stack if the root node is null. 
    if(root){
        stack.push(root);
    }
    const res = [];
    while(stack.length){
        const node = stack.pop();
     		console.log(node.val);	
        res.push(node.val);
        if(node.right){
            stack.push(node.right);
        }
        if(node.left){
            stack.push(node.left);
        }
    }
    return res; 
};
```

## Inorder Traversal
1. Traverse the left subtree - preorder(node.left)
2. Visit the root.
3. Traverse the right subtree - preorder(node.right)

### Inorder Traversal Animation
![Inorder Traversal Depth First Search Tree Algorithm Animation](/images/notes/inorder-traversal.gif)
#### Recursive Implementation
```js
function inOrderRecursive(root) { 
   root.left && inOrder(root.left) 
   console.log(root.val) 
   root.right && inOrder(root.right) 
} 
```
### Iterative Implementation
```js
function inOrderIterative(root){
  const stack = []
  let curr = root;
  const res = [];
  while(stack.length >0 || curr ){
    if (curr){
      stack.push(curr);
      curr = curr.left
    } else {
      curr = stack.pop();
      res.push(curr.data);
      curr = curr.right;
    }
  }
}
```

## Post Order Traversal
1. Traverse the left subtree - preorder(node.left)
2. Traverse the right subtree - preorder(node.right)
3. Visit the root.

### Animation
![Postorder Traversal Depth First Search Tree Algorithm Animation](/images/notes/postorder-traversal.gif)

### Recursive Implementation
```js
function postOrderRecursive(node) { 
  node.left && this.postOrder(node.left) 
  node.right && this.postOrder(node.right) 
  console.log(node.val); 
}
```
### Iterative Implementation
```js
function postOrder(node){
  const s = [];
  s.push(node);
  const out = [];
  
  while(!!s.length){
    const curr = s.pop;
    out.push(curr.data);
    if (curr.left){
      s.push(curr.left);
    }
    if (curr.right){
      s.push(curr.right);
    }
  }
	while(!out.length){
      console.log(out.pop());
    }
}
```

## Depth of Binary Tree
```js
function maxDepth(root) {
    return doTreeDepth(root,1)
}

function doTreeDepth(root, height){
    if(!root){
        return 0;
    }
    //is leaf node
    if (!root.right && !root.left){
        return height; 
    }

    const left = doTreeDepth(root.left,height+1);
    const right = doTreeDepth(root.right,height+1);

    return Math.max(left,right); 
}
```

## Types of Binary Trees
* [[binary search tree]] 
* [[balanced binary tree]]
* [[perfect binary tree]]
* [[complete-binary-tree]]
* [[full binary tree]]

