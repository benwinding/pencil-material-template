Vue.use(VueMaterial.default);

const data = getData();
const title = data.title;
const pages = data.pages;
console.log({ title, pages });

Vue.component('screen', {
  props: ['imgsrc'],
  template: `
  <md-card class="screen-card">
    <span class="screen-url">https://www.example.com/</span>
    <md-icon class="screen-x">clear</md-icon>
    <img class="screen-img" v-bind:src="imgsrc" />
  </md-card>  
  `
});

Vue.component('infopanel', {
  props: ['currentIndex', 'maxIndex', 'currentPage'],
  template: `
<md-card md-with-hover>
   <md-card-header>
      <md-card-header-text>
         <div class="md-title">{{ currentPage.title }}</div>
      </md-card-header-text>
   </md-card-header>
   <md-card-content v-html="currentPage.note">
   </md-card-content>
   <md-card-actions>
      <md-button 
        class="md-icon-button md-raised md-primary" 
        v-on:click="$emit('prevPage')"
        v-bind:disabled="currentIndex <= 0"
      >
        <md-icon>chevron_left</md-icon>
        <md-tooltip md-direction="top">Previous Page</md-tooltip>
      </md-button>
      <pre>[{{currentIndex}}/2]</pre>
      <md-button 
        class="md-icon-button md-raised md-primary" 
        v-on:click="$emit('nextPage')"
        v-bind:disabled="currentIndex >= maxIndex"
      >
        <md-icon>chevron_right</md-icon>
        <md-tooltip md-direction="top">Next Page</md-tooltip>
      </md-button>
   </md-card-actions>
</md-card>  `
});

const App = {
  name: 'App',
  template: `
    <div>
      <md-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button">
              <md-icon>view_carousel</md-icon>
            </md-button>
            <h3 class="md-title">{{title}}</h3>
          </div>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button">
              <md-icon>fullscreen</md-icon>
            </md-button>
          </div>
        </div>
      </md-toolbar>
      <div class="app-screen md-layout md-alignment-center">
        <div class="md-layout-item md-xlarge-size-70 md-large-size-60 md-xsmall-size-100">
          <div class="screen-container">
            <screen v-bind:imgsrc="currentPage.src" />
          </div>
        </div>
        <div class="md-layout-item md-xlarge-size-30 md-large-size-40 md-xsmall-size-100">
          <div class="info-container">
            <infopanel 
              v-bind:maxIndex="maxIndex"
              v-bind:currentIndex="currentIndex"
              v-bind:currentPage="currentPage"
              v-on:prevPage="decrementPage()"
              v-on:nextPage="incrementPage()"
            />
          </div>
        </div>
      </div>
    </div>
  `,
  data: function() {
    return {
      currentIndex: 0,
      maxIndex: pages.length - 1
    };
  },
  computed: {
    currentPage() {
      return pages[this.currentIndex];
    }
  },
  methods: {
    decrementPage() {
      this.currentIndex--;
    },
    incrementPage() {
      this.currentIndex++;
    }
  }
};

new Vue({
  render: h => h(App)
}).$mount(`#app`);

// Get data

function getData() {
  let i, p;

  // Get page
  const page = document.querySelector('#page');

  // Get title
  const title = page.querySelector('#documentTitle span').textContent;

  // Get all pages
  const pagesElements = page.querySelectorAll('.Page');
  const pages = [];
  for (i = 0; i < pagesElements.length; i++) {
    p = pagesElements[i];
    pages.push({
      id: p.id,
      title: p.querySelector('.Texts .Title').textContent,
      note:
        p.querySelector('.Texts .Note') &&
        p.querySelector('.Texts .Note').nextElementSibling
          ? p.querySelector('.Texts .Note').nextElementSibling.innerHTML
          : '',
      src: p.querySelector('.Image img').src,
      map: p.querySelector('.Image map')
        ? p.querySelector('.Image map')
        : '',
      index: i
    });
  }

  // Return data
  return {
    title: title,
    pages: pages
  };
}
