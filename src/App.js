import React from 'react';

import {Provider} from "react-redux";
import store from "./store";

import {Header} from "./components/Header";
import {Filter} from "./components/Filter";
import {Chart} from "./components/Chart";

import "./App.css"

export default function App() {
    return (
        <Provider store={store}>
            <div className={"app"}>
                <Header/>
                <Filter/>
                <Chart/>
            </div>
        </Provider>
    )
}
