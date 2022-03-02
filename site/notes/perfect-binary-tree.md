A perfect [[binary tree]] is a [[tree]] where all nodes have zero or two children and all leaf nodes are on the same level.

A perfect binary tree is both A [[full binary tree]] and [[complete binary tree]].


## Perfect Binary Tree Example
This is a perfect binary tree because every node as zero or two children and every leaf node is on the same level.
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

## Non Perfect Binary Tree Example
This is not a perfect binary tree because the leaf node `11` is not on the same level as others. It is both a [[perfect binary tree]] and a [[complete binary tree]] but not a perfect binary tree.
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
This one isn't perfect either because it has an extra element `20`.
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