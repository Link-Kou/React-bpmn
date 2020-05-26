import Listener from '@listener';
import {RouterHistory} from './index';

export const RouterPaths = {
    /**
     * 主页
     */
    Main: '/index/main',
    /**
     * 纸箱列表
     */
    CartonList: '/index/cartonList',
    /**
     * 纸箱添加
     */
    CartonAdd: '/index/cartonAdd',
    /**
     * 纸板列表
     */
    CardboardList: '/index/cardboardList',
    /**
     * 纸板添加
     */
    CardboardAdd: '/index/cardboardAdd',
    /**
     * 所有产品列表
     */
    ProductAllSkuAdd: '/index/productAllSkuAdd'
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
