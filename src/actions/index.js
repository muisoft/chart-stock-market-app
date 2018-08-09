import io from 'socket.io-client';
import * as ActionType from './ActionType';


export const isSuccess = (payload) => {
    return {
        type: ActionType.ON_SUCCESS,
        payload
    }
}
export const isUpdate = (payload) => {
    return {
        type: ActionType.ON_UPDATE,
        payload
    }
}


export const addNewStock = (socket, stockcode) => {
    return (dispatch) => {
        socket.emit('addNewStock', stockcode);
    }
}
export const deleteStock = (socket, stockcode) => {
    console.log('deleteStock: ' + JSON.stringify(stockcode));
    return (dispatch) => {
        socket.emit('deleteStock', stockcode);
    }
}
export const getStocks = (socket) => {
    socket.emit('allstocks', 'stocks');
    return (dispatch) => {
        socket.on('getStocks', res => {
            dispatch(isSuccess(formatStock(res)));
        });
    }
}
export const initial = () => {
    return (dispatch) => {
        fetch('/stocks',
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin'
            })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                //  dispatch(isLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((response) => {
                dispatch(isSuccess(formatStock(response)));
            })
            .catch((err) => console.error(err));
    }
}
const formatStock = (data) => {
    const chart = charts => charts.map(chart => [Date.parse(chart.date), chart.close]);
    const keys = Object.keys(data);
    const stocks = keys.map(key => data[key]);
    const formatedStocks = stocks.map(stock => {
        return {
            symbol: stock.company.symbol,
            description: stock.company.description,
            chart: chart(stock.chart)
        }
    })
    return formatedStocks;
}
