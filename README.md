# Virbela

 Elevator API

## Startup instructions

    1. clone the repository
    2. npm install
    3. npm run start:watch (this starts the mock database service and the app)

## Questions

### How can your implementation be optimized?

Spelling the name right on the Git repo would be a first thing. Given time, I would have used Mongo with Mongoose to properly handle data mutations and nesting data across tables (or joining). The json-server plugin is great, but it is no real database.

I intended to implement Swagger. Implementing unit testing would probably not have been too difficult either.

The super stretch goal was tempting. I would have held the requested floors in memory and ordered them numerically. When the 'go' is received, I check what floor I'm on. In the worst of cases I would have floors requests above and below me. Looking up, there is a farthest request. Looking down, there also a farthest request. Whichever of the two is the least is the one I will go to first, since I will have to retrace my steps, incurring double the travelled distance. Then I will finish the other direction in the order given by the array.


### How much time did you spend on your implementation?

A total of about 5 hours


### What was most challenging for you?

I had not touched Node in a while, so integrating the routing-controllers and the mock database and getting everything to play nice together without wasting too much time was a bit of a challenge. I ran into a stack overflow problem when two repositories referred each other, so I resorted to static instances to avoid endless instantiation.