import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Cadastro from '../pages/Cadastro';

export default function Routes() {
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/cadastro' component={Cadastro} />
      <Route path='/editar/:id' component={Cadastro} />
    </Switch>
  );
}
