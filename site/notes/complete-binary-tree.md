A [[complete binary tree]] is a [[binary tree]] where every level is full except the lowest level and is filled in from left to right.

## Complete example
This [[tree]] is complete because it's filled in from left to right.

```mermaid
graph TB;
    A((8))-->B((3));
    A-->C((10));
    B-->D((1));
    B-->E((6));
    C-->F((9));
    C-->G((1));
    classDef missing opacity:0,stroke-dasharray:5,stroke-width:2px,font-size:.8rem;
    class G missing;
```
## Incomplete example
It's incomplete because `10` has a right child of `9` but no left child. This means it's not filled in from left to right.
```mermaid
graph TB;
    A((8))-->B((3));
    A-->C((10));
    B-->D((1));
    B-->E((6));
    C-->G((missing));
    C-->F((9));
    classDef missing opacity:0,stroke-dasharray:5,stroke-width:2px,font-size:.8rem;
    class G missing;
```