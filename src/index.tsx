/* eslint-disable react/react-in-jsx-scope */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as style from './style.scss';
class App extends React.Component {
  public render (): JSX.Element {
    return (
      <div className={style.root}>
        New
      </div>
    );
  }
}

ReactDOM.render(<App />, document.body);
