import * as React from 'react';
import {Alert, Dropdown, InputGroup, InputNumber, Tree} from 'rsuite';
import FlexCalcBox from '@component/flexCalcBox';
import {HeadPanel} from '@component/panel';
import El from './compone/el';

export default class QuoteListTable extends React.Component {

    public state = {
        datas: [
            {
                value: '1',
                label: '1'
            },
            {
                value: '2',
                label: '2',
                expression: '范围',
                expressionType: '特点产品'
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
                <div style={{width: 255, paddingLeft: 38, marginBottom: 16}}>
                    <InputGroup>
                        <InputGroup.Addon>红包面额</InputGroup.Addon>
                        <InputNumber/>
                    </InputGroup>
                </div>
                <FlexCalcBox subHeight={178} Body={(e) => (
                    <Tree
                        style={{maxHeight: 'none'}}
                        defaultExpandAll={true}
                        //draggable={true}
                        renderTreeNode={(nodeData: any) => <El treedata={datas} nodeData={nodeData}
                                                               onChange={(value) => {
                                                                   this.setState({
                                                                       datas: value
                                                                   })
                                                               }}/>}
                        onDragStart={(DropDataType: any, event: any) => {
                            if (DropDataType?.refKey?.split('-')?.length === 3) {
                                event.preventDefault();
                                //event.stopPropagation();
                            }
                        }}
                        onDrop={(DropDataType: any, event: any) => {
                            if (DropDataType?.dragNode?.layer > 0) {
                                Alert.warning('节点不允许拖动')
                            } else {
                                const updateDataFunction = DropDataType.createUpdateDataFunction(datas);
                                this.setState({
                                    datas: updateDataFunction
                                })
                            }
                        }}
                        data={datas}/>
                )}/>
            </>
        )
    }
}
