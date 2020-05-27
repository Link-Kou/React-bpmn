import * as React from 'react';
import {Col, Grid, Icon, IconButton, Panel, Row, Tree} from 'rsuite';
import {BackColorPanel, HeadPanel, LoadPanel} from '@component/panel';
import {Svg} from '@resource/svg';
import MenusTreeAddEditModel from './component/addEditModel';
import Dialog from '@component/dialog';
import {IntlApi} from '@component/textIntl';

/**
 *
 * @author lk
 * @date 2020/5/26 21:24
 * @version 1.0
 */
export default class MenusTree extends React.Component {

    public state = {
        show: false,
        title: '',
        key: '',
        treeData: [
            {
                label: '中国',
                value: 1,
                fid: '1',
                children: [
                    {
                        label: '北京市',
                        value: 2,
                        fid: '2'
                    },
                    {
                        label: '福建省',
                        value: 3,
                        fid: '3',
                        children: [
                            {
                                label: '福州市',
                                fid: '36',
                                value: 36

                            }
                        ]
                    }
                ]
            }
        ]
    }

    private renderTree() {
        const {treeData} = this.state
        if (treeData.length > 0) {
            return (
                <Panel>
                    <Tree
                        data={treeData}
                        draggable={true}
                        defaultExpandAll={true}
                        onSelect={(activeNode, value, event) => {
                            console.log(activeNode)
                        }}
                        onDrop={(DropDataType: any) => {
                            this.setState({
                                treeData: DropDataType.createUpdateDataFunction(treeData)
                            })
                        }}
                    />
                </Panel>
            )
        }
        return (
            <div style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div>
                    <IconButton icon={Svg.ztree}>添加节点</IconButton>
                </div>
            </div>
        )

    }

    /**
     * 模态
     * @param key
     * @param title
     * @private
     */
    private _onOpenAddEditModel = (key?: string, title?: string) => {
        const {show} = this.state
        this.setState({
            show: !show,
            title
        })
    }

    /**
     * 保存
     * @param name
     * @param callbackCloseLoading
     * @param key
     * @private
     */
    private _onSave = (name: string, callbackCloseLoading: () => void, key?: string) => {

    }

    /**
     * 删除
     * @private
     */
    private _onDel = () => {
        Dialog.SelectLoad({
            title: '提示',
            boby: IntlApi.IsDelBody,
            callback: (e) => {
                if (e.success) {

                }
            }
        })
    }

    public render() {
        const {show, title, key} = this.state
        return (
            <>
                <MenusTreeAddEditModel key={key} show={show} title={title} onClose={this._onOpenAddEditModel}
                                       onSave={this._onSave}/>
                <Grid fluid={true}>
                    <Row>
                        <Col xs={5} sm={5} md={5}/>
                        <Col xs={14} sm={14} md={14}>
                            <BackColorPanel>
                                <HeadPanel hideBorderBottom={true} title={'系统权限菜单'}>
                                    <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                                        <IconButton appearance={'subtle'}
                                                    onClick={() => this._onOpenAddEditModel('rename', '节点重命名')}
                                                    icon={Svg.rename}>重命名</IconButton>
                                        <IconButton appearance={'subtle'}
                                                    onClick={() => this._onOpenAddEditModel('AddSib', '节点重命名')}
                                                    icon={Svg.ztreePeerAdd}>添加同级</IconButton>
                                        <IconButton appearance={'subtle'}
                                                    onClick={() => this._onOpenAddEditModel('AddSub', '节点重命名')}
                                                    icon={Svg.ztreeChildAdd}>添加下级</IconButton>
                                        <IconButton appearance={'subtle'}
                                                    icon={<Icon icon={'save'}/>}>保存菜单</IconButton>
                                        <IconButton appearance={'subtle'}
                                                    onClick={this._onDel}
                                                    icon={<Icon icon={'trash-o'}/>}>删除节点</IconButton>
                                    </div>
                                </HeadPanel>
                                <LoadPanel loadering={false} outrender={false} queueAnim={false}>
                                    {this.renderTree()}
                                </LoadPanel>
                            </BackColorPanel>
                        </Col>
                        <Col xs={5} sm={5} md={5}/>
                    </Row>
                </Grid>
            </>
        )
    }
}
