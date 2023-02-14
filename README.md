# AR Camera for Mixed Collaboration - Mobile

## Introduction
This is a proof of concept for mixed collaboration between site engineers and officers. Site engieers can stream live location to the BIM model with mobile application. Then, the officers view the live location of site engineers on BIM model with receiver application. This help the site engieers and officers remotely collaborate which benefits the construction management as most experienced engineers and officers need to look after multiple sites. 

| <video src="https://user-images.githubusercontent.com/119405090/218675712-1654923e-1d4c-4b18-9b0a-0816db121409.mp4"> |  <video src="https://user-images.githubusercontent.com/119405090/218676350-b36db086-cb4b-45ca-ba04-26085498ae35.mp4"> | 
|:--:| :--:| 
| *Mobile streaming relative location to model* | *Receiver showing live location on model* |

*Please refer to all three repositories to run this application.*
- https://github.com/yuantsai1115/ar.camera.mobile
- https://github.com/yuantsai1115/ar.camera.backend
- https://github.com/yuantsai1115/ar.camera.receiver

## Research Gaps
Real-time data exchange between site engineers and officers is essential yet severe as most methods on the market only support video, image or voice which is not enough for remote collaboration. The location, viewing targets, camera poses, trajectories are all missing which blocks the officers understanding the site condition. This research proposes mixed collaboration approach which streams live data of site engineers to office. Officers can easily track all site engineers and collaborate with them remotely on BIM model which serves as a virtual site for visualising the live data. 

| <img src="https://user-images.githubusercontent.com/119405090/218685030-0decbf94-2b6f-47b0-9b6f-8952342bdb8e.jpg" width="600"> |
|:--:|
| *Research gaps for mixed collaboration* |

## Possibilities
The office can be a situation room which accommodates all the live data from multiple site engieers on the BIM model. Also, the officers can send information or commands to site engineers by AR camera on mobile. The information then is displayed on the physical position. On the other hand, the site engineers can also do the measurement and show the result on BIM model for officers. It can benefit the remote communication and collaboration especially for the geographical limitation scenarios.

| <img src="https://user-images.githubusercontent.com/119405090/218685044-a53f42b7-0805-4f39-a4a7-65114df3da92.jpg" width="600"> |
|:--:|
| *Possibile applications for mixed collaboration* |
  
## Application Framework
The main module of the application framework is the Cross Device Broadcast module which can be implemented by WebSocket. There would be four types of cross-device communication including mobile to mobile, desktop to desktop, desktop to mobile, and mobile to desktop. Each type of the communication can benefit different applications as the mixed collaboration approach is the fundemental infrastructure of data exchange.

| <img src="https://user-images.githubusercontent.com/119405090/218685074-4fb337d7-81a9-4821-a2c3-d0d8993b3044.jpg" width="600"> |
|:--:|
| *Application framework for mixed collaboration* |

## System Framework
The system framework layouts the essential logics and modules.  

| <img src="https://user-images.githubusercontent.com/119405090/218685094-74d00339-d5b3-4523-8bf8-5918deef9e85.jpg" width="600"> |
|:--:|
| *System framework for mixed collaboration* |

## Project Setup
This repository extended the samples from WebXR which is a mixed reality library for web application. Please refer to the WebXR website for more information. https://immersiveweb.dev/


