import filter from 'lodash/filter';
import { db } from '../../firebase';
import lf from '../../localforage';

export const actionTypes = {
  LOAD_EVENTS: 'events/LOAD_EVENTS',
  GET_EVENT_DETAILS: 'events/GET_EVENT_DETAILS',
};

const mutationTypes = {
  LOAD_EVENTS_SUCCESS: 'events/LOAD_EVENTS_SUCCESS',
  GET_EVENT_DETAILS_SUCCESS: 'events/GET_EVENT_DETAILS_SUCCESS',
};

const state = {
  events: [],
  selectedEvent: {},
};

const actions = {
  [actionTypes.LOAD_EVENTS](context) {
    const eventsRef = db.ref('events');
    if (navigator.onLine) {
      eventsRef.on('value', (snapshot) => {
        const events = filter(snapshot.val(), e => e);
        context.commit(mutationTypes.LOAD_EVENTS_SUCCESS, { events });
        lf.setItem('events', events);
      });
    } else {
      lf.getItem('events').then((value) => {
        context.commit(mutationTypes.LOAD_EVENTS_SUCCESS, { value });
      });
    }
  },

  [actionTypes.GET_EVENT_DETAILS](context) {
    const seoSlug = context.rootState.route.params.seoSlug;
    const eventRef = db.ref('events').orderByChild('seoSlug').equalTo(seoSlug);
    eventRef.on('child_added', (snapshot) => {
      const event = snapshot.val();
      context.commit(mutationTypes.GET_EVENT_DETAILS_SUCCESS, { event });
    });
  },
};

const mutations = {
  [mutationTypes.LOAD_EVENTS_SUCCESS](state, { events }) {
    state.events = events;
  },
  [mutationTypes.GET_EVENT_DETAILS_SUCCESS](state, { event }) {
    state.selectedEvent = event;
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
