In a full [[binary tree]], every node either has two or no children. You can't have a node with a single child.  It's different than [[complete binary tree]] because the lower right must be filled out.

## Full Binary Tree Example
This is a full binary tree because every node as zero or two children.

```mermaid
graph TB;
    A((8))-->B((3));
    A-->C((10));
    B-->D((1));
    B-->E((6));
    E-->M((15));
    E-->N((18));
    D-->O((17));
    D-->P((19));
    C-->F((9));
    C-->G((11));
    F-->H((12));
    F-->K((15));
    G-->I((13));
    G-->J((14));
```

## Non Full Binary Tree Example
This is not a full binary tree because it is missing an element in the lower right.

```mermaid
graph TB;
    A((8))-->B((3));
    A-->C((10));
    B-->D((1));
    B-->E((6));
    E-->M((15));
    E-->N((18));
    D-->O((17));
    D-->P((19));
    C-->F((9));
    C-->G((11));
    G-->I((21));
    G-->GG((1));
    F-->H((12));
    F-->K((15));
    classDef red fill:#FF6347,background-color:#FF6347,opacity:1;
    classDef missing opacity:0,stroke-dasharray:5,stroke-width:2px,font-size:.8rem;
    class G red;
    class GG missing;
```

This one isn't full either because it has an extra element `20`.

```mermaid
graph TB;
    A((8))-->B((3));
    A-->C((10));
    B-->D((1));
    B-->E((6));
    E-->M((16));
    E-->N((18));
    D-->O((17));
    D-->P((19));
    C-->F((9));
    C-->G((11));
    F-->H((12));
    F-->K((15));
    G-->I((13));
    G-->J((14));
    M-->Q((20));
    classDef red fill:#FF6347,background-color:#FF6347,opacity:1;
    class Q red;
```