import * as React from 'react';
import {Dropdown, Icon, Nav, Sidenav} from 'rsuite';
import {MenuConfig, IMenuConfig, MenuOpenKeysConfig} from '../../../../config/MenuConfig'
import * as MenuLayoutConfig from '../../../../config/MenuLayoutConfig'
import './menu.scss'
import {RouterHistory} from '@router';
import Listener from '@listener';


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
        collapsedOverflow: 'auto'
    }

    public componentDidMount(): void {
        this._deviceEventEmitter = PubSub.subscribe(Listener.NavMenuSidenav, this._OnCollapsed.bind(this));
    }

    public componentWillMount(): void {
        PubSub.unsubscribe(this._deviceEventEmitter);
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

    private _collapsedoverflow = (open?: boolean) => {
        const {collapsed} = this.state
        if (collapsed) {
            this.setState({
                collapsedOverflow: open ? 'visible' : 'auto'
            })
        }
    }

    /**
     * 菜单递归
     * @param item
     */
    private menu(item: Array<any>): any {
        return item.map((k: IMenuConfig, i: number, a: Array<any>) => {

            switch (k.type) {
                case 'Dropdown':
                    if (k.items.length > 0) {
                        return this.menuAuth(
                            k.key,
                            <Dropdown placement="rightStart" onToggle={this._collapsedoverflow} eventKey={k.key}
                                      icon={<Icon icon={(k.ico as any)}/>}
                                      title={k.title()}>
                                {this.menu(k.items)}
                            </Dropdown>
                        )
                    }
                    break;
                case 'DropdownMenu':
                    if (k.items.length > 0) {
                        //icon={<Icon icon={String(k.ico)}/>}
                        return this.menuAuth(
                            k.key,
                            <Dropdown.Menu icon={<Icon icon={(k.ico as any)}/>} eventKey={k.key} title={k.title()}>
                                {this.menu(k.items)}
                            </Dropdown.Menu>
                        )
                    }
                    break;
                case 'DropdownItem':
                    return this.menuAuth(
                        k.key,
                        <Dropdown.Item eventKey={k.key} icon={<Icon icon={(k.ico as any)}/>} onClick={() => {
                            const {openTabs}: { openTabs?: any } = k
                            RouterHistory.push(openTabs.route)
                        }}>
                            {/*<Icon type={k.ico} />*/}
                            <span>{k.content}</span>
                        </Dropdown.Item>
                    )
                case 'NavItem':
                    return this.menuAuth(
                        k.key,
                        k.show ? <Nav.Item eventKey={k.key} icon={<Icon icon={(k.ico as any)}/>} onClick={() => {
                            const {openTabs}: { openTabs?: any } = k
                            RouterHistory.push(openTabs.route)
                        }}>
                            {/*<Icon type={k.ico} />*/}
                            <span>{k.content}</span>
                        </Nav.Item> : null
                    )
                default:
            }
            return null
        });
    }

    public render() {
        return (
            <div className='app-sidebar'
                 style={
                     !this.state.collapsed ? {
                         overflow: 'auto',
                         width: MenuLayoutConfig.marginLeft
                     } : {overflow: this.state.collapsedOverflow, width: 56}
                 }
            >
                <Sidenav className={'app-Sidenav'}
                         defaultOpenKeys={this.state.selectOpenKeys}
                         activeKey={this.state.selectMenuKey}
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
