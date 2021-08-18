# Virbela
 Elevator API

## Startup instructions
    1. clone the repository
    2. npm install
    3. npm run start:watch (this starts the mock database service and the app)

## Questions
    How can your implementation be optimized?
        - given time, I would have used Mongo with Mongoose to properly handle data mutaions and nesting data across tables (or joining). The json-server plugin is great, but it is no real database.

    How much time did you spend on your implementation?
        - A total of 5 hours

    What was most challenging for you?
        - I had not touched Node in a while, so integrating the routing-controllers and the mock database and getting everything to play nice together without wasting too much time was a bit of a challenge. I ran into a stack overflow problem when two repositories referred each other, so I resorted to static instances to avoid endless instantiation.