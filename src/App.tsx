import { Component, Vue } from 'vue-property-decorator';
import Calendar from './components/Calendar';
import Todo from './components/Todo';

import './App.css'

@Component
export default class App extends Vue {
  render() {
    return (
      <div id="app">
        <div class="container">
          <Calendar />
          <Todo />
        </div>
      </div>
    )
  }
}
