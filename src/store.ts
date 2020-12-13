import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    calendar: [...Array(31).keys()].map(i => ({
      date: i + 1,
      todos: Array(),
    })),
    selectedDate: new Date().getDate(),
  },
  getters: {
    DATES: state => state.calendar.map(el => el.date),
    TODOS: state => state.calendar[state.selectedDate - 1].todos,
    GET_TODOS_LENGTH_BY_DATE: state => (date: number) => state.calendar.find(el => el.date === date)?.todos.length,
    SELECTED_DATE: state => state.selectedDate,
  },
  mutations: {
    ADD_TODO: (state, payload) => state.calendar[payload.date - 1].todos.push({
      id: Date.now(),
      content: payload.todo,
      checked: false,
    }),
    CHECK_TODOS: (state, payload) => state.calendar[payload.date - 1].todos = payload.todos,
    CHANGE_SELECTED_DAY: (state, payload) => state.selectedDate = payload,
  },
  actions: {
    SAVE_TODO: (context, payload) => context.commit('ADD_TODO', payload),
    UPDATE_TODOS: (context, payload) => context.commit('CHECK_TODOS', payload),
    SAVE_SELECTED_DAY: (context, payload) => context.commit('CHANGE_SELECTED_DAY', payload),
  },
})
