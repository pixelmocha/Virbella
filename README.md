# Virbela

Elevator API. Node 12 or above. This API allows you to:
1. get all elevator data, including building data (ex: <a target="_blank">http://localhost:3000/elevators</a>)
2. get single elevator data, including building data (ex: http://localhost:3000/elevators/1)
3. get all elevator data for a building (ex: http://localhost:3000/buildings/1/elevators)
4. get all building data, including elevators (ex: http://localhost:3000/buildings)
5. get single building data, including elevators (ex: http://localhost:3000/buildings/1)
6. open an elevator door (ex: http://localhost:3000/elevators/1/open)
7. close an elevator door (ex: http://localhost:3000/elevators/1/close)
8. move an elevator (ex: http://localhost:3000/elevators/1/floor/2)

The mock database resides in db/db.json. You can add/remove buildings and elevators at will.

## Startup instructions

1. clone the repository
2. npm install
3. npm run start:watch (this starts the mock database service and the app)
4. go to localhost:3000

## Questions

### How can your implementation be optimized?

Spelling the name right on the Git repo would be a first thing. Not every edge case is covered. Given time, I would have used Mongo with Mongoose to properly handle data mutations and nesting data across tables (or joining). The json-server plugin is great, but it is no real database.

I wanted to make an endpoint where you could select the specific field of data you wanted on the elevator, like current floor, or state. Right now, there is only an endpoint that returns all the data for a given elevator.

I intended to implement Swagger. Implementing unit testing would probably not have been too difficult either. One thing I would love to have the time for is automate changes in the Swagger documentation. Also, since the client is in TypeScript, I would auto-copy the dto files to the client repository on change, providing a measure of data safety between the two code bases as they would then share the same dto models.

The super stretch goal was tempting. I would have held the requested floors in memory and ordered them numerically. When the 'go' is received, I check what floor I'm on. In the worst of cases I would have floors requests above and below me. Looking up, there is a farthest request. Looking down, there also a farthest request. Whichever of the two is the least is the one I will go to first, since I will have to retrace my steps, incurring double the travelled distance. Then I will finish the other direction in the order given by the array.


### How much time did you spend on your implementation?

A total of about 5 hours split up over 2 days


### What was most challenging for you?

I had not touched Node in a while, so integrating the routing-controllers and the mock database and getting everything to play nice together without wasting too much time was a bit of a challenge. I ran into a stack overflow problem when two repositories referred each other, so I resorted to static instances to avoid endless instantiation.