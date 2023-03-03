# *Social Events App* 

## Description

This is a project I built while following the Udemy course "Complete Guide to Building an App with .NET Core and React" by Neil Cummings. 

## Features 
The goal of the app is to provide users with a social platform where they can create, manage, and attend events with other people.
The application features a user authentication system that allows users to create accounts, customize their profiles, and connect with other users. 
Users can create events, invite friends, and manage their event details such as location, time, and date. 
The app also includes a search function that allows users to find events by location, category, or keywords.

## Architecture:
The app is built using the Clean Architecture pattern which provides a clear separation of concerns and makes the codebase easier to maintain and scale. 

The application also implements the CQRS (Command Query Responsibility Segregation) and Mediator patterns to enhance performance, scalability, and security, while preventing merge conflicts at the domain level.

## Frontend: 
I used React with Typescript and Material UI to create a modern and responsive user interface. 

Although the course I took used Semantic UI, I chose to use Material UI instead for my project due to its popularity and extensive library of customizable components that enabled me to maintain a cohesive and uniform design across the app.

## Backend:
I used ASP.NET Core and Entity Framework Core as my ORM and implemented a RESTful API to handle the frontend requests.
To provide secure user authentication, I set up and configured ASP.NET Core identity
Additionally, I incorporated SignalR to enhance the real-time features of the app, providing users with instant notifications and updates about events and invitations.
 
### Technologies used:
 · ASP.NET Core
 · React
 · C#
 · Typescript
 · Entity Framework Core
 · Material UI
 · Vite
 · SignalR

 
 
 
