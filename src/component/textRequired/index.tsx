import * as React from 'react';
import {Tooltip, Whisper} from 'rsuite';

interface IProps {
    /**
     * 是否显示红色必填标志
     */
    required?: boolean
    /**
     * 替换必填的符号
     */
    mark?: string
    /**
     * 自定义控件
     */
    accepter?: React.ComponentType;
    /**
     * 标题
     */
    title?: any
    /**
     * 其他参数
     */
    props?: { [X: string]: any }
}

const tooltip = (
    <Tooltip>
        <b>必填</b>
    </Tooltip>
);
/**
 *
 * @author lk
 * @date 2020/4/18 23:32
 * @version 1.0
 */
export default class TextRequired extends React.PureComponent<IProps> {

    private renderRequired(mark: string = '*', v: boolean = true) {
        if (v) {
            return (
                <span style={{color: 'red'}}>{mark}</span>
            )
        }
        return undefined
    }

    private renderAccepter() {
        const {accepter, required, mark} = this.props
        const Component = accepter as any

        const _View = () => (
            <>
                <div style={{marginBottom: 5, display: 'block'}}>
                    <Whisper placement="top" trigger="hover" speaker={tooltip}>
                        <span title={'必填'}>
                            {this.renderRequired(mark, required)}
                            {this.props.children}
                        </span>
                    </Whisper>
                </div>
            </>
        )
        if (Component) {
            return (
                <Component {...this.props.props}>
                    {_View()}
                </Component>
            )
        }
        return _View()
    }


    private renderTitle() {
        const {accepter, required, mark, title} = this.props
        const Component = accepter as any
        const _View = () => (
            <>
                <Whisper placement="top" trigger="hover" speaker={tooltip}>
                    <span title={'必填'}>
                        {this.renderRequired(mark, required)}
                        {title}
                    </span>
                </Whisper>
                {this.props.children}
            </>
        )
        if (Component) {
            return (
                <Component {...this.props.props}>
                    {_View()}
                </Component>
            )
        }
        return _View()
    }

    render() {
        const {title} = this.props
        if (title) {
            return this.renderTitle()
        }
        return this.renderAccepter()
    }
}
