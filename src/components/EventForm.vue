<template>
  <form class="input-container" v-on:submit.prevent="onSubmit">
    <mdl-textfield floating-label="Tytuł" v-model="event.title"></mdl-textfield>
    <mdl-textfield floating-label="Opis" v-model="event.desc"></mdl-textfield>
    <mdl-textfield floating-label="Agenda" textarea rows="15" v-model="event.agenda"></mdl-textfield>
    <mdl-textfield floating-label="Adres obrazka" v-model="event.imageUrl"></mdl-textfield>
    <mdl-checkbox v-model="event.active">Wydarzenie aktywne</mdl-checkbox>
    <mdl-checkbox v-model="event.open">Zapisy otwarte</mdl-checkbox>
    <mdl-textfield floating-label="SEO Slug" v-model="event.seoSlug"></mdl-textfield>
    <button type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
      Zapisz
    </button>
  </form>
</template>

<script>

  export default {
    name: 'EventForm',
    props: {
      event: {
        type: Object,
      },
    },

    created() {
    },
    methods: {
      onSubmit() {
        const thisEvent = this.event;
        const formPayload = {
          active: thisEvent.active,
          agenda: thisEvent.agenda,
          desc: thisEvent.desc,
          id: thisEvent.id,
          imageUrl: thisEvent.imageUrl,
          open: thisEvent.open,
          seoSlug: thisEvent.seoSlug,
          title: thisEvent.title,
        };
        this.$emit('submitted', formPayload);
      },
    },
  };

</script>

<style lang="scss">
.input-container {
  display: flex;
  flex-direction: column;
}
</style>
