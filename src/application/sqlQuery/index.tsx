import * as React from 'react';
import {DatePicker, Input, InputPicker} from 'rsuite';

import SqlQuery from '../../component/sqlQuery'
import {LongPanel} from '@component/panel';
import QueueAnim from 'rc-queue-anim';
import dayjs from 'dayjs';


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
                    field: 'name',
                    symbol: '=',
                    value: 'ss'
                }
            },
            {
                id: '3333',
                type: 'expression',
                link: undefined,
                children: [],
                extend: {
                    field: 'time',
                    symbol: '=',
                    value: '2019-03-04'
                }
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
                                onChange={(query: any, expression: string) => {
                                    this.setState({
                                        query,
                                        expression
                                    })
                                }}
                                expression={(props: { data: any, node: any, id: any, onExtend: (id: string, extendNode: (id: string, value: any, refresh?: boolean) => void) => void }) => {
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
    onExtend: (id: string, extendNode: any, refresh?: boolean) => void
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
                control: (props: { value: any, id: string, onExtend: (id: string, value: any) => void }) => (
                    <Input
                        placeholder="请输入名称"
                        //value={props?.value}
                        defaultValue={props?.value}
                        onChange={(v, event) => {
                            props?.onExtend?.(props?.id, {value: v})
                        }}/>
                )
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
                control: (props: { value: any, id: string, onExtend: (id: string, value: any) => void }) => (
                    <DatePicker
                        style={{width: '100%'}}
                        format={'YYYY-MM-DD HH:mm:ss'}
                        defaultValue={props?.value ? dayjs(props?.value) : props?.value}
                        //value={dayjs(props?.value).isValid() ? dayjs(props?.value).toDate() : props?.value}
                        onChange={(v, event) => {
                            const day = dayjs(v)
                            props?.onExtend?.(
                                props?.id,
                                {
                                    value: day.isValid() ? day.format('YYYY-MM-DD HH:mm:ss') : v
                                }
                            )
                        }}
                    />
                )
            }
        ]
    }


    public render() {
        const {id, onExtend, node} = this.props
        const symbolList: Array<any> = this.state.field.filter((k, i, a) => {
            return k.value === node.extend.field
        })
        let Control: any = undefined
        const ControlProps: any = {
            value: node.extend.value,
            id,
            onExtend
        }
        if (symbolList?.length > 0) {
            Control = symbolList[0].control
        }
        return (
            <>
                <div>
                    <InputPicker data={this.state.field}
                                 defaultValue={node.extend.field}
                                 onSelect={(e: any, item: any) => {
                                     onExtend(id, {'field': e}, true)
                                 }}/>
                </div>
                <div>
                    {
                        symbolList.length > 0 ?
                            <InputPicker
                                data={symbolList[0].symbol}
                                defaultValue={node.extend.symbol} onSelect={(e: any) => {
                                onExtend(id, {'symbol': e}, true)
                            }}/>
                            : null
                    }
                </div>
                <div>
                    {
                        Control ? <Control {...ControlProps}/> : null
                        //symbolList[0].control(node.extend.value, id, onExtend)
                    }
                </div>
            </>

        )
    }
}
