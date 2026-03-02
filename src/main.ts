import App from './App.vue';
import { createApp } from 'vue';
import './styles/reset.css';
import store from '@/store';
import router from '@/router';
import ErrorStackParser from 'error-stack-parser';
import { findCodeBySourceMap } from './utils';

const app = createApp(App);
app.use(router);
app.use(store);
app.config.errorHandler = (err) => {
	const errorStack = ErrorStackParser.parse(err as Error); // 解析报错信息，获取源代码位置信息
	findCodeBySourceMap(errorStack[0]); // 还原源代码位置信息对应的代码内容
};
app.mount('#app');
