
import { getStocks, deleteStock, addNewStock } from '../../../../actions';

export const mapStateToProps = ({ stock }) => {
    return {
        stocks: stock.stocks,
        partialState: stock.partialState,
        isloading: stock.isloading, 
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        getAllStocks: () => {
            dispatch(getStocks())
        },
        removeStock: (socket, data) => {
            dispatch(deleteStock(socket, data))
        },
        addNewStock: (socket, payload) => {
            dispatch(addNewStock(socket, payload))
        }
    }
}
