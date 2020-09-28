

interface CreateEventData {
    date: Date
}

export interface Event {
    supporterId: string,
    id: string,
    date: string,
}

export const fetchEvents = async (): Promise<Event[]> => {
    const url = `${process.env.REACT_APP_BASE_URL}/events`;
    const result = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem("id_token")}`
        },
        mode: 'cors',
    });
    const data = await result.json();
    return data as Event[] || [];
}

export const createEvent = async (event: CreateEventData): Promise<Event> => {
    const uri = `${process.env.REACT_APP_BASE_URL}/events`;
    const response = await fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem("id_token")}`
        },
        mode: 'cors',
        body: JSON.stringify({ date: event.date?.toISOString() })
    });
    if (!response.ok) {
        throw new Error(`Couldn't create event. Status code: ${response.status}. Text: ${await response.text()}`);
    }
    return await response.json() as Event;
}