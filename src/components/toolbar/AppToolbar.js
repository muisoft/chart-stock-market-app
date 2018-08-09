import React from 'react';
import { Toolbar } from 'react-md';
 
const AppToolbar = ({ location, toolbar }) => {
    return (
        <div className="md-grid">
            <Toolbar
                id="app-toolbar"
                title="iStock-Chart"
                style={{backgroundColor: '#e6e6e6', color: 'black', fontSize: 35}}
                fixed
                colored />
        </div>
    )
}
export default AppToolbar;
