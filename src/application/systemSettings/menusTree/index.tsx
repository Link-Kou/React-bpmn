import * as React from 'react';
import {Col, Grid, Icon, IconButton, Panel, Row, Tree} from 'rsuite';
import {BackColorPanel, HeadPanel, LoadPanel} from '@component/panel';
import {Svg} from '@resource/svg';

/**
 *
 * @author lk
 * @date 2020/5/26 21:24
 * @version 1.0
 */
export default class MenusTree extends React.Component {

    public state = {
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

    public render() {
        //const {treeData} = this.state
        return (
            <>
                <Grid fluid={true}>
                    <Row>
                        <Col xs={6} sm={6} md={6}/>
                        <Col xs={12} sm={12} md={12}>
                            <BackColorPanel>
                                <HeadPanel hideBorderBottom={true} title={'系统权限菜单'}>
                                    <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                                        <IconButton appearance={'subtle'} icon={Svg.rename}>重命名</IconButton>
                                        <IconButton appearance={'subtle'}
                                                    icon={Svg.ztreePeerAdd}>添加同级</IconButton>
                                        <IconButton appearance={'subtle'}
                                                    icon={Svg.ztreeChildAdd}>添加下级</IconButton>
                                        <IconButton appearance={'subtle'} icon={<Icon icon={'save'}/>}>保存菜单</IconButton>
                                        <IconButton appearance={'subtle'}
                                                    icon={<Icon icon={'trash-o'}/>}>删除节点</IconButton>
                                    </div>
                                </HeadPanel>
                                <LoadPanel loadering={false} outrender={false} queueAnim={false}>
                                    {this.renderTree()}
                                </LoadPanel>
                            </BackColorPanel>
                        </Col>
                        <Col xs={6} sm={6} md={6}/>
                    </Row>
                </Grid>
            </>
        )
    }
}
