import * as React from 'react';
import {DatePicker, Input, InputPicker, TagPicker} from 'rsuite';
import dayjs from 'dayjs';

interface IProps {
    data: any
    node: any
    id: any
    onExtend: (id: string, extendNode: any, refresh?: boolean) => void
}

/**
 * SQL
 * @author lk
 * @date 2020/5/21 09:48
 * @version 1.0
 */
export default class SqllExpression extends React.Component<IProps> {


    public state = {
        field: [
            {
                label: '原纸名称',
                value: 'name',
                symbol: [
                    {
                        label: '等于',
                        value: '='
                    },
                    {
                        label: '包含',
                        value: 'in'
                    }
                ],
                control: (props: { value: any, id: string, symbol: string, extendNode: (id: string, value: any) => void }) => {
                    if (props.symbol === 'in') {
                        const splitData = props?.value?.map((k: any, i: any, a: any) => {
                            return ({label: k, value: k})
                        })
                        return (
                            <TagPicker style={{width: '100%'}} creatable={true}
                                       defaultValue={props?.value}
                                       data={splitData}
                                       onChange={(v, event) => {
                                           props?.extendNode?.(props?.id, {value: v})
                                       }}
                            />
                        )
                    }
                    return (
                        <Input
                            placeholder="请输入名称"
                            defaultValue={props?.value}
                            onChange={(v, event) => {
                                props?.extendNode?.(props?.id, {value: v})
                            }}/>
                    )
                }
            },
            {
                label: '供应商',
                value: 'supplier',
                symbol: [
                    {
                        label: '等于',
                        value: '='
                    }
                ],
                control: (props: { value: any, id: string, extendNode: (id: string, value: any) => void }) => (
                    <Input
                        placeholder="请输入名称"
                        defaultValue={props?.value}
                        onChange={(v, event) => {
                            props?.extendNode?.(props?.id, {value: v})
                        }}/>
                )
            },
            {
                label: '卷轴幅宽',
                value: 'reelWidth',
                symbol: [
                    {
                        label: '等于',
                        value: '='
                    }
                ],
                control: (props: { value: any, id: string, extendNode: (id: string, value: any) => void }) => (
                    <Input
                        placeholder="请输入名称"
                        defaultValue={props?.value}
                        onChange={(v, event) => {
                            props?.extendNode?.(props?.id, {value: v})
                        }}/>
                )
            },
            {
                label: '创建时间',
                value: 'createtime',
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
                control: (props: { value: any, id: string, extendNode: (id: string, value: any) => void }) => (
                    <DatePicker
                        style={{width: '100%'}}
                        format={'YYYY-MM-DD HH:mm:ss'}
                        defaultValue={props?.value ? dayjs(props?.value) : props?.value}
                        onChange={(v, event) => {
                            const day = dayjs(v)
                            props?.extendNode?.(
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
            symbol: node.extend.symbol,
            extendNode: onExtend
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
                                     onExtend(id, {'field': e, value: undefined}, true)
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

