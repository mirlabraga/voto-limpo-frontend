import React from 'react';
import { generateAddScopeUrl, getSupporter } from '../../lib/login';
import ListEvents from '../events/ListEvents';
import Template from '../template/Template';

export default function Dashboard() {
  return (
    <div>
      <Template page = {<ListEvents />}/>
    </div>
  );
}
