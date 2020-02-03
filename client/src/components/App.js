import React from "react";
import IndexRoute from "../route/IndexRoute";

import 'ag-grid-enterprise';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import MenuPublishedNotification from "./MenuPublishedNotification";

function App() {
    return (
        <div>
            <IndexRoute />
            <MenuPublishedNotification/>
        </div>
    );
}
export default App;
