Vue.component('mobile', {
  props: ['currentPage'],
  template: `
    <div>
      <span class="screen-url">https://www.mobile.com/</span>
      <md-icon class="screen-x">clear</md-icon>
      <div class="img-container">
        <img
          class="screen-img"
          :src="currentPage.src"
        />
      </div>
    </div>
  `
});

Vue.component('tablet', {
  props: ['currentPage'],
  template: `
    <div>
      <span class="screen-url">https://www.tablet.com/</span>
      <md-icon class="screen-x">clear</md-icon>
      <div class="img-container">
        <img
          class="screen-img"
          :src="currentPage.src"
        />
      </div>
    </div>
  `
});

Vue.component('desktop', {
  props: ['currentPage'],
  template: `
    <div>
      <span class="screen-url">https://www.browser.com/</span>
      <md-icon class="screen-x">clear</md-icon>
      <div class="img-container">
        <img
          class="screen-img"
          :src="currentPage.src"
        />
      </div>
    </div>
  `
});

Vue.component('screen', {
  props: ['currentPage', 'isMobile', 'isTablet', 'isDesktop'],
  template: `
    <md-card class="screen-card">
      <mobile 
        :currentPage="currentPage" 
        v-if="isMobile" 
      />
      <tablet 
        :currentPage="currentPage" 
        v-if="isTablet" 
      />
      <desktop 
        :currentPage="currentPage" 
        v-if="isDesktop" 
      />
      <div class="screen-btns-overlay">
        <router-link
          v-for="area in currentPage.areas"
          :class="{ highlight: highlightBtns}"
          class="screen-btn"
          :style="{
            left: area.pos_left,
            top: area.pos_top,
            right: area.pos_right,
            bottom: area.pos_bottom,
          }"
          :key="area.href"
          :to="area.id"
          :shape="area.shape"
          :alt="area.title"
          :coords="area.coords"
        >
        </router-link>
        <div 
          class="screen-btn-flash-overlay" 
          @click.stop="highlightBtnAreas()"
        >
        </div>
      </div>
    </md-card>  
  `,
  data: function() {
    return {
      highlightBtns: false,
      highlightIsActive: false
    };
  },
  methods: {
    highlightBtnAreas() {
      if (this.highlightIsActive) {
        return;
      }
      this.highlightBtns = true;
      this.highlightIsActive = true;
      setTimeout(() => {
        this.highlightBtns = false;
      }, 200);
      setTimeout(() => {
        this.highlightBtns = true;
      }, 300);
      setTimeout(() => {
        this.highlightBtns = false;
        this.highlightIsActive = false;
      }, 700);
    }
  }
});
