/**
 * 理论支持ie9，实际只能支持到ie10及以上
 */
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Intl from './Intl';

/**
 * 基础css
 */
import './index.css';
import './resource/css/base.scss'

import 'rsuite/lib/styles/index.less'
import 'nprogress/nprogress.css'

//基础路由
import RouterBase from './router/routerBase';

import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <Intl>
        <RouterBase/>
    </Intl>,
    document.getElementById('root') as HTMLElement
);
serviceWorker.unregister();
