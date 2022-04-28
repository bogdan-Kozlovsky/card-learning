import React from 'react';
import ReactDOM from "react-dom/client";
import {BrowserRouter, HashRouter} from 'react-router-dom';
import './index.css';
import {App} from './ui/app/App/App';
import {Provider} from "react-redux";
import {store} from "./bll/store";

// ReactDOM.render(
//     <BrowserRouter>
//         <Provider store={store}>
//             <App/>
//         </Provider>
//     </BrowserRouter>,
//     document.getElementById('root')
// );

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>,
);