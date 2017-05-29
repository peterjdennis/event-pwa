<template>
  <event-form @submitted="onSubmit">
  </event-form>
</template>

<script>

  import { db } from '../firebase';
  import EventForm from './EventForm';


  export default {
    name: 'AdminEditEvent',
    data() {
      return {

      };
    },
    components: {
      EventForm,
    },
    methods: {
      onSubmit(payload) {
        console.log(payload);
        const newEventRef = db.ref(`events/${payload.id}`);
        newEventRef.set(payload);
        this.$router.push({ name: 'admin' });
      },
    },
  };

</script>

<style lang="scss"></style>
