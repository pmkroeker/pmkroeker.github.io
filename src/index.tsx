/* eslint-disable react/react-in-jsx-scope */
import * as React from 'preact/compat';
// import * as ReactDOM from 'react-dom';
import * as style from './style.scss';
import { Entry } from './Entry';
class App extends React.Component {
  public render (): JSX.Element {
    return (
      <div class={style.root}>
        <Entry />
      </div>
    );
  }
}

React.render(<App />, document.body);
