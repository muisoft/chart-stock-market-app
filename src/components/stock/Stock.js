import React from 'react'
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText, Button } from 'react-md';

const Stock = ({ description, symbol, deleteStock }) => {
    const styles = {
        
    }
    return (
        <Card className="card" raise>
            <CardTitle title={symbol} style={{ marginBottom: 0, paddingBottom: 0}}>
                <Button onClick={() => deleteStock(symbol)} className="md-cell--right" icon tooltipLabel="Delete Stock">close</Button>
            </CardTitle>
            <CardText>
                <p>{parseInt(description) === 0 ? "No Description" : description}</p>
            </CardText>
        </Card>
    )
}

Stock.PropTypes = {
    description: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    deleteStock: PropTypes.func.isRequired
}

export default Stock;
