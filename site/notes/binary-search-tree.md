A binary search [[tree]] is a special type of [[binary-tree|binary tree]] where all nodes in the left subtree are less than the root and all nodes in the right subtree are greater than the root.

It is important because this organization allows us to find a value in O(log(n)) time.

## Binary Search Tree Diagram
```mermaid

graph TB;
  A((8))-->B((3));
  A-->C((10));
  B-->D((1));
  B-->E((6));
  C-->F((9));
  C-->G((14));
  E-->H((4));
  E-->I((7));
```


## Non-Binary Search Tree Diagram
`2` is less than `10` but on the right hand side, which breaks the ordered rule of binary search trees.

```mermaid

graph TB;
  A((8))-->B((3));
  A-->C((10));
  B-->D((1));
  B-->E((6));
  C-->F((9));
  C-->G((2));
  E-->H((4));
  E-->I((7));
  classDef red fill:#FF6347,background-color:#FF6347,opacity:1;
  class G red;

```



Here's an example of a [[tree]] node
```js
class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}
```

##  Insert Operation
The insert operation has an average time complexity of `O(log(n))` and a worst case of `O(n)` unless the tree is a [[balanced-binary-tree|balanced binary tree]], which has a worst case of `O(log(n))`


```js
	insert(data) {
		if (data < this.data) {
			if (this.left){
				this.left.insert(data);
			} else {
				this.left = new Node(data);
			}
		} else if (data > this.data) {
			if (this.right){
				this.right.insert(data);
			} else if (data > this.data) {
				this.right = new Node(data);
			}
		}
	}
}
```


## Find Operation
The find operation has an average time complexity of `O(log(n))` and a worst case of `O(n)` unless the tree is a [[balanced-binary-tree|balanced binary tree]], which has a worst case of `O(log(n))`
```js

  find(data) {
    if (this.data === data) {
      return this;
    }

    if (data < this.data && this.left) {
      return this.left.contains(data);
    } else if (data > this.data && this.right) {
      return this.right.contains(data);
    } else {
      return null;
    }
  }

```
## Delete Operation
The delete operation has an average time complexity of `O(log(n))` and a worst case of `O(n)` unless the tree is a [[balanced-binary-tree|balanced binary tree]], which has a worst case of `O(log(n))`
```js
function deleteNode(root, key) {

    /* Base Case: If the tree is empty */
    if (root == null)
        return root;

    /* Otherwise, recur down the tree */
    if (key < root.data){
        root.left = deleteNode(root.left, key);
	} else if (key > root.data){
	    root.right = deleteNode(root.right, key);
	}

    // if key is same as root's
    // key, then This is the
    // node to be deleted
    else {
        // node with only one child or no child
        if (root.left == null){
		   return root.right;
		}
        else if (root.right == null){
		   return root.left;
		}

        // node with two children: Get the inorder
        // successor (smallest in the right subtree)
        root.data = minValue(root.right);

        // Delete the inorder successor
        root.right = deleteNode(root.right, root.data);
    }

    return root;
}

function minValue(root) {
    let min = root.data;
    while (root.left != null) {
        min = root.left.data;
        root = root.left;
    }
    return min;
}