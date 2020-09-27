import React from 'react';
import { Typography } from "@material-ui/core";
import Template from '../template/Template';
import Content from './Content';

export default function Dashboard() {
  return (
    <div>
      <Template page = {<Content/>}/>
    </div>
  );
}
