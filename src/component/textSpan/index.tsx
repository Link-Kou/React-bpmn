import * as React from 'react';
import './index.scss'

export interface ITextSpanProps {
    lineClamp?: number
    title?: string
    width?: number

    accepter?: React.ComponentType;
    /**
     * 其他参数
     */
    props?: { [X: string]: any }

    [x: string]: any
}

export default class TextSpan extends React.Component<ITextSpanProps> {

    private renderAccepter = (props: ITextSpanProps) => {
        const {accepter, props: propss} = props
        const Component = accepter as any
        return (
            <Component {...propss}>
                {this.renderTextSpan(props)}
            </Component>
        )
    }

    private renderTextSpan = (props: ITextSpanProps) => {
        const {lineClamp, width, title, children} = props
        return (
            <div className={'app-textSpan'}>
                <div className={'app-textSpan-text'}
                     style={{WebkitLineClamp: lineClamp ? lineClamp : 3, width: width ? width : 'auto'}}
                     title={title ?? typeof children === 'string' ? children : ''}>
                    {children}
                </div>
            </div>
        )
    }

    render() {
        const {accepter} = this.props
        return accepter ? this.renderAccepter(this.props) : this.renderTextSpan(this.props)
    }
}
