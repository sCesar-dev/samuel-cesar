---
title: "Autonomous Navigation with ROS 2"
description: "Mobile robot simulation utilizing the Nav2 stack and the Gazebo simulator. The project applies mapping and navigation algorithms in dynamic and complex environments."
techs: ["ROS 2", "C++", "Gazebo", "Robotics"]
github: "#"
live: "#"
images: 
  - "https://placehold.co/800x500/1a1a1a/39ff14?text=ROS2+Simulation"
  - "https://placehold.co/800x500/1a1a1a/39ff14?text=Gazebo+Environment"
---

# Autonomous Navigation with ROS 2

This project explores advanced mobile robotics concepts by implementing autonomous navigation systems in simulated environments. Utilizing the **Robot Operating System 2 (ROS 2)** ecosystem, we focused on integrating and calibrating the Nav2 stack for differential drive robots operating within the **Gazebo** simulator.

## The Challenge

Autonomous navigation requires a robot to localize itself in an environment, plan an obstacle-free route to a target, and execute the necessary movements safely. In dynamic environments, the robot must react quickly to new obstacles and recalculate its route in real time. The challenge consisted of correctly configuring mapping parameters and both local and global costmaps to achieve reliable behavior.

## The Solution

The solution was built on a ROS node in **C++** that communicates with the Nav2 Action Servers:

- **Mapping:** We utilized SLAM (Simultaneous Localization and Mapping) techniques to construct a 2D map of the simulated environment.
- **Localization:** Implemented AMCL (Adaptive Monte Carlo Localization) to maintain a precise estimate of the robot's position on the constructed map.
- **Path Planning:** Employed grid search algorithms (such as A*) for global planning, and the DWB Local Planner for reactive obstacle avoidance in real time.

## Insights and Results

Transitioning from ROS 1 to ROS 2 brought the challenge of understanding the new DDS-based (Data Distribution Service) paradigm and Lifecycle Nodes. Calibrating the PID controllers responsible for wheel movements and fine-tuning the Nav2 tolerances were crucial to enabling the robot to reach waypoints smoothly and without oscillation.
