/* eslint-disable react/react-in-jsx-scope */
// import * as React from 'preact/compat';
import { createElement, Component } from 'react';
import { render } from 'react-dom';
import { Grommet } from 'grommet';

class App extends Component {
  public render (): JSX.Element {
    return (
      <Grommet plain>
        <button>Click Click</button>
      </Grommet>
    );
  }
}

render(<App />, document.getElementById('app') as HTMLElement);
