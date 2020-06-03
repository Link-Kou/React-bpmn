import * as React from 'react';
import {Col, Grid, Icon, IconButton, Row, Alert} from 'rsuite';
import {BackColorPanel, HeadPanel} from '@component/panel';
import {Svg} from '@resource/svg';
import MenusTreeAddEditModel from './component/addEditModel';
import Dialog from '@component/dialog';
import {IntlApi} from '@component/textIntl';
import WhisperTitle from '@common/whisper';
import {utilsTree} from '@utils/index';
import nanoid from 'nanoid';
import MenusTree, {IState} from './menusTree';
import Tree from './component/tree';

/**
 *
 * @author lk
 * @date 2020/5/26 21:24
 * @version 1.0
 */
export default class Index extends MenusTree {

    public state: IState = {
        show: false,
        title: '',
        id: '',
        loading: true,
        treeData: [],
        activeNode: {}
    }

    componentDidMount() {
        this._onLoad()
    }

    /**
     * 加载构建树
     * @private
     */
    private _onLoad = async () => {
        this.handlersMenusTreesNodeList((node) => {
            const treeData = node.map((k, i, a) => {
                return ({
                    label: k.title,
                    value: k.id,
                    type: k.type,
                    keyId: k.keyId,
                    parentId: k.parentId,
                    preId: k.preId
                })
            });
            const iNodes = utilsTree.buildListToTreeSort({
                treeData,
                getNodeKey: (inode) => inode.value,
                getParentKey: (inode) => inode.parentId,
                getPrevId: 'preId'
            });
            const iNodes1 = iNodes.filter((k, i, a) => k.parentId === '');
            this.setState({
                treeData: iNodes1 as any,
                loading: false
            })
        });
    }

    /**
     * 保存
     * @param formValue
     * @param callbackCloseLoading
     * @param key
     * @private
     */
    private _onSave = (formValue: { name: string, type: string, keyid: string }, callbackCloseLoading: () => void, key?: string) => {
        const {treeData, show, activeNode} = this.state
        const {name, type, keyid} = formValue
        const func = {
            Root: () => {
                const newadd = {
                    label: name,
                    value: nanoid(),
                    type,
                    keyId: keyid,
                    parentId: '',
                    preId: ''
                }
                treeData.push(newadd)
                this.handlersMenusTreesNodeAdd(newadd, () => {
                    this.setState({
                        treeData,
                        show: !show
                    }, () => callbackCloseLoading?.())
                })
            },
            //同级添加
            AddSib: () => {
                let newadd;
                if (!activeNode.value) {
                    return
                }
                const insertChildNode: any = utilsTree.insertPeerNode({
                    treeData,
                    peerKey: activeNode.value,
                    insertNode: (node: any) => {
                        newadd = {
                            label: name,
                            value: nanoid(),
                            type,
                            keyId: keyid,
                            parentId: node.parentId ?? '',
                            preId: node.value
                        }
                        return newadd;
                    },
                    getNodeKey: (node: any) => node.value
                });
                if (newadd) {
                    this.handlersMenusTreesNodeAdd(newadd, () => {
                        this.setState(
                            {
                                treeData: insertChildNode
                            }, () => callbackCloseLoading?.())
                    })
                }
            },
            //子级添加
            AddSub: () => {
                let newadd;
                if (!activeNode.value) {
                    return
                }
                const insertChildNode: any = utilsTree.insertChildNode(
                    {
                        treeData,
                        parentKey: activeNode.value,
                        insertNode: (node: any) => {
                            newadd = {
                                label: name,
                                value: nanoid(),
                                type,
                                keyId: keyid,
                                parentId: activeNode.value,
                                preId: ''
                            }
                            return newadd
                        },
                        getNodeKey: (node: any) => node.value
                    }
                );
                if (newadd) {
                    this.handlersMenusTreesNodeAdd(newadd, () => {
                        this.setState(
                            {
                                treeData: insertChildNode
                            }, () => callbackCloseLoading?.())
                    })
                }
            },
            //编辑节点
            EditNode: () => {
                if (!activeNode.value) {
                    return
                }
                this.handlersEditMenusTreesNode({
                    label: name,
                    value: activeNode.value,
                    type,
                    keyId: keyid
                }, () => {
                    const updataNode = utilsTree.updataNode({
                        treeData,
                        updataNode: activeNode.value ?? '',
                        newNode: {
                            label: name,
                            value: activeNode.value,
                            type,
                            keyId: keyid
                        },
                        getNodeKey: (node: any) => node.value
                    });
                    this.setState({
                        treeData: updataNode
                    }, () => {
                        //this._onLoad();
                        callbackCloseLoading?.()
                        Alert.success('修改成功')
                    })
                })
            }
        }
        func[key ?? '']?.();
    }

