import React from 'react';
import ReactDOM, { render } from 'react-dom';
import Customer from "./components/customer";

it('renders without crashing',() => {
    const div = document.createElement("div");
    ReactDOM.render(<div className='container mt-3'></div>,div);
    ReactDOM.unmountComponentAtNode(div);
});