import Listener from '@listener';
import {RouterHistory} from './index';

export const RouterPaths = {
    /**
     * 主页
     */
    Main: '/index/main'
}

/**
 * 跳转并且关闭Tab
 * RouterTabPush(RouterPath.CardboardList);
 * {@link HeadTabs#_onClosed}
 * @param paths
 * @constructor
 */
export const RouterTabPush = (paths: string) => {
    Listener.EmitNavTabClosed(() => {
        RouterHistory.push(paths)
    });
}