    /**
     * 删除
     * @private
     */
    private _onDel = () => {
        const {activeNode, treeData} = this.state
        if (activeNode.value) {
            //utilsTree.getChildNodeCount(activeNode);
            const findNode: Array<any> = utilsTree.findNode({
                id: [activeNode.value],
                idField: 'value',
                node: treeData
            });
            if (findNode.length === 1) {
                const childNodeCount = utilsTree.getChildNodeCount(findNode[0]);
                if (childNodeCount > 0) {
                    Alert.warning('节点含有子节点，不能被删除')
                } else {
                    Dialog.SelectLoad({
                        title: '提示',
                        boby: IntlApi.IsDelBody,
                        callback: (e) => {
                            if (e.success) {
                                this.handlersDeleteMenusTreesNode(activeNode.value, (req) => {
                                    if (req.success) {
                                        e.close(() => {
                                            Alert.success(req.msg)
                                            this._onLoad()
                                        });
                                    } else {
                                        e.close(() => {
                                            Alert.error(req.msg)
                                        });
                                    }
                                })
                            }
                        }
                    })
                }
            } else {
                Alert.error('菜单树结构异常,请联系开发人员')
            }
        } else {
            Alert.warning('请选择节点进行删除')
        }
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

    /**
     * 调整顺序
     * dropNodePosition:0 子级
     * dropNodePosition:1 插入到指定节点前面
     * dropNodePosition:2 插入到指定节点后面
     * @private
     */
    private _onDrop = (DropDataType: any) => {
        //const {treeData} = this.state
        this.handlersMenusDoropTreesNode(DropDataType, () => {
            this._onLoad();
            /*this.setState({
                treeData: DropDataType.createUpdateDataFunction(treeData)
            }, () => {
                this._onLoad()
            })*/
        })
    }

    /**
     * 刷新
     * @private
     */
    private _onRefresh = () => {
        this.setState({
            loading: true
        }, () => {
            this._onLoad()
        })
    }

    /**
     * 选择
     * @param activeNode
     * @param value
     * @private
     */
    private _onSelect = (activeNode: any, value: any) => {
        this.setState({
            activeNode
        })
    }

    /**
     *
     * @private
     */
    private _onLoadEdit = (callback: (data: { name: string, type: string, keyid: string, }) => void, key?: string) => {
        const {activeNode} = this.state
        const func = {
            EditNode: () => {
                this.handlersMenusTreesNode(activeNode?.value, (node) => {
                    callback({
                        name: node.title,
                        type: node.type,
                        keyid: node.keyId
                    })
                })
            }
        }
        const f = func[key ?? '']
        if (f) {
            f?.()
        } else {
            callback({
                name: '',
                type: '',
                keyid: ''
            })
        }
    }


    public render() {
        const {show, title, id, loading, treeData} = this.state
        return (
            <>
                <MenusTreeAddEditModel id={id}
                                       show={show}
                                       title={title}
                                       onLoad={this._onLoadEdit}
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
                                        <WhisperTitle title={'删除'}>
                                            <IconButton appearance={'subtle'}
                                                        onClick={this._onDel}
                                                        icon={<Icon icon={'trash-o'}/>}/>
                                        </WhisperTitle>
                                        <WhisperTitle title={'重新加载'}>
                                            <IconButton appearance={'subtle'}
                                                        onClick={this._onRefresh}
                                                        icon={<Icon icon={'refresh'}/>}/>
                                        </WhisperTitle>
                                    </div>
                                </HeadPanel>
                                <Tree treeData={treeData} loading={loading} onDrop={this._onDrop}
                                      onAddRoot={this._onAddRoot} onSelect={this._onSelect}/>
                            </BackColorPanel>
                        </Col>
                        <Col xs={8} sm={8} md={8}/>
                    </Row>
                </Grid>
            </>
        )
    }
}
