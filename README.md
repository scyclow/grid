# [[]|[]|[]](https://scyclow.github.io/grid)

#Controls 
### Toggle Autopilot:
* ESC

### Grow
* c
* v
* b
* n
* m

### Destroy
* space bar

### Background
* d
* f
* g
* h
* j
* k

### Patterns:
* alternate between c,v,b,n,m and space bar every ~0.15 seconds. 

### Cell Size:
* up
* down

### Cell Shape:
* left
* right

#### Notes:
##### If this renders slowly, try:
* Refreshing with a smaller window.
* Closing and reopening the tab.

##### Contributions
My eyes are completely shot after working on this, and I'd rather not go blind. So if anyone feels inclined to make a pull request or fork, any contributions would be appreciated. Here are some known bugs and TODOs:

* Performance seems to be spotty across platforms/browsers. Removing jQuery in favor of pure JS seems to help, but it's still inconsistent. Anything that would make cells' border-radius render faster would be awesome.
* The current grid is rendered based on JavaScript's inner/outer window functions, which do not appear to always return expected values. I've added an adjustment parameter as a quick fix, but this is still not as precise as I'd like it to be. 
* These issues are espescially bad on mobile, where it looks like garbage.
* Other projects with this framework would be cool.
