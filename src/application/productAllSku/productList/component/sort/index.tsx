import * as React from 'react';
import {Container, Content, Dropdown, Footer, Header, Icon, Input, InputGroup, Tree} from 'rsuite';
import ProductSort from '../../../productSort';

export default class ProductType extends React.Component {

    public _ProductSort: any;

    public state = {
        /**
         * 目录书数据
         */
        treeData: [
            {
                title: '系统菜单树',
                id: 'root',
                /**
                 * menu|group|button
                 */
                type: 'root',
                subtitle: '',
                /**
                 * 父节点
                 */
                parentid: '',
                /**
                 * 同级上节点
                 */
                peersupid: '',
                children: [{
                    title: '系统菜单树2',
                    id: 'root2',
                    /**
                     * menu|group|button
                     */
                    type: 'root',
                    subtitle: '',
                    /**
                     * 父节点
                     */
                    parentid: '',
                    /**
                     * 同级上节点
                     */
                    peersupid: ''
                }]
            }
        ],
        expandItemValues: []
    }


    public render() {
        return (
            <>
                <ProductSort ref={ref => {
                    this._ProductSort = ref
                }}/>
                <Container>
                    <Header>
                        <div style={{padding: '5px 0px'}}>
                            <Dropdown title="商品分类" trigger="hover">
                                <Dropdown.Item icon={<Icon icon="pencil-square"/>} onSelect={() => {
                                    this._ProductSort._onShow()
                                }}>编辑分类</Dropdown.Item>
                                <Dropdown.Item icon={<Icon icon="refresh"/>}>重新加载</Dropdown.Item>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content>
                        <InputGroup>
                            <Input placeholder={'搜索'}/>
                            <InputGroup.Addon><Icon icon="search"/></InputGroup.Addon>
                        </InputGroup>
                        <Tree style={{maxHeight: 850}} data={this.state.treeData} valueKey={'id'} labelKey={'title'}
                            //expandItemValues={this.state.expandItemValues}
                              defaultExpandAll={true}
                            //renderTreeNode={(nodeData: any) => this._node(nodeData)}
                        />
                    </Content>
                    <Footer/>
                </Container>
            </>

        )
    }
}
