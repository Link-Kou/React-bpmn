import * as React from 'react';
import {CheckTree, Icon, IconButton, Panel} from 'rsuite';
import {BackColorPanel, HeadPanel, LoadPanel} from '@component/panel';


interface IProps {
    onClose?(): void
}

/**
 *
 * @author lk
 * @date 2020/5/27 18:40
 * @version 1.0
 */
export default class RoleList extends React.Component<IProps> {

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

    public render() {
        const {onClose} = this.props
        const {treeData} = this.state
        return (
            <BackColorPanel>
                <HeadPanel hideBorderBottom={true} title={'权限管理'}>
                    <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                        <IconButton appearance={'subtle'}
                                    onClick={() => {
                                        this.setState({})
                                    }}
                                    icon={<Icon icon={'link'}/>}>关联权限</IconButton>
                        <IconButton appearance={'subtle'}
                                    onClick={onClose}
                                    icon={<Icon icon={'close-circle'}/>}>取消</IconButton>
                    </div>
                </HeadPanel>
                <LoadPanel loadering={false} outrender={false} queueAnim={true}>
                    <Panel>
                        <CheckTree
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
                </LoadPanel>
            </BackColorPanel>
        )
    }
}
