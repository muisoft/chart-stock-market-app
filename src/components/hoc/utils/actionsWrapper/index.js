import io from 'socket.io-client';

//Here we wrap all our actions we wanted to perform on this App
export const actionsWrapper = (props) => {
    const url = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:5000/';
    const socket = io.connect(url);
    return {
        renderAllStocks: () => {
            props.getAllStocks();
        }, 
        getUpdate: () => {
            socket.on('update', (update) => {
                props.getAllStocks();
            })
        },
        disconnect: () => {
            socket.disconnect();
        },
        saveNewStock: () => {
            // We send save new stock request through redux middleware to server
            props.addNewStock(socket, props.partialState.stockcode);
            alert('Successfuly added');
        },
        handleChange: (e, m) => {
            const target = m.target;
            const value = target.value;
            const name = target.name;
            props.partialState[name] = value;
            props.value = value;
        },
        deleteStock: (code) => {
            props.removeStock(socket, code);
            alert('Successfuly deleted');
        }
    }
}
