

interface CreateEventData {
    date: Date
}

interface Event {
    date: string,
    id: string
}
export const createEvent = async(event: CreateEventData): Promise<Event> => {
    const uri = `${process.env.REACT_APP_BASE_URL}/events`;
    const response = await fetch(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.localStorage.getItem("id_token")}`
        },
        mode: 'cors',
        body: JSON.stringify({date: event.date?.toISOString()})
    });
    if (!response.ok) {
        throw new Error(`Couldn't create event. Status code: ${response.status}. Text: ${await response.text()}`);
    }
    return await response.json() as Event;
}