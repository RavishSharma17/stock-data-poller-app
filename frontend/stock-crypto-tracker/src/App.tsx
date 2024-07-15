import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { fetchStockData } from './redux/actions/stockActions';
import { setSymbol } from './redux/reducers/stockReducer';
import { setShowModal, setNewSymbol } from './redux/reducers/uiReducer';
import { Modal, Button, Table, Form } from 'react-bootstrap'; // Include Form from react-bootstrap
import './App.css'; // Import custom styles

const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, symbol, status, lastFetchTime } = useSelector((state: RootState) => state.stock);
    const { showModal, newSymbol } = useSelector((state: RootState) => state.ui);
    const [elapsedTime, setElapsedTime] = useState<number | null>(null);

    const fetchData = useCallback(() => {
        dispatch(fetchStockData(symbol));
    }, [dispatch, symbol]);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, [fetchData]);

    useEffect(() => {
        if (lastFetchTime) {
            const intervalId = setInterval(() => {
                const elapsed = Math.floor((Date.now() - lastFetchTime) / 1000);
                setElapsedTime(elapsed);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [lastFetchTime]);

    const handleSave = () => {
        dispatch(setSymbol(newSymbol));
        dispatch(setShowModal(false));
        fetchData();
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="mb-4">Real-time Stock Prices</h1>
                <Button variant="primary" onClick={() => dispatch(setShowModal(true))}>
                    Change Stock/Crypto
                </Button>
            </header>

            <Modal show={showModal} onHide={() => dispatch(setShowModal(false))} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Change Crypto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Enter a supported crypto symbol:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter symbol (e.g., bitcoin, ethereum)"
                            value={newSymbol}
                            onChange={(e) => dispatch(setNewSymbol(e.target.value.toLocaleLowerCase()))}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => dispatch(setShowModal(false))}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="container mt-4">
                <p className="mb-2">Supported symbols: ethereum, bitcoin, gold, busd, dogecoin</p>
                <p className="mb-2">Elapsed Time Since Last Fetch: {elapsedTime !== null ? `${elapsedTime} seconds` : 'Loading...'}</p>
                <p className="mb-4">Symbol: {symbol}</p>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Price (USD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {status === 'loading' && (
                            <tr>
                                <td colSpan={2}>Loading...</td>
                            </tr>
                        )}
                        {status === 'succeeded' &&
                            data.slice(0, 20).map((entry, index) => (
                                <tr key={index}>
                                    <td>{new Date(entry.timestamp).toLocaleTimeString()}</td>
                                    <td>{entry.price}</td>
                                </tr>
                            ))}
                        {status === 'failed' && (
                            <tr>
                                <td colSpan={2}>Failed to fetch data</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default App;
