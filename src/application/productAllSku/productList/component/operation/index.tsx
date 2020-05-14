import * as React from 'react';
import {Dropdown, Icon} from 'rsuite';
import {ProductListSearchDrawer} from '../search';
import {RouterHistory} from '../../../../../router/routerBase';
import {RouterPath} from '../../../../../router/routerPath';
import { HeadPanel } from '@component/panel';


interface IProps {

}

export default class RedenvelopeTableList extends React.Component<IProps> {

    public state = {
        eventKey: ''
    }

    private _onSelect = (eventKey: string) => {
        switch (eventKey) {
            case 'new':
                RouterHistory.push(RouterPath.ProductAllSkuAdd)
                break
            default:
                this.setState({
                    eventKey
                })
        }
    }


    public render() {
        const {eventKey} = this.state
        return (
            <HeadPanel hideBorderBottom={true} title={'辅料产品列表'}>
                <Dropdown title={<div>排序：<b>时间升序</b></div>} noCaret={true}>
                    <Dropdown.Item icon={<Icon icon="angle-up"/>}>时间升序</Dropdown.Item>
                </Dropdown>
                <Dropdown title={'产品管理'} trigger="click" onSelect={this._onSelect}>
                    <Dropdown.Item eventKey={'new'}>新增产品</Dropdown.Item>
                    <Dropdown.Item eventKey={'search'}>产品搜索</Dropdown.Item>
                </Dropdown>
                <ProductListSearchDrawer show={eventKey === 'search'}/>
            </HeadPanel>
        )
    }

}
