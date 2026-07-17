import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./SOSHistory.css";

import { auth, db } from "../firebase";
import {
    collection,
    query,
    where,
    getDocs
} from "firebase/firestore";

function SOSHistory() {

    const [history, setHistory] = useState([]);

    useEffect(() => {

        const fetchHistory = async () => {

            const user = auth.currentUser;

            if (!user) return;

            try {

                const q = query(
                    collection(db, "sosRequests"),
                    where("userId", "==", user.uid)
                );

                const snapshot = await getDocs(q);

                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setHistory(data);

            } catch (error) {
                alert(error.message);
            }

        };

        fetchHistory();

    }, []);

    return (
        <>
            <Navbar />

            <div className="hero">

                <h1>📋 My SOS History</h1>

                {history.length === 0 ? (

                    <p>No SOS Requests Found.</p>

                ) : (

                    <table className="history-table">

                        <thead>

                            <tr>
                                <th>#</th>
                                <th>Status</th>
                                <th>Emergency</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Location</th>
                            </tr>

                        </thead>

                        <tbody>

                            {history.map((item, index) => (

                                <tr key={item.id}>

                                    <td>{index + 1}</td>

                                    <td>
                                        <span className={`status-${item.status.toLowerCase()}`}>
                                            {item.status}
                                        </span>
                                    </td>

                                    <td>{item.emergencyType || "-"}</td>

                                    <td>{item.description || "-"}</td>

                                    <td>
                                        {item.time?.toDate()
                                            .toLocaleString()}
                                    </td>

                                    <td>
                                        <a
                                            href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            📍 Open Map
                                        </a>
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

        </>
    );
}

export default SOSHistory;