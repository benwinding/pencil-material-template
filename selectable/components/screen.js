Vue.component('mobile', {
  props: ['currentPage'],
  template: `
    <div class="screen-border screen-mobile">
      <div class="mobile-top-slot"></div>
      <div class="mobile-bottom-btn"></div>
      <slot />
    </div>
  `
});

Vue.component('desktop', {
  props: ['currentPage'],
  template: `
    <div class="screen-border screen-desktop">
      <span class="screen-url">https://www.browser.com/</span>
      <md-icon class="screen-x">clear</md-icon>
      <slot />
    </div>
  `
});

Vue.component('screen-img', {
  props: ['currentPage'],
  template: `
    <div>
      <div class="img-container">
        <img
          class="screen-img"
          :src="currentPage.src"
        />
      </div>
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
    </div>
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

Vue.component('screen', {
  props: ['currentPage', 'isMobile', 'isDesktop'],
  template: `
    <div>
      <mobile v-if="isMobile" >
        <screen-img :currentPage="currentPage" />
      </mobile>
      <desktop v-if="isDesktop" >
        <screen-img :currentPage="currentPage" />
      </desktop>
    </div>  
  `
});
