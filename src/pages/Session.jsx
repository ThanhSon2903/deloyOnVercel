import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function Session(){
    const [session,setSession] = useState([]);
    useEffect(() => {
        fetchFunction();
    },[]);

    const fetchFunction = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axiosClient.get(
                "http://localhost:8080/api/sessions/list-sessions",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setSession(res.data.data);
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Duration</th>
                        <th>Bad Posture</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {session.map(session => (
                        <tr key={session.sessionId}>

                            <td>{session.sessionId}</td>

                            <td>{session.startTime}</td>

                            <td>{session.endTime}</td>

                            <td>{session.duration}</td>

                            <td>{session.badPostureDuration}</td>

                            <td>
                                <button>
                                    View
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Session;