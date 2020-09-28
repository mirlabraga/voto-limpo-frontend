export interface Event {
  id: string,
  supporterId: string,
  date: string;
}

export const fetchEvent = () : Event[] => {
  fetch(process.env.REACT_APP_CREATE_EVENT_URI || "https://localhost:3000/events", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.localStorage.getItem("id_token")}`
      },
      mode: 'cors',
    }).then(response => {
      return response.json()
    }).then(data => {
      console.log(data);
      return data as Event[];
    });

    return [{"id":"35abb31c-6929-4587-ab27-ece10e6e51a6","date":"2020-09-09T13:52:00.000Z","supporterId":"105375895725114679090"},{"id":"7df92e5c-b21c-47af-a7a7-30ab05ccf77f","date":"2020-09-30T17:49:00.000Z","supporterId":"105375895725114679090"},{"id":"a82b3c71-714d-4b8d-89bb-e9bcdf39cfcb","date":"2020-09-02T14:52:00.000Z","supporterId":"105375895725114679090"},{"id":"c3e3dbca-3811-4164-842e-b1e6ab715927","date":"2020-09-16T13:51:00.000Z","supporterId":"105375895725114679090"}] as Event[];
}

export default [fetchEvent, Event];
