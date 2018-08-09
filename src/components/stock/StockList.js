import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Card, CardTitle, TextField, Button, FontIcon } from 'react-md';

import { withMainComponent } from '../hoc';

import NewStock from './NewStock';
import Stock from './Stock';

class StockList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            stocks: []//this.props.stocks,
        }
        
    }
   
    
    removeStock(stock) {
        this.setState({ stocks: this.state.stocks.filter(d => d.code !== stock.code) });
    }

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