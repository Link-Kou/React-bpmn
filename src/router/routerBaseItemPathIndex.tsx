import * as React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import Loadable from 'react-loadable';
import Unknown from '../component/unknownView/404'
import Main from '../application/main'
import ReactSplitGrid from '../application/reactSplitGrid'
import SqlQuery from '../application/sqlQuery'
import LongPanel from '../application/longPanel'
import Mosaic from '../application/mosaic'
import TreeDnd from '../application/treeDnd'
import TypeConfig from '../application/basicConfig/typeConfig'
import {ProductAllSkuAdd, PoductList} from '../application/productAllSku'
import {CardboardList, CardboardAdd} from '../application/productCardboard'
import {CartonList, CartonAdd} from '../application/productCarton'
import {OnlineMarketingList} from '../application/productOnlineMarketing'
import ProductCorrugated from '../application/productCorrugated'
import ProductQuote from '../application/productQuote'
import UserManager from '../application/userManager'
import OrderCardboard from '../application/orderCardboard'
import CodeView from '../application/codeView'
import {RouterLoadableDelay, RouterLoadableConfigBase} from './routerLoadableDelay';
import QueueAnim from 'rc-queue-anim';
import {RouterPaths} from './routerPath';

export interface IRoute {
    key: string,
    exact: boolean
    title?: string
    path: string | undefined,
    screen: any
    routes?: Array<IRoute>
}

export const routes: Array<IRoute> = [
    {
        key: 'Main',
        exact: false,
        title: '首页',
        path: '/index/main',
        screen: Main
    },
    {
        key: 'Product',
        exact: false,
        title: '辅料管理',
        path: '/index/product',
        screen: PoductList
    },
    {
        key: 'ProductAllSkuAdd',
        title: '辅料添加',
        exact: false,
        path: RouterPaths.ProductAllSkuAdd,
        screen: ProductAllSkuAdd
    },
    {
        key: 'ReactSplitGrid',
        title: '测试-分屏',
        exact: false,
        path: '/index/reactSplitGrid',
        screen: ReactSplitGrid
    }, {
        key: 'SqlQuery',
        title: '测试-SQL',
        exact: false,
        path: '/index/sqlQuery',
        screen: SqlQuery
    }, {
        key: 'ImageManager',
        title: '测试-图像管理',
        exact: true,
        path: '/index/imageManager',
        screen: Loadable({
            loader: () => RouterLoadableDelay(import('../application/imageManager')),
            ...RouterLoadableConfigBase
        })
    }, {
        key: 'LongPanel',
        title: '测试-长面板',
        exact: false,
        path: '/index/longPanel',
        screen: LongPanel
    }, {
        key: 'mosaic',
        title: '测试-mosaic',
        exact: false,
        path: '/index/mosaic',
        screen: Mosaic
    }, {
        key: 'TreeDnd',
        title: '测试-TreeDnd',
        exact: false,
        path: '/index/treeDnd',
        screen: TreeDnd
    }, {
        key: 'TypeConfig',
        title: '类型配置',
        exact: false,
        path: '/index/typeConfig',
        screen: TypeConfig
    }, {
        key: 'BannerConfig',
        title: '轮播图管理',
        exact: true,
        path: '/index/bannerConfig',
        screen: Loadable({
            loader: () => RouterLoadableDelay(import('../application/basicConfig/bannerConfig')),
            ...RouterLoadableConfigBase
        })
    },
    {
        key: 'BasePaper',
        title: '原纸管理',
        exact: false,
        path: '/index/productBasePaper',
        screen: Loadable({
            loader: () => RouterLoadableDelay(import('../application/productBasePaper')),
            ...RouterLoadableConfigBase
        })
    },
    {
        key: 'BaseCorrugated',
        title: '瓦楞管理',
        exact: false,
        path: '/index/productCorrugated',
        screen: ProductCorrugated
    },
    {
        key: 'CardboardList',
        title: '纸板列表',
        exact: false,
        path: RouterPaths.CardboardList,
        screen: CardboardList
    },
    {
        key: 'CardboardAdd',
        title: '纸板添加',
        exact: false,
        path: RouterPaths.CardboardAdd,
        screen: CardboardAdd
    },
    {
        key: 'CartonList',
        title: '纸箱列表',
        exact: false,
        path: RouterPaths.CartonList,
        screen: CartonList
    },
    {
        key: 'CartonAdd',
        title: '纸箱添加',
        exact: false,
        path: RouterPaths.CartonAdd,
        screen: CartonAdd
    },
    {
        key: 'ProductOnlineMarketing',
        title: '产品营销',
        exact: false,
        path: '/index/productOnlineMarketing',
        screen: OnlineMarketingList
    },
    {
        key: 'ProductQuote',
        title: '报价单',
        exact: false,
        path: '/index/productQuote',
        screen: ProductQuote
    },
    {
        key: 'UserManager',
        title: '会员管理',
        exact: false,
        path: '/index/userManager',
        screen: UserManager
    },
    {
        key: 'OrderCardboard',
        title: '订单管理',
        exact: false,
        path: '/index/orderCardboard',
        screen: OrderCardboard
    },
    {
        key: 'CodeView',
        title: '代码视图',
        exact: false,
        path: '/index/codeView',
        screen: CodeView
    },
    {
        key: '404',
        title: '404',
        exact: false,
        path: undefined,
        screen: Unknown
    }
];

export default class RootBaseItem extends React.Component {

    getChildren = (props: any) => {
        const {location}: { location: { pathname: string, [x: string]: any } } = {...props};
        const iRoutes = routes.find(x => x.path === location.pathname);
        if (iRoutes) {
            return (
                <QueueAnim
                    style={{height: '100%'}}
                    type={['left', 'right']}
                    ease={['easeInOutQuad', 'easeInBack']}>
                    <Route
                        exact={iRoutes?.exact}
                        key={iRoutes?.key}
                        path={iRoutes?.path}
                        component={iRoutes?.screen}
                    />
                </QueueAnim>
            )
        }
        return <Redirect to={'/'}/>
    }


    public render() {
        return (
            <Switch>
                <Route
                    render={this.getChildren}
                />
            </Switch>
        )
    }
}

