import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, TextField, Button, FontIcon } from 'react-md';

import { withMainComponent } from '../hoc';

const NewStock = ({saveNewStock, handleChange, partialState, value}) => {

    const styles = {
        largeInput: {
            height: 40,
            width: 240,
            padding: '10px 16px',
            fontSize: 16,
            lineHeight: 1.3333333,
            border: '2px solid #ccc',
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
            position: 'absolute',
            backgroundImage: 'none',
            boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, .075)',
            marginTop: -15
        },
        button: {
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
            width: 8, padding: 3, height: 40, borderColor: 18
        }
    }
    return (
        <Card className="card" raise>
            <CardTitle title="">
                <h3>Syncs in realtime across clients</h3>
            </CardTitle>
            <div style={{ width: '100%', height: 30, display: 'inline-flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', paddingLeft: 15, paddingRight: 15 }}>
                <TextField
                    id="stockcode"
                    name="stockcode"
                    placeholder="Supply company stock code"  
                    block
                    inputStyle={styles.largeInput}
                    onChange={handleChange}
                />
                <Button onClick={() => saveNewStock()} style={styles.button} primary raised>Add</Button>
            </div>
        </Card>
    )
}

NewStock.PropTypes = {
    handleChange: PropTypes.func.isRequired,
    saveNewStock: PropTypes.func.isRequired,
    partialState: PropTypes.func.isRequired,
    value: PropTypes.string
}

export default withMainComponent(NewStock);