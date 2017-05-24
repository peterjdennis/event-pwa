import filter from 'lodash/filter';
import { db } from '../../firebase';
import lf from '../../localforage';

export const actionTypes = {
  GET_EVENTS: 'events/GET_EVENTS',
};

const mutationTypes = {
  GET_EVENTS_SUCCESS: 'events/GET_EVENTS_SUCCESS',
  GET_EVENTS_FAILURE: 'events/GET_EVENTS_FAILURE',
};

const state = {
  events: [],
};

const actions = {
  [actionTypes.GET_EVENTS](context) {
    const eventsRef = db.ref('events');
    if (navigator.onLine) {
      eventsRef.on('value', (snapshot) => {
        const events = filter(snapshot.val(), e => e);
        context.commit(mutationTypes.GET_EVENTS_SUCCESS, { events });
        lf.setItem('events', events);
      });
    } else {
      lf.getItem('events').then((value) => {
        context.commit(mutationTypes.GET_EVENTS_SUCCESS, { value });
      });
    }
  },
};

const mutations = {
  [mutationTypes.GET_EVENTS_SUCCESS](state, { events }) {
    state.events = events;
  },
};

const getters = {

};

export default {
  state,
  actions,
  mutations,
  getters,
};
