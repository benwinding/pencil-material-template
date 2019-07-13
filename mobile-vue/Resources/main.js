Vue.use(VueMaterial.default);

Vue.component('screen', {
  template: `
  <md-card class="screen-card">
    <span class="screen-url">
    https://www.example.com/
    </span>
    <md-icon class="screen-x">clear</md-icon>
    <img class="screen-img" src="https://benwinding.github.io/mock-fmlink-menu/pages/background.png" />
  </md-card>  
  `
});

Vue.component('infopanel', {
  template: `
<md-card md-with-hover>
   <md-card-header>
      <md-card-header-text>
         <div class="md-title">Media card</div>
      </md-card-header-text>
   </md-card-header>
   <md-card-content>
    The <span style="font-weight: bold;">Users&nbsp;</span>page&nbsp;
    <div>
        <ul>
          <li>Contractors</li>
          <li>Staff</li>
          <li>Add/Remove</li>
          <li>Correspondence Log (maybe)</li>
        </ul>
    </div>
   </md-card-content>
   <md-card-actions>
      <md-button class="md-icon-button md-raised md-primary">
        <md-icon>chevron_left</md-icon>
        <md-tooltip md-direction="top">Previous Page</md-tooltip>
      </md-button>
      <pre>[1/2]</pre>
      <md-button class="md-icon-button md-raised md-primary">
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
            <h3 class="md-title">TITLE</h3>
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
            <screen />
          </div>
        </div>
        <div class="md-layout-item md-xlarge-size-30 md-large-size-40 md-xsmall-size-100">
          <div class="info-container">
            <infopanel />
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .box {
      height: 100px;
    }
  `
  ]
};

new Vue({
  render: h => h(App)
}).$mount(`#app`);
