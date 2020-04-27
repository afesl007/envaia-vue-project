import DropDown from "./components/Dropdown.vue";
import PureVueChart from 'pure-vue-chart';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import VueGoogleAutocomplete from 'vue-google-autocomplete';

import Vue from "vue";


/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component("drop-down", DropDown);

    Vue.component("pure-vue-chart",PureVueChart);

    Vue.use(BootstrapVue);
    Vue.use(IconsPlugin);

    Vue.component("vue-google-autocomplete",VueGoogleAutocomplete);


  }
};

export default GlobalComponents;
