
import { getStocks, deleteStock, addNewStock, initial } from '../../../../actions';

export const mapStateToProps = ({ stock }) => {
    return {
        stocks: stock.stocks,
        partialState: stock.partialState,
        status: stock.message,
        value: stock.value
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        initial: () => {
            dispatch(initial())
        },
        getAllStocks: (socket) => {
            dispatch(getStocks(socket))
        },
        removeStock: (socket, data) => {
            dispatch(deleteStock(socket, data))
        },
        addNewStock: (socket, payload) => {
            dispatch(addNewStock(socket, payload))
        }
    }
}
