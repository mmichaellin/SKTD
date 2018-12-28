import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import {Homepage} from './components'

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Homepage} />
      </Switch>
    )
  }
}
