import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { handleResponses } from "./login";


export const useProfileScopes = (): string[] => {
    const [events, setEvents] = useState<string[]>([]);
    const history = useHistory();

    const fetchEvents = async() => {
        const url = `${process.env.REACT_APP_BASE_URL}/profile/scopes`;
        const result = await handleResponses(history, fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem("id_token")}`
            },
            mode: 'cors',
        }));
        setEvents(await result.json() as string[]);
    }

    useEffect(() => {
        fetchEvents().catch(console.log);
    }, [])
    
    return events;
}
