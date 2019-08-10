Vue.use(VueMaterial.default);

const data = getData();
const title = data.title;
const pages = data.pages;
console.log({ title, pages });

const App = {
  name: 'App',
  template: `
    <div>
      <topbar 
        :screenType="screenType"
        :isMobile="isMobile"
        :isDesktop="isDesktop"
        v-on:mobile="switchMobile()"
        v-on:desktop="switchDesktop()"
      />
      <transition name="slide-fade">
        <div v-if="show" class="app-screen md-layout">
          <div class="md-layout-item md-xlarge-size-70 md-large-size-60 md-xsmall-size-100">
            <div class="screen-container">
              <screen 
                :currentPage="currentPage" 
                :isMobile="isMobile"
                :isDesktop="isDesktop"
              />
            </div>
          </div>
          <div class="md-layout-item md-xlarge-size-30 md-large-size-40 md-xsmall-size-100">
            <div class="info-container">
              <info-panel 
                :maxIndex="maxIndex"
                :currentIndex="currentIndex"
                :currentPage="currentPage"
                v-on:prevPage="decrementPage()"
                v-on:nextPage="incrementPage()"
              />
            </div>
          </div>
        </div>
      </transition>
    </div>
  `,
  data: function() {
    return {
      maxIndex: pages.length - 1,
      currentIndex: 0,
      show: false
    };
  },
  computed: {
    currentPage() {
      const matching = pages.find(p => p.id === this.currentPageId);
      return matching;
    },
    currentPageId() {
      return this.$route.params.id;
    },
    screenType() {
      return this.$route.params.view;
    },
    isMobile() {
      return this.screenType === 'mobile';
    },
    isDesktop() {
      return this.screenType === 'desktop';
    }
  },
  mounted() {
    this.ensureViewValid();
    this.ensureIdValid();
    const matching = pages.find(p => p.id === this.currentPageId);
    this.currentIndex = matching.index;
    setTimeout(() => {
      this.show = true;
    }, 10);
  },
  methods: {
    ensureViewValid() {
      if (this.screenType !== 'mobile' && this.screenType !== 'desktop') {
        this.gotoView('mobile', this.currentPageId);
      }
    },
    ensureIdValid() {
      const matching = pages.find(p => p.id === this.currentPageId);
      const pageIdExists = !!matching;
      if (!pageIdExists) {
        const p = pages[0];
        this.gotoView(this.screenType, p.id);
      }
    },
    gotoView(view, id) {
      this.$router.push(`/${view}/${id}`);
    },
    decrementPage() {
      this.currentIndex--;
      const p = pages[this.currentIndex];
      this.$router.push(p.id);
    },
    incrementPage() {
      this.currentIndex++;
      const p = pages[this.currentIndex];
      this.$router.push(p.id);
    },
    switchMobile() {
      this.gotoView('mobile', this.currentPageId);
    },
    switchDesktop() {
      this.gotoView('desktop', this.currentPageId);
    }
  }
};

const router = new VueRouter({
  routes: [
    { path: '/:view/:id', component: App },
    { path: '/', redirect: '/browser/start' }
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
    let areas = [];
    if (!!pageImgMap) {
      areas = Array.from(pageImgMap.areas);
    }
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
