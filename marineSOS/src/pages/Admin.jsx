import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Admin.css";

import { db } from "../firebase";
import {
    collection,
    getDocs,
    updateDoc,
    doc
} from "firebase/firestore";

function Admin() {

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {

        const snapshot = await getDocs(collection(db, "sosRequests"));

        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        setRequests(data);

    };

    const markResolved = async (id) => {

        await updateDoc(doc(db, "sosRequests", id), {
            status: "Resolved"
        });

        fetchRequests();

    };

    return (
        <>
            <Navbar />

            <div className="hero">

                <h1>🚨 Admin Dashboard</h1>

                <table className="history-table">

                    <thead>

                        <tr>
                            <th>User</th>
                            <th>Emergency</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {requests.map((item) => (

                            <tr key={item.id}>

                                <td>{item.email}</td>

                                <td>{item.emergencyType}</td>

                                <td>{item.status}</td>

                                <td>

                                    <button
                                        onClick={() => markResolved(item.id)}
                                    >
                                        Resolve
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </>
    );

}

export default Admin;