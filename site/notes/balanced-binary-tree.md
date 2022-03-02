 A balanced [[binary tree]] is one in which no leaf nodes are ‘too far’ from the root. For example, one definition of balanced could require that all leaf nodes have a depth that differ by at most 1.

## Balanced Example
This [[tree]] is balanced. `12` is only different by a depth of 1.
```mermaid
graph TB;
    A((8))-->B((3));
    A-->C((10));
    B-->D((1));
    B-->E((6));
    C-->F((9));
    C-->G((11));
    D-->H((12))
```
## Unbalanced Example
This graph is unbalanced because `14` and `15` are two levels below `6`, `9`, and `11`.
```mermaid
graph TB;
    A((8))-->B((3));
    A-->C((10));
    B-->D((1));
    B-->E((6));
    C-->F((9));
    C-->G((11));
    D-->H((12));
    D-->I((13));
    H-->J((14));
    H-->K((15));
    classDef red fill:#FF6347,background-color:#FF6347,opacity:1;
    class J red;
    class K red;
```

In the really extreme case a tree can turn into essentially a linked list, when you only have one left child per level or only one right child per level. This one is as unbalanced as possible. It's sometimes a useful edge case to think about. 

```mermaid
graph TB;
    A((8))-->B((3));
    A-->AA((1));
    B-->D((1));
    B-->BB((1));
    D-->H((12));
    D-->DD((1));
    H-->K((15));
    H-->HH((1));
    classDef missing opacity:0,stroke-dasharray:5,stroke-width:2px,font-size:.8rem;
    class AA missing;
    class BB missing;
    class DD missing;
    class HH missing;
```

## Self balancing binary trees
