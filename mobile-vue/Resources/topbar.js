Vue.component('topbar', {
  props: ['isMobile', 'isTablet', 'isDesktop'],
  template: `
    <md-toolbar class="md-primary">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start has-ellipsis">
          <md-menu>
            <md-button md-menu-trigger class="md-icon-button">
              <md-icon>view_carousel</md-icon>
            </md-button>
            <md-menu-content>
              <md-menu-item @click="switchMobile()" :disabled="isMobile">
                <md-icon>phone_iphone</md-icon>
                <md-icon v-if="isMobile">done</md-icon>
                <span>Mobile View</span>
              </md-menu-item>
              <md-menu-item @click="switchTablet()" :disabled="isTablet">
                <md-icon>tablet</md-icon>
                <span>Tablet View</span>
                <md-icon v-if="isTablet">done</md-icon>
              </md-menu-item>
              <md-menu-item @click="switchDesktop()" :disabled="isDesktop">
                <md-icon>desktop_mac</md-icon>
                <span>Desktop View</span>
                <md-icon v-if="isDesktop">done</md-icon>
              </md-menu-item>
            </md-menu-content>
          </md-menu>
          <span class="md-title">{{title}}</span>
        </div>
      </div>
      <div class="md-toolbar-row app-toolbar">
      </div>
    </md-toolbar>
  `,
  methods: {
    switchMobile() {
      this.$emit('mobile');
    },
    switchTablet() {
      this.$emit('tablet');
    },
    switchDesktop() {
      this.$emit('desktop');
    }
  }
});
