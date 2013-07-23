---
layout: post
title: "Creating a simple 3D game with Three.js and WebGL"
date: 2013-07-23 12:00
comments: true
categories:
  - Graphics
author: "Nikhil Suresh"
authorurl: http://www.nklsrh.com
image: threejs-webgl-pong.jpg
summary: "In order to learn the basics of Three.js and its use in 3D games, we will be creating a simple Pong clone with basic materials, lights and shadows. This will also cover some of the basic logic code required for a functional Pong game."
---

<style>
  .gist, .gist-file {
    max-height: none !important;
  }
</style>

# Prerequisites
+ A browser with WebGL - this game has been tested on Chrome and Firefox. IE still doesn’t support WebGL, unless you’re using Windows 8.1 with IE11.
+ Three.js library available for download from [the Three.js website](http://threejs.org)
+ The Keyboard.js helper library I used for this project, created by Arthur Schreiber at [No Karma](http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html). Download it from [my GitHub repository](https://github.com/nklsrh/BuildNewGames_ThreeJSGame/blob/gh-pages/Scripts/keyboard.js)
+ A basic understanding of what Three.js does. Read this super simple, super quick [tutorial by Paul Lewis](http://www.aerotwist.com/tutorials/getting-started-with-three-js/). It’s basically a short-hand version of this article.

# Setup
## Get a base index.html running
Step one when making a web-based game is to create the host index.html file. In our case, it only needs to be a very simple set of elements, so we can bundle the CSS styling too.

<script src="https://gist.github.com/nklsrh/5962955.js"></script>

## Import Keyboard.js and Three.js
Three.js is a library contained in just one JavaScript file, so we can grab the minified version from the website.

For Keyboard input, we will need to referencethe aforementioned JavaScript file in our index.html as well.

## Create setup() and draw() functions
The setup() function will be the start point for the game code. The draw() function will be run every frame and will handle all the rendering and game logic. 

<script src="https://gist.github.com/nklsrh/5962960.js"></script>

In order to loop the draw() function, we simply utilise the requestAnimationFrame() function call, and pass ‘draw’ as the parameter. Remember, not all browsers natively support the call, and you might have to use Paul Irish’s shim to gain maximum compatibility. Also, it is important to realise that requestAnimationFrame() does not guarantee a fixed frame-rate, so you need to use time-deltas to calculate realistic physics. For a basic game like Pong, we don’t really care about that.

# Basic World
## Set up the Three.js world and camera
Three.js includes these important elements:
+ Scene
+ Renderer
+ Camera
+ Mesh
+ Light
+ Material

Cameras, Meshes, and Lights need to be added to the scene using the scene.add() function.

## Attach a WebGL Three.js Renderer to the DIV
The renderer is attached to whichever HTML DOM element you wish to render the scene to, and a render() call is made each frame to the renderer in order to draw the Three.js scene.

<script src="https://gist.github.com/nklsrh/5963154.js"></script>

## Add a camera to the scene
Three.js has the option to create Perspective and Orthographic cameras. For most uses, Perspective camera is the best choice. We can change position and rotation information of the camera like any other object in the scene.

<script src="https://gist.github.com/nklsrh/5963294.js"></script>

## Draw a sphere and light it
Meshes must be paired with Materials in order to give them a defined look and feel. Meshes can be of many types, include primitives such as Cube, Sphere, Plane and Torus.
Materials can have different characteristics depending on their type. The basic Material types include Lambert, Phong, and Basic.
+ Basic renders an unlit Mesh with no shadows or dark shading. A sphere will look like a circle if rendered with Basic.
+ Lambert is a simple diffuse-like lighting that creates shading on sides facing away from a light source. It gives a basic 3D look of surfaces that are matte (non-shiny and non-reflective)
+ Phong is used for achieving a plastic-like look and feel, with the ability to gain highlights that give a much shinier appearance to the Mesh.

Create a basic sphere with a Lambert material with the following code:
<script src="https://gist.github.com/nklsrh/5963175.js"></script>

![]({{ site.asset_root }}/{{ page.id }}/images/orange-ball-lit.png)

Show off your sphere with a Point Light. This is the most basic light, with no direction or rotation. Make sure you tweak the light’s intensity and distance to get it looking good.

<script src="https://gist.github.com/nklsrh/5963181.js"></script>

# Add Game Objects
## Draw playing area plane
The playing area will be a Three.js Mesh object of type Plane. Make sure the plane matches the play area, giving a small buffer gap to indicate where the paddles can and can’t go.

<script src="https://gist.github.com/nklsrh/5963189.js"></script>

![]({{ site.asset_root }}/{{ page.id }}/images/pong-lines.png)

## Draw paddles
The paddles will be Mesh objects of type Cube. Position each of the paddles on opposite sides of the play area.

<script src="https://gist.github.com/nklsrh/5963199.js"></script>

![]({{ site.asset_root }}/{{ page.id }}/images/pong-lines-camera.png)

If you manipulate the camera positions, as seen in the screenshot, you can give a different perspective to the player.

# Basic Logic
## Ball movement
The ball will have an X-direction and a Y-direction that determines the movement per frame.

<script src="https://gist.github.com/nklsrh/5963136.js"></script>

The ball will move at a constant speed in the X-plane every frame. To this end, we will specify a ballSpeed variable that acts as a multiplier for the direction values.

<script src="https://gist.github.com/nklsrh/5963123.js"></script>

We want the ball to have some unpredictable characteristics (e.g. when it gets sliced quite hard) so we will allow the Y-direction to go up to a maximum of ballSpeed * 2. You can tweak the values until you’re happy with how the ball behaves.

<script src="https://gist.github.com/nklsrh/5963128.js"></script> 

## Ball wall bounce logic
Simple collision detection logic is required to check if the ball is touching each of the side ‘walls’. Using a series of ‘if-else’ statements, we check the ball positions against the predetermined wall positions. In the case of a collision, we simply switch the Y-direction of the ball, creating a bounce effect.

<script src="https://gist.github.com/nklsrh/5963104.js"></script>

Later, we will edit some of this code in order to implement scoring when the ball passes a paddle.

## Keyboard input for paddles
We will utilise a very effective short-cut in order to easily get keyboard input working in this game. Using the Keyboard.js file provided, we simply have to include the reference to it in the index.html file and we are set. Only one function call is required, the Key.isDown() call. Given a parameter, the library checks if that particular key is current being pressed, and returns a boolean value.

<script src="https://gist.github.com/nklsrh/5962965.js"></script>

We use the ‘A’ and ‘D’ keys to move the paddle left and right, but you can edit the Keyboard.js with additional values if you want to use your own control scheme.

<script src="https://gist.github.com/nklsrh/5962971.js"></script>

While dealing with keyboard input, it is also important to ensure that the input is never blindly updated in game. We have to check that the paddle isn’t made to move off the play area, and we do that with some ‘if-else’ statements as well.

<script src="https://gist.github.com/nklsrh/5962974.js"></script>

Note that we use a paddle direction variable, rather than simply applying a change to the position values. This will come in handy when programming the ball to ‘slice’ when hit at an angle with a fast-moving paddle.

## Opponent logic
When you code a game of this calibre, it is of utmost importance that you create a vivid, lush environment with a host of emotional, highly-relatable characters that showcase this generation’s strides forward in technology. Instead, we will code a Pong A.I. that blindly follows the ball, because that is even better.

<script src="https://gist.github.com/nklsrh/5962977.js"></script>

We can update the opponent difficulty by using a variable instead of introducing magic numbers. This variable will affect the ‘reaction rate’ of the opponent by increasing the Lerp (Linear-Interpolation) time.

When using a Lerp (Linear-Interpolation) function, we must ensure the opponent plays fairly by limiting their maximum travel speed. We do that with a few more if-else statements.

<script src="https://gist.github.com/nklsrh/5962983.js"></script>

If want to extend immersion, you could also using the paddle.scale property to stretch the paddle when it can’t be moved. This indicates an issue to the player which they can then address immediately. In order to accomplish this, we must ensure the paddle always Lerps back to the default scale size.

<script src="https://gist.github.com/nklsrh/5963001.js"></script>

# Adding Gameplay

![]({{ site.asset_root }}/{{ page.id }}/images/lighted-coloured-3d.png)

## Making the ball reset after missing a paddle
To get the main scoring gameplay working, we need to first remove the ball’s ability to bonce off the paddle-facing walls. To do this, we remove the bounce code from the two corresponding if-else statements.

<script src="https://gist.github.com/nklsrh/5963029.js"></script>

We can handle scoring in many different ways. For a simple game like this, we can simply increment the corresponding score count variable. 

<script src="https://gist.github.com/nklsrh/5963007.js"></script>

We can then update the HUD element in the DOM by setting its innerHTML value.
Finally, we have to reset the ball once someone has scored. A simple function can be written to reset the ball, with a parameter indicating which paddle just lost (so we know which paddle to send the ball to next time). 

<script src="https://gist.github.com/nklsrh/5963036.js"></script>

![]({{ site.asset_root }}/{{ page.id }}/images/right-colours-clean-ui.png)

## Making the ball bounce off paddles
Alright, this is it. The big one. Literally the biggest feature of this game. It’s time to get the paddles hitting the ball.
In a simple Pong game, paddle-ball physics are nothing more than a couple of if-else statements. We check the X-position and Y-position of the ball against the paddle’s rectangular bounds, and if they intersect, we bounce the ball away. 

<script src="https://gist.github.com/nklsrh/5963052.js"></script>

It’s also important to check the direction of the ball’s travel, as we only want to check collisions in one direction (the direction towards the opponent.)

<script src="https://gist.github.com/nklsrh/5963056.js"></script>

We will also affect the ball’s lateral movement depending on the relative speed of the paddle when hitting the ball. This is particularly useful in introducing the biggest variable in Pong: the slice. Slicing the ball is often the only way to confuse and outmaneuver the opponent, so it is vital in this game.

Remember to duplicate the code, but update the values to match the opponent’s paddle. You can use this opportunity to gimp your opponent’s ability somewhat, by reducing the hitbox size or decreasing the slice amount. It’s what we would all do.

Here is the final paddle-ball collision function:

<script src="https://gist.github.com/nklsrh/5963058.js"></script>

## Scoring
In Pong, it is usually simplest to have a maximum score value, such that a game is won when either player reaches that score. To that end, we can easily create a maxScore variable and set it at the start of the match.

<script src="https://gist.github.com/nklsrh/5963060.js"></script>

We then create a function to check if either player has scored equal or higher than the maximum. This function should be called only when a score has been changed (i.e. when someone scores a point.)

<script src="https://gist.github.com/nklsrh/5963066.js"></script>

After a match is deemed complete, it is simplest to just return the ball to the centre and stop any movement, so that play doesnt inadvertently continue.

# Prettifying the Game
## HUD
It’s important to give feedback to the player so they know what’s going on. For Pong, the least we can do is keep a scoreboard ticking over. Instead of trying to draw the HUD on the same layer as the game, we can use the other DOM elements to provide the required feedback.

![]({{ site.asset_root }}/{{ page.id }}/images/cpu-wins.png)

It’s also good to indicate the maximum score as well, so we have another element for that which we will update at match start.

<script src="https://gist.github.com/nklsrh/5963100.js"></script>

## Shadows
Finally, it is time to make things look a tad more polished. Three.js has the awesome ability to create shadows for primitive objects (Cube, Plane, Sphere, etc.) so we can utilise that to make the game look nicer.

Shadows can’t be created with just a Point light, so we have to add a DirectionalLight or a SpotLight. A SpotLight shines a circular beam of light onto surfaces, which DirectionalLight simply shines a light in a certain direction with no regard to positioning. 

![]({{ site.asset_root }}/{{ page.id }}/images/lighting-comparison-4.png)

We will use a SpotLight because it clearly indicates where the light originates from and shines towards.

<script src="https://gist.github.com/nklsrh/5963087.js"></script>

We can update the SpotLight to follow the ball around to give a more dynamic look and feel to the game, whilst showcasing the hard work we just put into the lighting.

<script src="https://gist.github.com/nklsrh/5963097.js"></script>

To make an object in the scene cast or receive shadows, we simply set their .receiveShadow and .castShadow variables to true. For example,

<script src="https://gist.github.com/nklsrh/5963078.js"></script>

![]({{ site.asset_root }}/{{ page.id }}/images/lighting-comparison-2.png)

# Conclusion
This is but a basic introduction to the power of Three.js, which should allow you to create a basic Pong clone.

*Play the latest build of this game here: [LATEST BUILD](http://nklsrh.github.io/BuildNewGames_ThreeJSGame)*

*Find the latest code at [its GitHub page](http://github.com/nklsrh/BuildNewGames_ThreeJSGame)*

You can still do quite a number of things to polish your game, such as
+ Create animations for the paddles and ball
+ Update the HUD to look prettier
+ Import complex objects created in Modeling packages, to design a more immersive environment
+ Move HUD elements inside the game view to allow for full-screen gaming
+ Mess around with complex shaders to create reflections and other cool effects

Make sure you check out the [Three.js homepage](http://threejs.org/) to discover more innovative examples of WebGL.