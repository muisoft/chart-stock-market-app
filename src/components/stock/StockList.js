import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withMainComponent } from '../hoc';

import NewStock from './NewStock';
import Stock from './Stock';

class StockList extends Component {

    render() {
        let { stocks, deleteStock } = this.props;
        return (
            <div className="cards md-grid">
                <NewStock />
                {
                    stocks.map((stock, i) => {
                        let props = { ...stock, deleteStock };
                        return (
                            <Stock
                                key={i}
                                { ...props }  
                            />
                        );
                    })
                }
            </div>
        )
    }
}

StockList.PropTypes = {
    stocks: PropTypes.arrayOf(PropTypes.object),
    renderAllStocks: PropTypes.func.isRequired,
    deleteStock: PropTypes.func.isRequired
}

export default withMainComponent(StockList);