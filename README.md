# Public Transport Explorer

This project was generated with React + TypeScript + Vite

## Objective of the project

To build a web application which loads, analyses and visualises public transport data using the HSL API. And to present meaningful insights in an intuitive way.

## Setting up

#### Clone the repo

```
$ git clone https://github.com/jeveenshrestha/public-transport-explorer.git
$ cd public-transport-explorer
```

##### Install npm dependencies
```
$ npm install
```

## Development server

Run `npm run dev` to run the application. Navigate to `http://localhost:5173/` in the browser. The application will automatically reload if you change any of the source files.

## Objective of the application

- User should be able to see all the stations within his walking distance (500m radius) from his location. 
- He should alternatively search for stations of his choice. 
- He should be given suggestion of the available stations while he is searching.
- He should be able to filter the stations shown in the map with the mode of transport i.e. Bus, Tram, Subway, Rail or Ferry. 
- He should then be able to click the station of his choice from the map and see the stops within that stations. 
- Furthermore he should be able to see all the routes passing through those stops with their departure time, Platform and route name.

## Stacks

#### Frontend
- ReactJS
- TypeScript
- React Leaflet
- React Bootstrap
- CSS Modules
#### API
- HSL public transport API, GraphQL
- Apollo Client
#### Unit Testing
- Jest
- React Testing Library

#### CI/CD pipeline and Deployment Platform
- GitHub Actions and Vercel

### Demo

As soon as a user navigates to the Public Transport Explorer, he is presented with all the stations within 500 m radius of his current location (the user must have permission for location tracking enabled in his browser), if the current location is not found, the location defaults to Helsinki city center and he can see those stations.

Alternatively, he can also type the station of his choice in the search bar where he will be presented with stations matching his search. He can trigger the station search by pressing Enter key or clicking Search button or selecting a suggested station from the drop down.

Then the user can see stations or stops in the map distinguisable by the mode of transport i.e. Bus or Tram or Subway or Rail or Ferry.

If the user wants to filter stations with only one or more mode of transport he can toggle filters with their corresponding mode Icons on the left side of the map.

When one of the stations or stops is clicked, he can further-more see the list of first 40 routes (according to the departure time) passing through that stop or station in a drop down below map. He can see Route name, Route short name, departure time and mode.

He can also filter the routes with Route short name. He will see only those routes which he wants.

The list of routes are updated every 2 Seconds.

The application is fully responsive, therefore the user can use it in almost all the devices of his choice.

#### My Approach

My thought process was how would I want a public transport application to be as a consumer.

- Firstly it should be responsive so that I can open and use it with any device of my choice.
- app should show my current location and stations within my walking distance.
- should be able to filter stations with mode of transport.
- I need to see stops within that stations and all the routes passing by.
- Need to see routes with their platform and time of departure.

#### Opportunity

Since I have been working with RESTFul API, I did not have experience with GraphQL, I took this lack of skill as an opportunity to learn and use it in this app. HSL has a good documentation of the API and GraphiQL interface and the GraphQL web community has been quite helpful which helped me over this challenge.

#### Features which can be added

- Trip planning
- Live tracking of a particular route in map or in a separate page with animations.