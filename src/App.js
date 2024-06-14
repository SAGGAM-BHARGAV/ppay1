import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home.js';
import PaySaggam from './paysaggam.js';
import EditForm from './editform.js'; 
import Checkout from './Checkout.js';
//import Server from './server.js';

const App = () => {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/create-post" element={<EditForm />} />
    <Route path="/PaySaggam" element={<PaySaggam />} />
    <Route path="/Checkout" element={<Checkout />} />
    </Routes>
  );
};

export default App;

/*
import React, { useState } from 'react';
import axios from 'axios';
import { load } from "@cashfreepayments/cashfree-js";
import './App.css';

function App() {
    const [paymentSessionId, setPaymentSessionId] = useState(null);

    const initializeSDK = async () => {
        const cashfree = await load({
            mode: "production", // Use "sandbox" for sandbox environment
        });
        return cashfree;
    };

    const createOrder = async () => {
        try {
            console.log("Creating order...");
            const response = await axios.post('/create-order'); // Call your server endpoint
            console.log("Response from server:", response.data);
            const { paymentSessionId } = response.data;
            console.log("Order created, session ID:", paymentSessionId);
            setPaymentSessionId(paymentSessionId);
            return paymentSessionId;
        } catch (error) {
            console.error('Error creating order:', error.response ? error.response.data.message : error.message);
        }
    };

    const doPayment = async () => {
        const sessionId = await createOrder();
        if (!sessionId) {
            console.error('Payment session ID not set');
            return;
        }

        const cashfree = await initializeSDK();
        const checkoutOptions = {
            paymentSessionId: sessionId,
            redirectTarget: "_self",
        };
        cashfree.checkout(checkoutOptions);
    };

    return (
        <div className="App">
            <header className="App-header">
                <p>Clickeate an order and open the checkout page in the current tab</p>
                <button type="submit" className="btn btn-primary" id="renderBtn" onClick={doPayment}>
                    Pay Now
                </button>
            </header>
        </div>
    );
}

export default App;

*/


