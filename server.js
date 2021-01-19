require('dotenv').config();
const { createServer } = require('http');
const socketIO = require('socket.io');
const express = require('express');
const compression = require('compression');
const path = require('path');

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000);

require('./server/models')(process.env.DB_CONN);

const { allStocks, deleteStock, saveStock } = require('./server/models/utils');

const app = express();
const server = createServer(app);
const io = socketIO(server);

const dev = app.get('env') !== 'production';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());


app.get('/stocks', (req, res) => {
    console.log("Yes");
    allStocks(stocks => res.json(stocks));
});

io.on('connection', client => {

    client.on('addNewStock', (stock) => {
        saveStock(stock, (saved) => io.emit('update', 'update'));
    });

    client.on('deleteStock', (stockcode) => {
        deleteStock(stockcode, (stock) => io.emit('update', 'update'));
    });
});
// Check if we are in Production
if (!dev) {
    app.disable('x-powered-by');
    app.use(compression());
    app.use(morgan('common'));

    app.use(express.static(path.join(__dirname, 'build')));

    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}
//Also check if we are not in production
if (dev) {
    app.use(morgan('dev'));
}
server.listen(PORT, err => {
    if (err) throw err;
    console.log('Server started on port: '+ PORT);
})

