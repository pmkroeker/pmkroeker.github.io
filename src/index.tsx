import { h, render, Component, JSX } from 'preact';
import * as style from './style.scss';
class App extends Component {
  public render (): JSX.Element {
    return (
      <div class={style.root}>
        New
        <button>Click Me</button>
      </div>
    );
  }
}

render(<App />, document.body);
