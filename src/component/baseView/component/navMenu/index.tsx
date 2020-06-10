import * as React from 'react';
import {Dropdown, Icon, Nav, Sidenav} from 'rsuite';
import {
    MenuConfig, IMenuConfig, MenuOpenKeysConfig, INavItem, IDropdown, IDropdownMenu, IDropdownItem
} from '../../../../config/MenuConfigComponent'
import './menu.scss'
import {RouterHistory} from '@router';
import Listener from '@listener';
//import {MenuConfig, IMenuConfig, MenuOpenKeysConfig} from '../../../../config/MenuConfig'

/**
 * 菜单收缩展开尺寸
 */
const marginLeft: string = '225px'

/**
 * 菜单栏目
 */
export default class Index extends React.Component {

    public _deviceEventEmitter: any

    public state = {
        collapsed: false,
        selectMenuKey: '',
        selectOpenKeys: MenuOpenKeysConfig,
        Menu: MenuConfig,
        collapsedOverflow: 'auto',
        componentUpdate: ''
    }

    public componentDidMount(): void {
        this._deviceEventEmitter = PubSub.subscribe(Listener.NavMenuSidenav, this._OnCollapsed.bind(this));
        this._listen()
    }

    public componentWillMount(): void {
        PubSub.unsubscribe(this._deviceEventEmitter);
    }

    /**
     * 监听路由
     * @private
     */
    private _listen = () => {
        const routerHistory = RouterHistory;
        this.setState({
            selectMenuKey: routerHistory?.location?.pathname
        })
        //路由跳转监听
        routerHistory.listen((listener) => {
            this.setState({
                selectMenuKey: listener.pathname
            })
        })
    }


    /**
     * 打开关闭
     * @private
     */
    public _OnCollapsed() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    /**
     * 拥有权限的菜单
     * @param key 表示
     * @param comp 组件
     */
    private menuAuth(key: string, comp: any): any {
        return comp
    }

    /**
     * 菜单递归
     * @param item
     */
    private menu(item: Array<any>): any {
        /**
         * Icons 渲染
         * @param ico
         */
        const icons = (ico: any) => {
            return typeof ico === 'string' ? <Icon icon={ico as any}/> : ico
        }

        /**
         * 渲染子项目
         * @param items
         */
        const renderItems = (items: Array<IDropdownMenu | IDropdownItem>) => {
            return items.map((k, i, a) => {
                switch (k.type) {
                    case 'DropdownMenu':
                        if (items.length > 0) {
                            //icon={<Icon icon={String(k.ico)}/>}
                            return this.menuAuth(
                                k.key,
                                <Dropdown.Menu icon={icons(k.ico)} eventKey={k.key} title={k.title()}>
                                    {renderItems(k.items)}
                                </Dropdown.Menu>
                            )
                        }
                        break;
                    case 'DropdownItem':
                        return this.menuAuth(
                            k.key,
                            <Dropdown.Item className={'app-dropdown-Item-text'} eventKey={k.route} icon={icons(k.ico)}
                                           onClick={() => {
                                               RouterHistory.push(k.route)
                                           }}>
                                <span>{k.content}</span>
                            </Dropdown.Item>
                        )
                    default:
                        return null;
                }
            })
        }

        return item.map((k: IMenuConfig, i: number, a: Array<any>) => {
            const {type, ico} = k.type as INavItem | IDropdown
            const {route, content} = k.type as INavItem
            const {items, title} = k.type as IDropdown
            switch (type) {
                case 'Dropdown':
                    if (items?.length > 0) {
                        return this.menuAuth(
                            k.key,
                            <Dropdown placement="rightStart" eventKey={k.key}
                                      icon={icons(ico)}
                                      title={title()}>
                                {renderItems(items)}
                            </Dropdown>
                        )
                    }
                    break;
                case 'DropdownMenu':
                    if (items.length > 0) {
                        return this.menuAuth(
                            k.key,
                            <Dropdown.Menu icon={icons(ico)} eventKey={k.key} title={title()}>
                                {renderItems(items)}
                            </Dropdown.Menu>
                        )
                    }
                    break;
                case 'NavItem':
                    return this.menuAuth(
                        k.key,
                        <Nav.Item className={'app-dropdown-Item-text'} eventKey={route} icon={icons(ico)}
                                  onClick={() => {
                                      RouterHistory.push(route)
                                  }}>
                            <span>{content}</span>
                        </Nav.Item>
                    )
                default:
                    return null
            }
        });

    }

    public render() {
        const {collapsedOverflow, selectOpenKeys, selectMenuKey, collapsed} = this.state
        return (
            <div className='app-sidebar'
                 style={
                     !collapsed ? {
                         overflow: 'auto',
                         width: marginLeft
                     } : {overflow: collapsedOverflow, width: 56}
                 }
            >
                <Sidenav className={'app-Sidenav'}
                         defaultOpenKeys={selectOpenKeys}
                         activeKey={selectMenuKey}
                         appearance="inverse"
                         expanded={!this.state.collapsed}
                >
                    <Sidenav.Body>
                        <Nav pullRight={true}>
                            {
                                this.menu(this.state.Menu)
                            }
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </div>
        )
    }
}
