"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const app = routing_controllers_1.createExpressServer({
    controllers: [__dirname + '/controllers/*.ts']
});
const port = 3000;
// app.get('/', (req, res) => {
//     //   res.send('Nothing matters, yo');
//     axios.get('http://localhost:9001/elevators').then((data) => {
//         console.log(data.data)
//         res.send(data.data);
//     });
// });
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map