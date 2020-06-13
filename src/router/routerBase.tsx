import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createHashHistory, History as IHistory} from 'history';
import {routerMiddleware, ConnectedRouter, connectRouter} from 'connected-react-router';

import Unknown from '../component/unknownView/404';
import BaseView from '../component/baseView';
//import LoadableScreen from './routerLoadable';

//创建路由方式
export const RouterHistorys: IHistory = createHashHistory({
    //离开页面提示
    getUserConfirmation: function (message: string, callback: (result: boolean) => void) {
        //需要配合Prompt使用
        if (window.confirm(message)) {
            callback(true);
        } else {
            callback(false);
        }

    }
})

//redux结合,项目中不使用,单纯予以结合
const store = createStore(
    combineReducers({
        router: connectRouter(RouterHistorys)
    }),
    applyMiddleware(thunk, routerMiddleware(RouterHistorys))
);

interface IRoute {
    key: string,
    exact: boolean,
    path: string | undefined,
    screen: any
    routes?: Array<IRoute>

}

const routes: Array<IRoute> = [
    {
        key: 'base',
        exact: true,
        /**
         * 子路由
         * {@link /src/router/RootBaseItem}
         */
        path: '/index/:type',
        screen: BaseView
    },
    {
        key: '404',
        exact: true,
        path: undefined,
        screen: Unknown
    }
];

/**
 * 基础路由控制
 */
export default class RootBase extends React.Component {


    /**
     * 认证登录
     * @param Component
     * @param rest
     * @constructor
     */
    public PrivateRoute({...rest}) {
        return (
            <Route {...rest} />
        )
    }

    /**
     * 公开路径
     * @param rest
     * @constructor
     */
    public PublicRoute({...rest}) {
        return (
            <Route {...rest}/>
        )
    }


    public render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={RouterHistorys}>
                    <div style={{height: '100%'}}>
                        <Switch>
                            {
                                routes.map((route: IRoute, i) => {
                                    return (
                                        route.key === 'base' ?
                                            <this.PrivateRoute
                                                exact={route.exact}
                                                key={route.key}
                                                path={route.path}
                                                component={route.screen}
                                            /> :
                                            <this.PublicRoute
                                                exact={route.exact}
                                                key={route.key}
                                                path={route.path}
                                                component={route.screen}
                                            />
                                    )
                                })
                            }
                        </Switch>
                    </div>
                </ConnectedRouter>
            </Provider>
        )
    }
}
