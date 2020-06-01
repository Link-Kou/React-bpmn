import * as React from 'react';
import {Icon, IconButton, Tree} from 'rsuite';
import {menu, menuGroup, Svg} from '@resource/svg';
import {ITreeData} from '../../../index.types';


interface IProps {
    treeData: Array<ITreeData>

    onAddRoot(): void

    onDrop(DropDataType: any): void

    onSelect(activeNode: any, value: any): void
}

/**
 *
 * @author lk
 * @date 2020/5/30 10:31
 * @version 1.0
 */
export const HookTrees = (props: IProps) => {
    const {treeData, onAddRoot, onDrop, onSelect} = props
    if (treeData.length > 0) {
        return (
            <div style={{width: '80%', height: '100%', padding: '0 15px'}}>
                <Tree
                    style={{maxHeight: 'none'}}
                    data={treeData}
                    draggable={true}
                    defaultExpandAll={true}
                    //expandItemValues={''}
                    onSelect={onSelect}
                    renderTreeNode={(nodeData) => {
                        return (
                            <div style={{
                                display: 'flex',
                                height: 25,
                                flexDirection: 'row',
                                alignItems: 'center',
                                color: '#767676',
                                fill: '#767676'
                            }}>
                                {nodeData.type === 1 ?
                                    <Icon style={{marginRight: 5}} icon={menuGroup}/> :
                                    <Icon style={{marginRight: 5}} icon={menu}/>}
                                <span>{nodeData.label}</span>
                                <span><sup>{nodeData.keyId}</sup></span>
                            </div>
                        )
                    }}
                    onDrop={onDrop}
                />
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
                <IconButton icon={Svg.ztree} onClick={onAddRoot}>添加节点</IconButton>
            </div>
        </div>
    )

}
