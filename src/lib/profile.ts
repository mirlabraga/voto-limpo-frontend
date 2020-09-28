import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { handleResponses } from "./login";


export const useProfileScopes = (): string[] => {
    const [scopes, setScopes] = useState<string[]>([]);
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
        if (!result.ok) {
          throw new Error(`Couldn't load scopes. ${result.status}  - ${await result.text()}`)
        }
        const body = await result.json();
        if (Array.isArray(body)) {
          setScopes(body as string[]);
        } else {
          throw new Error(`Couldn't load scopes. ${body}`)
        }
    }

    useEffect(() => {
        fetchEvents().catch(console.log);
    }, [])

    return scopes;
}
