import * as React from 'react';

import SqlPanel from './component/sqlPanel'
import SqlGroup from './component/sqlGroup'
import SqlExpression from './component/sqlExpression'
import SqlToggle from './component/sqlToggle';
import {utilsGuid} from '@utils/index';


interface IProps {
    /**
     * 表达控件
     */
    query: Array<any>

    /**
     * expression 表达式控件
     * @param props
     */
    expression(props: { data: any, node: any, id: any, onExtend: (id: string, extendNode: any) => void }): JSX.Element

    /**
     * 数据改变
     * @param data
     * @param expression
     */
    onChange?(query: any, expression: string): void

    /**
     * 构建单一表达式
     * @param extend
     */
    onCallbackExp(extend: any): string
}

export default class SqlQuery extends React.Component<IProps> {

    public state = {
        query: [
            {
                id: utilsGuid.randomGUID(),
                type: 'expression',
                link: undefined,
                children: [],
                extend: {}
            }
        ]
    }

    public componentWillMount(): void {
        if (this.props.query !== undefined && this.props.query !== null && this.props.query.length > 0) {
            this.setState({
                query: this.props.query
            })
        }
    }


    /**
     * 构建表达式窗口
     * @private
     */
    public _onBuild() {
        const {query} = this.state
        const {expression} = this.props
        /**
         * 解析query构建界面
         * @param node
         * @param iindex
         */
        const getCompont = (node: { id: string, type: string, link: 'AND' | 'OR', children: Array<any> }, iindex: any): any => {
            const com = {
                'expression': (nodeitem: any, index: any) => <> <SqlExpression expression={expression}
                                                                               node={nodeitem}
                                                                               id={nodeitem.id}
                                                                               index={index}/>
                    {nodeitem.link ? <SqlToggle id={nodeitem.id} link={nodeitem.link}/> : null}
                </>,
                'group': (item: any) => item
            }
            if (node.type === 'group' && node.children.length > 0) {
                return (
                    <SqlGroup id={node.id} link={node.link}>
                        {
                            node.children.map((k, i, a) => (com[node.type](getCompont(k, i))))
                        }
                    </SqlGroup>
                )
            } else if (node.type === 'expression') {
                return com[node.type](node, iindex)
            }
            return null;
        }
        const anies = query.map((k: any, i, a) => (
            getCompont(k, i)
        ));
        return (
            <SqlPanel data={query} onAdd={this._onAdd.bind(this)} onDelete={this._onDelete.bind(this)}
                      onToggleLink={this._onToggleLink.bind(this)} onExtend={this._onExtend.bind(this)}>
                {anies}
            </SqlPanel>
        )
    }

    /**
     * 添加表达式
     * @param id 编号
     * @param type 类型
     * @param addtochildren 是否添加子级
     * @private
     */
    public _onAdd(id: string, type: 'group' | 'expression', addtochildren: boolean) {
        const {query}: { query: Array<any> } = this.state
        let splice: boolean = false;
        const add = (item: Array<any>) => {
            item.forEach((k, i, a) => {
                if (k.id === id) {
                    const children = type === 'group' ? [{
                        id: utilsGuid.randomGUID(),
                        type: 'expression',
                        link: undefined,
                        extend: {},
                        children: []
                    }] : []
                    const newdata: any = {
                        id: utilsGuid.randomGUID(),
                        type: type,
                        link: undefined,
                        extend: {},
                        children
                    }
                    if (addtochildren) {
                        //两个连续的 expression 与 expression 同级的上下关系,由上一个expression完成SqlToggle记录
                        if (type === 'expression') {
                            const child: any = k.children[k.children.length - 1];
                            if (child.type === 'expression') {
                                child.link = 'AND'
                            }
                        }
                        k.children.push(newdata)
                    } else if (!splice) {
                        //同级添加,Group带有SqlToggle,此时的k的link就需要清空，否者就重复了
                        if (type === 'group') {
                            k.link = undefined
                        }
                        if (type === 'expression') {
                            if (k.link === undefined) {
                                k.link = 'AND'
                            } else {
                                newdata.link = k.link
                            }
                        }
                        a.splice(i + 1, 0, newdata);
                        splice = true
                    }
                } else {
                    add(k.children)
                }
            });
        }
        add(query)
        this.setState({
            query
        })
    }

    /**
     * 删除表达式
     * @param id 编号
     * @private
     */
    public _onDelete(id: string) {
        let {query}: { query: Array<any> } = this.state
        query = JSON.parse(JSON.stringify(query))
        const del = (item: Array<any>) => {
            item.forEach((k, i, a) => {
                if (k.id === id) {
                    if (k.type === 'group') {
                        //group存在于两个expression之间，必须要重新赋值expression的link
                        if ((i - 1) >= 0 && (i + 1) < a.length) {
                            const prechild: any = a[i - 1];
                            const nextchild: any = a[i + 1];
                            if (prechild.type === 'expression' && nextchild.type === 'expression') {
                                prechild.link = 'AND'
                            }
                        }
                    }
                    if (k.type === 'expression') {
                        if ((i - 1) >= 0 && (i + 1) >= a.length) {
                            const prechild: any = a[i - 1];
                            //const nextchild: any = a[i + 1];
                            if (prechild.type === 'expression') {
                                prechild.link = undefined
                            }
                        } else {

                        }
                    }
                    a.splice(i, 1)
                }
                del(k.children)
            });
        }
        del(query);
        this.setState({
            query
        })
    }

    /**
     * 修改连接关系
     * @param id 编号
     * @private
     */
    public _onToggleLink(id: string) {
        const {query}: { query: Array<any> } = this.state
        const link = (item: Array<any>) => {
            item.forEach((k, i, a) => {
                if (k.id === id) {
                    k.link = (k.link === 'AND' ? 'OR' : 'AND')
                }
                link(k.children)
            });
        }
        link(query)
    }

    /**
     * 修改扩展数据
     * @param id 编号
     * @param extendNode 扩展数据
     * @private
     */
    public _onExtend(id: string, extendNode: any) {
        const {query}: { query: Array<any> } = this.state
        const extend = (item: Array<any>) => {
            item.forEach((k, i, a) => {
                if (k.id === id) {
                    k.extend = {
                        ...k.extend,
                        ...extendNode
                    }
                }
                extend(k.children)
            });
        }
        extend(query)
        this._onChange()
    }

    /**
     * 数据改变-构建表达式
     * @param id 编号
     * @param extendNode 扩展数据
     * @private
     */
    public _onChange() {
        const {query}: { query: Array<any> } = this.state
        const {onCallbackExp} = this.props
        const expression = (item: Array<any>): any => {
            return item.map((k, i, a) => {
                if (k.type === 'expression') {
                    return onCallbackExp(k) + ` ${k.link === undefined ? '' : k.link} `;
                }
                if (k.type === 'group') {
                    return ` ${k.link} (${expression(k.children).join('')})`
                }
                return ''
            });
        }
        const expression1 = expression(query).join('');
        this.props.onChange && this.props.onChange(this.state.query, expression1)
    }

    public render() {
        return (
            <>
                {this._onBuild()}
            </>

        )
    }
}

