import axios from 'axios';
import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { BuildingController } from './controllers/BuildingController';
import { ElevatorController } from './controllers/ElevatorController';

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