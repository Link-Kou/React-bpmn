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
                                    'app-sql-group-tool-expression-del-vertical': vertical
                                })}
                                style={{cursor: ` ${disablesDel ? 'not-allowed' : 'Pointer'} `}}
                                title={`删除 ${id}`}
                                onClick={() => disablesDel ? null : context.onDelete(id)}>
                                <svg x="0px" y="0px" viewBox="0 0 226.77 155.91" style={{height: 15, width: 15}}>
                                    <g style={{
                                        transform: 'scale(1.6)',
                                        transformOrigin: '50% 50%',
                                        fill: disablesDel ? '#c9c9c9' : '#000'
                                    }}>
                                        <path d="M50.047,144.947h14.616c4.036,0,7.309-3.271,7.309-7.307c0-4.037-3.272-7.309-7.309-7.309h-7.309V25.579h7.309
		c4.036,0,7.309-3.271,7.309-7.308s-3.272-7.309-7.309-7.309H50.047c-4.037,0-7.309,3.272-7.309,7.309v119.37
		C42.738,141.676,46.01,144.947,50.047,144.947z"/>
                                        <path d="M184.031,137.641V18.271c0-4.037-3.271-7.309-7.309-7.309h-14.616c-4.036,0-7.308,3.272-7.308,7.309
		s3.271,7.308,7.308,7.308h7.309v104.753h-7.309c-4.036,0-7.308,3.271-7.308,7.309c0,4.035,3.271,7.307,7.308,7.307h14.616
		C180.76,144.947,184.031,141.676,184.031,137.641z"/>
                                        <path d="M71.677,119.664c1.425,1.428,3.296,2.141,5.167,2.141s3.741-0.713,5.167-2.141l31.47-31.469l31.469,31.469
		c1.426,1.428,3.296,2.141,5.167,2.141s3.741-0.713,5.167-2.141c2.855-2.854,2.855-7.48,0-10.334l-31.47-31.47l29.843-29.842
		c2.852-2.853,2.852-7.481,0-10.334c-2.854-2.855-7.481-2.855-10.334,0L113.48,67.526L83.638,37.684
		c-2.853-2.853-7.481-2.857-10.334,0c-2.854,2.853-2.854,7.481,0,10.334l29.843,29.842l-31.47,31.47
		C68.821,112.184,68.821,116.811,71.677,119.664z"/>
                                    </g>
                                </svg>
                            </div>
                        </>
                    )
                }
            </SqlQueryData.Consumer>
        )
    }
}

