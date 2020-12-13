import { Component } from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';

import styles from './styles.css?module';

interface ITodo {
  id: number,
  content: string,
  checked: boolean,
}

interface Props { }

@Component
export default class Calendar extends VueComponent<Props> {

  get todos(): ITodo[] {
    return this.$store.getters.TODOS
  }

  handleInput(e: any): void {
    e.preventDefault();
    e.target['input'].value.trim().length ? this.$store.dispatch('SAVE_TODO', {
      date: this.$store.getters.SELECTED_DATE,
      todo: e.target['input'].value
    }) : null;
    e.target['input'].value = '';
  }

  setCheckbox(i: number, checked: boolean) {
    const newCheckboxes = [...this.todos]
    newCheckboxes[i].checked = checked;
    this.$store.dispatch('UPDATE_TODOS', {
      date: this.$store.getters.SELECTED_DATE,
      todos: newCheckboxes
    })
  }

  render() {
    return (
      <div class={styles.todoRoot}>
        <div class={styles.title}>События</div>
        {this.todos.map((todo, i) =>
          <div class={styles.todoItem}>
            <input
              type="checkbox"
              id={todo.id}
              name="todo"
              checked={todo.checked}
              onChange={(e: { target: HTMLInputElement }) => this.setCheckbox(i, e.target.checked)}>
            </input>
            <label for={todo.id}>{todo.content}</label>
          </div>)}
        <form onSubmit={this.handleInput} >
          <input type="text" name="input" placeholder="Текст" class={styles.addTodo} />
        </form>
      </div>
    )
  }
}
