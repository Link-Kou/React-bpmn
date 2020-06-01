import * as React from 'react';
import {CheckTree} from 'rsuite';

interface IProps {

    style?: React.CSSProperties

    treeStyle?: React.CSSProperties

    treeData?: Array<any>

    selectTreeData?: Array<any>
}

/**
 *
 * @author lk
 * @date 2020/5/27 23:50
 * @version 1.0
 */
export default class HookFormEdit extends React.Component<IProps> {

    public render() {
        const {style, treeData, selectTreeData, treeStyle} = this.props
        return (
            <div style={{marginTop: 20, ...style}}>
                <span>权限</span>
                <CheckTree
                    style={{maxHeight: 'none', ...treeStyle}}
                    defaultExpandAll={true}
                    value={selectTreeData}
                    data={treeData as any}/>
            </div>
        )
    }
}
