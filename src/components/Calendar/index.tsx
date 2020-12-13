import { Component } from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';

import styles from './styles.css?module';

interface Props { }

@Component
export default class Calendar extends VueComponent<Props> {

  days: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  dates: number[] = this.$store.getters.DATES

  get selectedDate(): number {
    return this.$store.getters.SELECTED_DATE
  }

  todosLengthByDate(date: number): number {
    return this.$store.getters.GET_TODOS_LENGTH_BY_DATE(date)
  }

  selectDate(val: number): void {
    this.$store.dispatch('SAVE_SELECTED_DAY', val)
  }

  render() {
    return (
      <div class={styles.calendarRoot}>
        <div class={styles.title}>Декабрь 2020</div>
        <div class={styles.daysContainer}>
          {this.days.map((day) => <div>{day}</div>)}
        </div>
        <div class={styles.datesContainer}>
          {this.dates.map((date) =>
            <div
              onClick={() => this.selectDate(date)}
              class={
                (this.todosLengthByDate(date) > 0 && this.selectedDate === date) && `${styles.date} ${styles.selected} ${styles.hasTodos}` ||
                (this.todosLengthByDate(date) > 0) && `${styles.date} ${styles.hasTodos}` ||
                (this.selectedDate === date) && `${styles.date} ${styles.selected}` ||
                styles.date
              }>
              {date}
            </div>)}
        </div>
      </div>
    )
  }
}
