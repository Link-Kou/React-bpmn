import * as React from 'react';
import {LoadPanel} from '@component/panel';
import {HookTrees} from './compone/hookTrees';
import {ITreeData} from '../../index.types';

interface IProps {

    treeData: Array<ITreeData>

    loading: boolean

    onAddRoot(): void

    onDrop(DropDataType: any): void

    onSelect(activeNode: any, value: any): void
}

/**
 *
 * @author lk
 * @date 2020/5/30 10:26
 * @version 1.0
 */
export default class Tree extends React.Component<IProps, any> {

    public render() {
        const {treeData, onAddRoot, onDrop, onSelect, loading} = this.props
        return (
            <LoadPanel loadering={loading} outrender={false} queueAnim={false}>
                <HookTrees onSelect={onSelect} onAddRoot={onAddRoot} onDrop={onDrop} treeData={treeData}/>
            </LoadPanel>
        )
    }
}
