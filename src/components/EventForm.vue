<template>
  <form class="input-container" v-on:submit.prevent="onSubmit">
    <mdl-textfield floating-label="Tytuł" v-model="event.title"></mdl-textfield>
    <mdl-textfield floating-label="Opis" v-model="event.desc"></mdl-textfield>
    <mdl-textfield floating-label="Agenda" textarea rows="15" v-model="event.agenda"></mdl-textfield>
    <p class="agenda-preview"><i class="material-icons">chevron right</i>Podgląd agendy:</p>
    <div class="agenda" v-html="compiledMarkdown"></div>

    <mdl-textfield floating-label="Adres obrazka" v-model="event.imageUrl"></mdl-textfield>
    <mdl-checkbox v-model="event.active">Wydarzenie aktywne</mdl-checkbox>
    <mdl-checkbox v-model="event.open">Zapisy otwarte</mdl-checkbox>
    <mdl-textfield floating-label="ID Wydarzenia" v-model="event.id"></mdl-textfield>
    <mdl-textfield floating-label="SEO Slug" v-model="event.seoSlug"></mdl-textfield>
    <button type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
      Zapisz
    </button>
  </form>
</template>

<script>

  import marked from 'marked';

  export default {
    name: 'EventForm',
    props: {
      event: {
        type: Object,
        default() {
          return {
            title: '',
            desc: '',
            agenda: '',
            imageUrl: '',
            active: false,
            open: false,
            id: '',
            seoSlug: '',
          };
        },
      },
    },
    computed: {
      compiledMarkdown: props => marked(
        props.event.agenda,
        { gfm: true, tables: true, breaks: true },
      ),
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
.agenda {
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    font-size: 16px;

    li {
      border-bottom: 1px solid #dcdcdc;
      padding: 8px 0;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
