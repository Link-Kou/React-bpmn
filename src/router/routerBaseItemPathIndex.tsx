import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import Loadable from 'react-loadable';
import Unknown from '../component/unknownView/404'
import Main from '../application/main'
import {RouterLoadableConfigBase, RouterLoadableDelay} from './routerLoadableDelay';
import QueueAnim from 'rc-queue-anim';
import {RouterPaths} from './routerPath';

export interface IRoute {
    key: string,
    exact: boolean
    title?: string
    closedHideTab?: boolean
    path: string | undefined,
    screen: any
    routes?: Array<IRoute>
}

export const routes: Array<IRoute> = [
    {
        key: 'Main',
        exact: false,
        title: '首页',
        path: RouterPaths.Main,
        screen: Main
    },
    {
        key: 'CodeView',
        title: 'flowable',
        exact: false,
        path: '/index/flowable',
        screen: Loadable({
            loader: () => RouterLoadableDelay(import('../application/flowable')),
            ...RouterLoadableConfigBase
        })
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

