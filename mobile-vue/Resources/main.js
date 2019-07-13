Vue.use(VueMaterial.default);

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
            <h3 class="md-title">TITLE</h3>
          </div>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button">
              <md-icon>fullscreen</md-icon>
            </md-button>
          </div>
        </div>
      </md-toolbar>
    </div>
  `
};

new Vue({
  render: h => h(App)
}).$mount(`#app`);
