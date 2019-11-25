---
title: 3D Object Scanning
date: 2019-06-25
featured_image: /images/blog/3d-selfie/3dme.png
image_caption: Photo by Dylan Gillis on Unsplash
excerpt: I went in for a body scan to 3D-print a miniature model of myself. I uploaded the 3D object and ran it in the browser using three.js.
tags:
    - blog
    - business
---
# 3D Selfie

> I went in for a body scan to 3D-print a miniature model of myself. I uploaded the 3D object and run it in the browser using three.js

# [Demo](https://briansunter.github.io/3D-me/ "Demo")

A new store opened up in the Fisherman's Wharf in San Francisco called [Pocket Me](http://www.pocketme.com "Pocket Me"). This store promised to 3D-print a realistic miniature figurine of anything. I was equally interested in getting a high quality 3d object file for use in the browser and in games. It looks like a mini action figure.

## Getting the scan
The pocketme storefront was full of very creative uses of the 3D scanner and printer. There are examples of 3D prints with entire families, dogs, and even a model of someone holding their 3d model. I went in the back and stood in the middle of circle of pillars containing lights and small cameras. The scan itself only took a second because each camera around me took a picture at the same time. The model was manually touched up by an artist and the 3d object and texture were emailed to me. The 3D printout came a few weeks later and sits on my desk at work. The 3D-printed model, the touch up, and the original 3d object file were around $100 in total.

## 3D Printed Model

![Selfie on Desk](/images/blog/3d-selfie/desk.jpg)

I have the 3D printed model on my desk and it gets quite a few comments. I'm impressed with how much detail they were able to capture in my watch and the logo on my shirt. The model is quite delicate and printed out of sandstone. The color is also 3d printed on with dyes and adhesive. I think video is the same process that printed my figurine.

<iframe width="100%" height="500px" src="https://www.youtube.com/embed/eX8sv9gXpqc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 3D Scanning and Photogrammetry
I found out a number of people were doing this "3d scanning" online and that a lot of great software and whitepapers existed on the subject. It seemed that with enough high quality pictures with a DSLR you could reconstruct very realistic 3d objects without any special equipment.


<div class="sketchfab-embed-wrapper"><iframe width="100%" height="480" src="https://sketchfab.com/models/711858531ed14d82a6126d3ff3eba48d/embed" frameborder="0" allow="autoplay; fullscreen; vr" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

<p style="font-size: 13px; font-weight: normal; margin: 5px; color: #4A4A4A;">
    <a href="https://sketchfab.com/3d-models/moto-guzzi-v7-photogrammetry-scan-711858531ed14d82a6126d3ff3eba48d?utm_medium=embed&utm_source=website&utm_campaign=share-popup" target="_blank" style="font-weight: bold; color: #1CAAD9;">MOTO GUZZI V7 photogrammetry scan</a>
    by <a href="https://sketchfab.com/miguelbandera?utm_medium=embed&utm_source=website&utm_campaign=share-popup" target="_blank" style="font-weight: bold; color: #1CAAD9;">Miguel Bandera</a>
    on <a href="https://sketchfab.com?utm_medium=embed&utm_source=website&utm_campaign=share-popup" target="_blank" style="font-weight: bold; color: #1CAAD9;">Sketchfab</a>
</p>
</div>

## Homemade 3D Selife
I wanted to see if I could recreate the process used to make my 3D image at home. I took around 100 pictures and used free software to reconstruct a 3D image.
There are a number of good options but I chose [Metashape](https://www.agisoft.com/ "Metashape") for the 3d reconstruction and [Meshlab](http://www.meshlab.net/ "Meshlab") for optimization.

### Loading the Images
First I loaded all the images and computed the corresponding images. This took around 20 minutes. It computed a point cloud and showed where it thought the camera was positioned.

![Point Cloud](/images/blog/3d-selfie/pointcloud.jpg)

Next I generated a dense cloud.

![Dense Cloud](/images/blog/3d-selfie/densecloud.jpg)

Finally I generated the mesh and texture, which took around 2 hours. I was amazed that it was also able to reconstruct the room.

![Mesh 1](/images/blog/3d-selfie/mesh1.jpg)
![Mesh 2](/images/blog/3d-selfie/mesh2.jpg)
![Mesh 3](/images/blog/3d-selfie/mesh3.jpg)

## Cleaning
I used a program called  [Meshlab](http://www.meshlab.net/ "Meshlab") to clean the model and extract the background.

![Meshlab](/images/blog/3d-selfie/meshlab.jpg)

## Result
I'm pretty happy with the result. I think I could get much better results if I zoomed in a little bit more and had better lighting.

<div class="sketchfab-embed-wrapper"><iframe width="100%" height="480" src="https://sketchfab.com/models/6d2893480f694b44976510e3c03bb163/embed" frameborder="0" allow="autoplay; fullscreen; vr" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
<p style="font-size: 13px; font-weight: normal; margin: 5px; color: #4A4A4A;">
    <a href="https://sketchfab.com/3d-models/shay-portrait-6d2893480f694b44976510e3c03bb163?utm_medium=embed&utm_source=website&utm_campaign=share-popup" target="_blank" style="font-weight: bold; color: #1CAAD9;">Shay Portrait</a>
    by <a href="https://sketchfab.com/Bsunter?utm_medium=embed&utm_source=website&utm_campaign=share-popup" target="_blank" style="font-weight: bold; color: #1CAAD9;">Bsunter</a>
    on <a href="https://sketchfab.com?utm_medium=embed&utm_source=website&utm_campaign=share-popup" target="_blank" style="font-weight: bold; color: #1CAAD9;">Sketchfab</a>
</p>
</div>
