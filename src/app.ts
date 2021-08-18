import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { BuildingController } from './controllers/BuildingController';
import { ElevatorController } from './controllers/ElevatorController';

// Register all the controllers. The Routing Controllers plugin
// internally spins up an Express server and routes requests 
// to their proper controller. I scaffolded the project using other
// C# API practices:
// - controllers to receive requests and delegate to the proper 
//   logic resource and return the requested data,
// - repositories to process the request,
// - models to hold the data schema as it is used in the db,
// - dto as a human readable data structure ready to use by a client
const app = createExpressServer({
    controllers: [ElevatorController, BuildingController]
});

const port = 3000;
app.get('/', (req, res) => {
    res.send('Welcome to the best elevator controller API everz!');
});
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});