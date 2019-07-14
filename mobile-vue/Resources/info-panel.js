Vue.component('info-panel', {
  props: ['currentIndex', 'maxIndex', 'currentPage'],
  template: `
    <md-card md-with-hover>
      <md-toolbar>
        <div class="md-toolbar-row">
          <md-button 
            class="md-icon-button md-raised md-primary" 
            v-on:click="$emit('prevPage')"
            v-bind:disabled="currentIndex <= 0"
          >
            <md-icon>chevron_left</md-icon>
            <md-tooltip md-direction="top">Previous Page</md-tooltip>
          </md-button>
          <pre>[{{ currentIndex+1 }}/{{ maxIndex+1 }}]</pre>
          <md-button 
            class="md-icon-button md-raised md-primary" 
            v-on:click="$emit('nextPage')"
            v-bind:disabled="currentIndex >= maxIndex"
          >
            <md-icon>chevron_right</md-icon>
            <md-tooltip md-direction="top">Next Page</md-tooltip>
          </md-button>
        </div>
      </md-toolbar>
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{ currentPage.title }}</div>
        </md-card-header-text>
      </md-card-header>
      <md-card-content v-html="currentPage.note">
      </md-card-content>
    </md-card>  
  `
});
