import * as React from 'react';
import {Col, Grid, Icon, IconButton, Panel, Row, Tree} from 'rsuite';
import {BackColorPanel, HeadPanel, LoadPanel} from '@component/panel';
import {Svg} from '@resource/svg';
import MenusTreeAddEditModel from './component/addEditModel';
import Dialog from '@component/dialog';
import {IntlApi} from '@component/textIntl';
import WhisperTitle from '@common/whisper';
import {utilsTree} from '@utils/index';
import nanoid from 'nanoid';


interface IState {
    show: boolean
    title: string
    id: string
    treeData: Array<{
        label: string
        value: string
        /**
         * 父节点
         */
        parentId: any
        /**
         * 同级上级节点
         */
        preId: any
        children?: Array<any>
    }>
    activeNode: {
        value: string
        parentId?: any
        preId?: any
    }
}

/**
 *
 * @author lk
 * @date 2020/5/26 21:24
 * @version 1.0
 */
export default class MenusTree extends React.Component<any, IState> {

    public state: IState = {
        show: false,
        title: '',
        id: '',
        treeData: [],
        activeNode: {
            value: ''
        }
    }


    /**
     * 保存
     * @param name
     * @param callbackCloseLoading
     * @param key
     * @private
     */
    private _onSave = (name: string, callbackCloseLoading: () => void, key?: string) => {
        const {treeData, show, activeNode} = this.state
        const func = {
            Root: () => {
                treeData.push(
                    {
                        label: name,
                        value: nanoid(),
                        parentId: '',
                        preId: ''
                    }
                )
                this.setState({
                    treeData,
                    show: !show
                }, () => callbackCloseLoading?.())
            },
            //同级添加
            AddSib: () => {
                const insertChildNode: any = utilsTree.insertPeerNode(
                    {
                        treeData,
                        peerKey: activeNode.value,
                        insertNode: (node: any) => ({
                            label: name,
                            value: nanoid(),
                            parentId: node.parentId,
                            preId: node.value
                        }),
                        getNodeKey: (node: any) => node.value
                    }
                );
                this.setState(
                    {
                        treeData: insertChildNode,
                        show: !show
                    },
                    () => callbackCloseLoading?.()
                )
            },
            //子级添加
            AddSub: () => {
                const insertChildNode: any = utilsTree.insertChildNode(
                    {
                        treeData,
                        parentKey: activeNode.value,
                        insertNode: (node: any) => ({
                            label: name,
                            value: nanoid(),
                            parentId: activeNode.value,
                            preId: node?.value
                        }),
                        getNodeKey: (node: any) => node.value
                    }
                );
                this.setState(
                    {
                        treeData: insertChildNode,
                        show: !show
                    },
                    () => callbackCloseLoading?.()
                )
            }
        }
        switch (key) {
            case 'Root':
                func.Root()
                break;
            case 'AddSib':
                func.AddSib()
                break;
            case 'AddSub':
                func.AddSub()
                break;
            default:

                break;
        }
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

    /**
     * 添加
     * @private
     */
    private _onAddRoot = () => {
        const {show} = this.state
        this.setState({
            id: 'Root',
            show: !show,
            title: '添加节点'
        })
    }

    /**
     * 添加
     * @private
     */
    private _onAddNode = (key: string, title: string) => {
        const {show} = this.state
        this.setState({
            id: key,
            show: !show,
            title: title
        })
    }

    /**
     * 模态
     * @param key
     * @param title
     * @private
     */
    private _onHide = () => {
        const {show} = this.state
        this.setState({
            show: !show
        })
    }

    private renderTree() {
        const {treeData} = this.state
        if (treeData.length > 0) {
            return (
                <div style={{width: '80%'}}>
                    <Panel>
                        <Tree
                            data={treeData}
                            draggable={true}
                            defaultExpandAll={true}
                            //expandItemValues={''}
                            onSelect={(activeNode, value, event) => {
                                this.setState({
                                    activeNode
                                })
                            }}
                            onDrop={(DropDataType: any) => {
                                this.setState({
                                    treeData: DropDataType.createUpdateDataFunction(treeData)
                                })
                            }}
                        />
                    </Panel>
                </div>
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
                    <IconButton icon={Svg.ztree} onClick={this._onAddRoot}>添加节点</IconButton>
                </div>
            </div>
        )

    }

    public render() {
        const {show, title, id} = this.state
        return (
            <>
                <MenusTreeAddEditModel id={id}
                                       show={show}
                                       title={title}
                                       onClose={this._onHide}
                                       onSave={this._onSave}/>
                <Grid fluid={true}>
                    <Row>
                        <Col xs={8} sm={8} md={8}/>
                        <Col xs={8} sm={8} md={8}>
                            <BackColorPanel>
                                <HeadPanel hideBorderBottom={true} title={'系统权限菜单'}>
                                    <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                                        <WhisperTitle title={'节点编辑'}>
                                            <IconButton appearance={'subtle'}
                                                        onClick={() => this._onAddNode('EditNode', '节点编辑')}
                                                        icon={Svg.rename}/>
                                        </WhisperTitle>
                                        <WhisperTitle title={'添加同级'}>
                                            <IconButton appearance={'subtle'}
                                                        onClick={() => this._onAddNode('AddSib', '添加同级')}
                                                        icon={Svg.ztreePeerAdd}/>
                                        </WhisperTitle>
                                        <WhisperTitle title={'添加下级'}>
                                            <IconButton appearance={'subtle'}
                                                        onClick={() => this._onAddNode('AddSub', '添加下级')}
                                                        icon={Svg.ztreeChildAdd}/>
                                        </WhisperTitle>
                                        <WhisperTitle title={'节点保存'}>
                                            <IconButton appearance={'subtle'}
                                                        icon={<Icon icon={'save'}/>}/>
                                        </WhisperTitle>
                                        <WhisperTitle title={'节点删除'}>
                                            <IconButton appearance={'subtle'}
                                                        onClick={this._onDel}
                                                        icon={<Icon icon={'trash-o'}/>}/>
                                        </WhisperTitle>
                                    </div>
                                </HeadPanel>
                                <LoadPanel loadering={false} outrender={false} queueAnim={false}>
                                    {this.renderTree()}
                                </LoadPanel>
                            </BackColorPanel>
                        </Col>
                        <Col xs={8} sm={8} md={8}/>
                    </Row>
                </Grid>
            </>
        )
    }
}
