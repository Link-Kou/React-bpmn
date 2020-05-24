import * as React from 'react';
import classNames from 'classnames';
import {SqlQueryData} from '../sqlPanel'

import './tool.scss'

interface IProps {
    id: string,
    type: 'expression' | 'group'
    vertical?: boolean
    disablesDel?: boolean
}

export default class SqlTool extends React.Component<IProps> {

    public state = {
        toggleShow: true
    }

    public render() {
        const {id, vertical, disablesDel} = this.props
        return (
            <SqlQueryData.Consumer>
                {
                    (context: any) => (
                        <>
                            <div
                                className={classNames({
                                    'app-sql-group-tool-expression': true,
                                    'app-sql-group-tool-expression-vertical': vertical
                                })}
                                title={'添加表达式'}
                                onClick={() => context.onAdd(id, 'expression', this.props.type === 'group')}/>
                            <div
                                className={classNames({
                                    'app-sql-group-tool-expression-group': true,
                                    'app-sql-group-tool-expression-group-vertical': vertical
                                })}
                                title={'添加表达式组'}
                                onClick={() => context.onAdd(id, 'group', this.props.type === 'group')}/>
                            <div
                                className={classNames({
                                    'app-sql-group-tool-expression-del': true,
                                    'app-sql-group-tool-expression-del-vertical': vertical,
                                    'app-sql-group-tool-expression-del-not': disablesDel
                                })}
                                style={{cursor: ` ${disablesDel ? 'not-allowed' : 'Pointer'} `}}
                                title={`删除`}
                                onClick={() => disablesDel ? null : context.onDelete(id)}>
                            </div>
                        </>
                    )
                }
            </SqlQueryData.Consumer>
        )
    }
}

