import * as React from 'react';
import './expression.scss'

import SqlTool from '../sqlTool';
import {SqlQueryData} from '../sqlPanel';
import {utilsGuid} from '@utils/index';

interface IProps {
    /**
     * 唯一编号
     */
    id: string
    /**
     * 顺序
     */
    index: string | number
    /**
     * 当前节点数据
     */
    node: any
    /**
     * 控件
     * @param node
     */
    expression: (props: { data: any, node: any, id: any, onExtend: (id: string, extendNode: any) => void }) => JSX.Element
}

export default class SqlExpression extends React.Component<IProps> {

    public state = {}


    public render() {
        const {id, index, node, expression} = this.props
        return (
            <SqlQueryData.Consumer>
                {
                    (context: any) => (
                        <div key={utilsGuid.randomGUID()} className='app-sql-expression' data-index={index}>
                            {expression && expression({data: context.data, node, id, onExtend: context.onExtend})}
                            <div className={'app-sql-expression-tool app-sql-expression-tool-hide'}>
                                <SqlTool type={'expression'} id={this.props.id} vertical={true}
                                         disablesDel={this.props.index === 0}/>
                            </div>
                        </div>
                    )}
            </SqlQueryData.Consumer>
        )
    }
}

