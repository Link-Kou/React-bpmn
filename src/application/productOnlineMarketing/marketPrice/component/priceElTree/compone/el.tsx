import * as React from 'react';

interface IProps {
    nodeData?: any

    treedata?: any

    onChange?(value: any): void
}

/**
 *
 * @author lk
 * @date 2020/6/14 10:58
 * @version 1.0
 */
export default class El extends React.Component<IProps> {


    public onChange(value: any) {
        const {onChange} = this.props
        onChange?.(value)
    }


    public render() {
        const {nodeData, treedata} = this.props
        const control = nodeData?.control?.({
            nodeData,
            treedata,
            onChange: this.onChange.bind(this)
        })
        return control ?? <div/>
    }

}
