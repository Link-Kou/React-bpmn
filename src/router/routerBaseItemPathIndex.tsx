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
    path: string | undefined,
    screen: any
    routes?: Array<IRoute>
}

export const routes: Array<IRoute> = [
    {
        key: 'Main',
        exact: false,
        path: '/index/main',
        screen: Main
    },
    {
        key: 'Product',
        exact: false,
        path: '/index/product',
        screen: PoductList
    },
    {
        key: 'ProductAllSkuAdd',
        exact: false,
        path: RouterPaths.ProductAllSkuAdd,
        screen: ProductAllSkuAdd
    },
    {
        key: 'ReactSplitGrid',
        exact: false,
        path: '/index/reactSplitGrid',
        screen: ReactSplitGrid
    }, {
        key: 'SqlQuery',
        exact: false,
        path: '/index/sqlQuery',
        screen: SqlQuery
    }, {
        key: 'ImageManager',
        exact: true,
        path: '/index/imageManager',
        screen: Loadable({
            loader: () => RouterLoadableDelay(import('../application/imageManager')),
            ...RouterLoadableConfigBase
        })
    }, {
        key: 'LongPanel',
        exact: false,
        path: '/index/longPanel',
        screen: LongPanel
    }, {
        key: 'mosaic',
        exact: false,
        path: '/index/mosaic',
        screen: Mosaic
    }, {
        key: 'TreeDnd',
        exact: false,
        path: '/index/treeDnd',
        screen: TreeDnd
    }, {
        key: 'TypeConfig',
        exact: false,
        path: '/index/typeConfig',
        screen: TypeConfig
    }, {
        key: 'BannerConfig',
        exact: true,
        path: '/index/bannerConfig',
        screen: Loadable({
            loader: () => RouterLoadableDelay(import('../application/basicConfig/bannerConfig')),
            ...RouterLoadableConfigBase
        })
    },
    {
        key: 'BasePaper',
        exact: false,
        path: '/index/productBasePaper',
        screen: Loadable({
            loader: () => RouterLoadableDelay(import('../application/productBasePaper')),
            ...RouterLoadableConfigBase
        })
    },
    {
        key: 'BaseCorrugated',
        exact: false,
        path: '/index/productCorrugated',
        screen: ProductCorrugated
    },
    {
        key: 'CardboardList',
        exact: false,
        path: RouterPaths.CardboardList,
        screen: CardboardList
    },
    {
        key: 'CardboardAdd',
        exact: false,
        path: RouterPaths.CardboardAdd,
        screen: CardboardAdd
    },
    {
        key: 'CartonList',
        exact: false,
        path: RouterPaths.CartonList,
        screen: CartonList
    },
    {
        key: 'CartonAdd',
        exact: false,
        path: RouterPaths.CartonAdd,
        screen: CartonAdd
    },
    {
        key: 'ProductOnlineMarketing',
        exact: false,
        path: '/index/productOnlineMarketing',
        screen: OnlineMarketingList
    },
    {
        key: 'ProductQuote',
        exact: false,
        path: '/index/productQuote',
        screen: ProductQuote
    },
    {
        key: 'ProductQuote',
        exact: false,
        path: '/index/productQuote',
        screen: ProductQuote
    },
    {
        key: 'UserManager',
        exact: false,
        path: '/index/userManager',
        screen: UserManager
    },
    {
        key: 'OrderCardboard',
        exact: false,
        path: '/index/orderCardboard',
        screen: OrderCardboard
    },
    {
        key: 'CodeView',
        exact: false,
        path: '/index/codeView',
        screen: CodeView
    },
    {
        key: '404',
        exact: false,
        path: undefined,
        screen: Unknown
    }
];

class RootBaseItem extends React.Component {

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

export default RootBaseItem;
