import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { handleResponses } from "./login";

interface CreateEventData {
    date: Date
}

export interface Event {
    supporterId: string,
    id: string,
    date: string,
}

export const useEvents = (): [Event[], (_loadEvents: boolean) => void] => {
    const [events, setEvents] = useState<Event[]>([]);
    const history = useHistory();
    const [loadEvents, setLoadEvent] = useState<boolean>(false);

    const fetchEvents = async() => {
        const url = `${process.env.REACT_APP_BASE_URL}/events`;
        const result = await handleResponses(history, fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem("id_token")}`
            },
            mode: 'cors',
        }));
        setLoadEvent(false);
        setEvents(await result.json() as Event[]);
    }

    useEffect(() => {
      console.log('useEvents detext a change in loadEvents', loadEvents);
      if (loadEvents){
        fetchEvents().catch(console.log);
      }
    }, [loadEvents])

    return [events, setLoadEvent ];
}

export const useCreateEvent = (): [(event: CreateEventData | null) => void, boolean] => {
    const [event, setEvent] = useState<CreateEventData | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();

    const createEvent = async() => {
        if (!event) {
            return;
        }
        setLoading(true);
        const url = `${process.env.REACT_APP_BASE_URL}/events`;
        const result = await handleResponses(history, fetch(url, {
            method: 'POST',
            body: JSON.stringify({ date: event.date?.toISOString() }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem("id_token")}`
            },
            mode: 'cors',
        }));
        setEvent(null);
        setLoading(false);
    }

    useEffect(() => {
        createEvent().catch(console.log);
    }, [event])

    return [setEvent, loading];
}

export const useCreateGoogleCalendar = (): [(event: Event | null) => void, boolean] => {
  const [event, setEvent] = useState<Event | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  const createGoogleCalendar = async() => {
      if (!event) {
          return;
      }
      setLoading(true);
      const url = `${process.env.REACT_APP_BASE_URL}/events/${event.id}/google-meeting`;
      await handleResponses(history, fetch(url, {
          method: 'POST',
          body: JSON.stringify(event),
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${window.localStorage.getItem("id_token")}`
          },
          mode: 'cors',
      }));
      setEvent(null);
      setLoading(false);
  }

  useEffect(() => {
      createGoogleCalendar().catch(console.log);
  }, [event])

  return [setEvent, loading];
}
