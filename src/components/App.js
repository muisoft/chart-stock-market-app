import React, { Component } from 'react';
import axios from 'axios';
import { Toolbar, Button } from 'react-md';
import io from 'socket.io-client';
import { withMainComponent } from './hoc';
import { Chart, StockList } from './stock';
import { AppToolbar } from './toolbar';



class App extends Component {
  
    render() {
        let { stocks } = this.props;
        console.log('Yewo: ' + JSON.stringify(stocks)); 
        const series = stocks !== undefined ? stocks.map(stock => {
                return { name: stock.symbol, data: stock.chart }
        }) : []; 
        return (
            <div style={{ height: 480, marginTop: 60 }}>
                <AppToolbar />
                <div className="md-grid"> 
                    <h2 className="md-cell md-cell--12 md-text-contianer md-text-center">Stock Market Chart</h2>
                    <Chart series={series} />
                    <StockList />
                </div>
            </div>
        );
    }
}

App.PropTypes = {
  
}

export default withMainComponent(App);
