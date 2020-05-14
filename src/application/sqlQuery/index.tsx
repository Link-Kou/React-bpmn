import * as React from 'react';
import {DatePicker, Input, InputPicker} from 'rsuite';

import SqlQuery from '../../component/sqlQuery'

import Moment from 'moment';
import {LongPanel} from '@component/panel';
import QueueAnim from 'rc-queue-anim';


export default class SqlQueryGrid extends React.Component {

    public state = {
        splitPane: false,
        collapsed: true,
        size: 350,
        expression: '',
        query: [
            {
                id: 'asdasdasd',
                type: 'expression',
                link: 'OR',
                children: [],
                extend: {
                    'field': 'name',
                    'symbol': '=',
                    'value': 'ss'
                }
            },
            {
                id: '3333',
                type: 'expression',
                link: undefined,
                children: [],
                extend: {
                    'field': 'time',
                    'symbol': '=',
                    'value': '2019-03-04'
                }
            }
        ],
        field: [
            {
                label: '名称',
                value: 'name',
                symbol: [
                    {
                        label: '等于',
                        value: '='
                    }
                ],
                control: (value: any) => <Input placeholder="请输入名称" defaultValue={value}/>
            },
            {
                label: '时间',
                value: 'time',
                symbol: [
                    {
                        label: '等于',
                        value: '='
                    },
                    {
                        label: '不等于',
                        value: '!='
                    }
                ],
                control: (value: any) => <DatePicker style={{width: '100%'}}
                                                     defaultValue={Moment(value).toDate()}/>
            }
        ]
    }

    public render() {

        return (
            <>
                <QueueAnim delay={300} key="demo1"
                           type={['left', 'right']}
                           ease={['easeInOutQuad', 'easeInBack']}>
                    <LongPanel key='a'>
                        <div>
                            表达式: {this.state.expression}
                        </div>
                        <br/>
                        <div style={{minWidth: 650, maxWidth: 750}}>
                            <SqlQuery
                                query={this.state.query}
                                onCallbackExp={(node: any) => (
                                    `'asdasd' = 'asda'`
                                )}
                                onChange={(query: any, expression: string) => {
                                    this.setState({
                                        query,
                                        expression
                                    })
                                }}
                                expression={(props: { data: any, node: any, id: any, onExtend: (id: string, extendNode: any) => void }) => {
                                    return (
                                        <SqllExpression {...props}/>
                                    )
                                }}/>
                        </div>
                    </LongPanel>
                </QueueAnim>

            </>
        )
    }
}

interface IProps {
    data: any
    node: any
    id: any
    onExtend: (id: string, extendNode: any) => void
}

export class SqllExpression extends React.Component<IProps> {


    public state = {
        field: [
            {
                label: '名称',
                value: 'name',
                symbol: [
                    {
                        label: '等于',
                        value: '='
                    }
                ],
                control: (value: any) => <Input placeholder="请输入名称" defaultValue={value}/>
            },
            {
                label: '时间',
                value: 'time',
                symbol: [
                    {
                        label: '等于',
                        value: '='
                    },
                    {
                        label: '不等于',
                        value: '!='
                    }
                ],
                control: (value: any) => <DatePicker style={{width: '100%'}}
                                                     defaultValue={Moment(value).toDate()}/>
            }
        ]
    }


    public render() {
        const {id, onExtend, node} = this.props
        const symbolList: Array<any> = this.state.field.filter((k, i, a) => {
            return k.value === node.extend.field
        })
        return (
            <>
                <div>
                    <InputPicker data={this.state.field}
                                 defaultValue={node.extend.field}
                                 onSelect={(e: any, item: any) => {
                                     onExtend(id, {'field': e})
                                 }}/>
                </div>
                <div>
                    {
                        symbolList.length > 0 ?
                            <InputPicker
                                data={symbolList[0].symbol}
                                defaultValue={node.extend.symbol} onSelect={(e: any) => {
                                onExtend(id, {'symbol': e})
                            }}/>
                            : null
                    }
                </div>
                <div>
                    {
                        symbolList.length > 0 ?
                            symbolList[0].control(node.extend.value)
                            : null
                    }
                </div>
            </>

        )
    }
}
