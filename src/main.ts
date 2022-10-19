import App from '@/App.vue';
import router from '@/router';
import '@/scss/global-styles.scss';
import { createApp } from 'vue';

const app = createApp(App);

app.use(router).mount('#app');
