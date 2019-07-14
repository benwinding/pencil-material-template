Vue.use(VueMaterial.default);

const data = getData();
const title = data.title;
const pages = data.pages;
console.log({ title, pages });

Vue.component('screen', {
  props: ['currentPage'],
  template: `
    <md-card class="screen-card">
      <span class="screen-url">https://www.example.com/</span>
      <md-icon class="screen-x">clear</md-icon>
      <div class="img-container">
        <img
        class="screen-img"
        v-bind:src="currentPage.src"
        />
      </div>
      <div v-if="highlightBtns" class="screen-btns-overlay">
        <router-link
          v-for="area in currentPage.areas"
          :style="{
            position: 'absolute',
            left: area.pos_left,
            top: area.pos_top,
            right: area.pos_right,
            bottom: area.pos_bottom,
            background: 'rgba(255, 128, 128, 0.333)'
          }"
          :key="area.href"
          :to="area.id"
          :shape="area.shape"
          :alt="area.title"
          :coords="area.coords"
        >
        </router-link>
      </div>
    </md-card>  
  `,
  data: function() {
    return {
      highlightBtns: true
    };
  },
  methods: {
    highlightBtnAreas() {
      this.highlightBtns = true;
      setTimeout(() => {
        this.highlightBtns = false;
      }, 1000);
    }
  }
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
    </md-card>  
  `
});

const App = {
  name: 'App',
  template: `
    <div>
      <md-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start has-ellipsis">
            <md-button class="md-icon-button">
              <md-icon>view_carousel</md-icon>
            </md-button>
            <span class="md-title">{{title}}</span>
          </div>

          <div>
            <md-button class="md-icon-button">
              <md-icon>fullscreen</md-icon>
            </md-button>
          </div>
        </div>
      </md-toolbar>
      <div class="app-screen md-layout md-alignment-center">
        <div class="md-layout-item md-xlarge-size-70 md-large-size-60 md-xsmall-size-100">
          <div class="screen-container">
            <screen 
              v-bind:currentPage="currentPage" 
            />
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
      maxIndex: pages.length - 1,
      currentIndex: 0
    };
  },
  computed: {
    currentPage() {
      const matching = pages.find(p => p.id === this.currentPageId);
      return matching;
    },
    currentPageId() {
      return this.$route.params.id;
    }
  },
  mounted() {
    const matching = pages.find(p => p.id === this.currentPageId);
    this.currentIndex = matching.index;
  },
  methods: {
    decrementPage() {
      this.currentIndex--;
      const p = pages[this.currentIndex];
      this.$router.push(p.id);
    },
    incrementPage() {
      this.currentIndex++;
      const p = pages[this.currentIndex];
      this.$router.push(p.id);
    }
  }
};

const router = new VueRouter({
  routes: [
    { path: '/:id', component: App },
    { path: '/', redirect: '/start' }
  ]
});

new Vue({
  router: router
}).$mount(`#app`);

// Get data
function getData() {
  // Get page
  const page = document.querySelector('#page');
  // Get title
  const title = page.querySelector('#documentTitle span').textContent;
  // Get all pages
  const pagesElements = page.querySelectorAll('.Page');
  const pages = [];
  for (let i = 0; i < pagesElements.length; i++) {
    const p = pagesElements[i];
    const pageTitle = p.querySelector('.Texts .Title').textContent;
    const hasNotes =
      p.querySelector('.Texts .Note') &&
      p.querySelector('.Texts .Note').nextElementSibling;
    let notes;
    if (hasNotes) {
      notes = p.querySelector('.Texts .Note').nextElementSibling.innerHTML;
    }
    const pageImg = p.querySelector('.Image img');
    const pageImgMap = p.querySelector('.Image map');
    const hasMaps = !!pageImgMap;
    const areas = Array.from(pageImgMap.areas);
    const iW = pageImg.width;
    const iH = pageImg.height;
    const areasMap = areas.map(area => {
      const area_arr = area.coords.split(',');
      const x0 = area_arr[0];
      const y0 = area_arr[1];
      const x1 = area_arr[2];
      const y1 = area_arr[3];
      return {
        shape: area.shape,
        coords: area.coords,
        pos_left: (100 * x0 / iW) + '%',
        pos_top: (100 * y0 / iH) + '%',
        pos_right: (100 * (iW - x1) / iW) + '%',
        pos_bottom: (100 * (iH - y1) / iH) + '%',
        href: area.href,
        id: area.id,
        href_index: i,
        title: area.title,
      }
    })
    if (hasMaps) {
      pageImgMap;
    }
    pages.push({
      id: p.id,
      title: pageTitle,
      note: notes,
      src: pageImg.src,
      areas: areasMap,
      index: i
    });
  }
  // Return data
  return {
    title: title,
    pages: pages
  };
}
