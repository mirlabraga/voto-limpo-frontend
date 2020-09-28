import React from 'react';
import ListEvents from '../events/ListEvents';
import Template from '../template/Template';

export default function Dashboard() {
  return (
    <div>
      <Template page = {<ListEvents />}/>
    </div>
  );
}
