# Whack A Mole

Hit as many moles as possible within 20 seconds! BUTTTTT... please watchout for the baby mole and the bomb!


## Description

![Instructions](https://user-images.githubusercontent.com/14314165/90623545-30f3de80-e249-11ea-8c32-a419320dea02.png)


## Demo

![Demo](https://user-images.githubusercontent.com/14314165/90622006-1c164b80-e247-11ea-906e-761156155de3.gif)


## Source

This app is inspired by Ania Kubow (https://www.youtube.com/watch?v=lhNdUVh3qCc)
& Wes Bos (https://www.youtube.com/watch?v=toNFfAaWghU&feature=emb_title)

## Encountered Problem

Initially added `addEventListener` option `once:true` to prevent player from abusing the clicking at the same spot to gain multiple points.

It solved the problem, however, another problem arised, which disallow the player to click on the same spot again when the next mole appears.

To solve it, mole position is changed to false every time the event happens.

```
if (id.id === molePosition) {
    id.classList.remove("mole")
    result += 1;
    molePosition = false;
}
```

## For Further Improvement

- include a scoreboard to record highscores
- create different difficulties options
- include a live event log whenever the player hit an object
