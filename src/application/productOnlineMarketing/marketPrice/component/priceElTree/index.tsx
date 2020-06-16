import * as React from 'react';
import {Button, Dropdown, Panel, Tree} from 'rsuite';
import {HeadPanel, LoadPanel} from '@component/panel';
import El from './compone/el';
import Elnode1 from './compone/elnode1';
import Elnode2 from './compone/elnode2';
import Elnode3 from './compone/elnode3';
import Info from './compone/info';
import TreeUtils from '@utils/Tree';

export default class QuoteListTable extends React.Component {

    public state = {
        datas: [
            {
                value: '1',
                label: '1',
                control: (props: any) => <Elnode1 {...props}/>,
                children: [
                    {
                        value: '1-1',
                        label: '1-1',
                        control: (props: any) => <Elnode2 {...props}/>,
                        children: [
                            {
                                value: '1-1-1',
                                label: '1-1-2',
                                control: (props: any) => <Elnode3 {...props}/>
                            }
                        ]
                    }
                ]
            },
            {
                value: '2',
                label: '2',
                expression: '范围',
                control: (props: any) => <Elnode1 {...props}/>,
                children: [
                    {
                        value: '2-1',
                        label: '2-1',
                        control: (props: any) => <Elnode2 {...props}/>,
                        children: [
                            {
                                value: '2-1-1',
                                label: '2-1-2',
                                control: (props: any) => <Elnode3 {...props}/>
                            }
                        ]
                    }
                ]
            }
        ]
    }

    public render() {
        const {datas} = this.state
        return (
            <>
                <HeadPanel hideBorderBottom={true} title={'营销表达式'}>
                    <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                        <Dropdown title={'产品管理'} trigger="click">
                            <Dropdown.Item onSelect={() => {

                            }}>新增一口价方案</Dropdown.Item>
                            <Dropdown.Item onSelect={() => {

                            }}>新增阶梯价方案</Dropdown.Item>
                            <Dropdown.Item onSelect={() => {
                                alert(JSON.stringify(datas))
                            }}>分类排序</Dropdown.Item>
                        </Dropdown>
                    </div>
                </HeadPanel>
                <LoadPanel subHeight={132} loadering={false}>
                    <Info/>
                    <Panel header={<div style={{display: 'flex'}}>
                        <div style={{display: 'flex', flex: 1, justifyContent: 'flex-start'}}>条件</div>
                        <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                            <Button onClick={() => {
                                this.setState({
                                    datas: this.state.datas
                                })
                            }}>添加节点</Button>
                        </div>
                    </div>} bodyFill={false}>
                        <Tree
                            style={{maxHeight: 'none'}}
                            defaultExpandAll={true}
                            expandAll={true}
                            expandItemValues={
                                TreeUtils.getAllNodeId({
                                    treeData: datas,
                                    getNodeKey: (node) => node.value
                                })}
                            data={datas}
                            renderTreeNode={(nodeData: any) => {
                                return (
                                    <El treedata={datas}
                                        nodeData={nodeData}
                                        onChange={(value) => {
                                            const concat = value.concat();
                                            this.setState({
                                                datas: concat
                                            })
                                        }}/>
                                )
                            }}/>
                    </Panel>
                </LoadPanel>
            </>
        )
    }
}
