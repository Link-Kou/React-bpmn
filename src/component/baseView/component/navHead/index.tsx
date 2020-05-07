import * as React from 'react';

import HeadTabs from './component/tabs'
import HeadTool from './component/tool'

import './head.scss'


interface IProps {
    showTabs?: boolean

}

export default class Index extends React.Component<IProps> {

    public state = {
        showTabs: this.props.showTabs
    }

    public render() {
        const {showTabs} = this.state;

        return (
            <div className='app-header'>
                {showTabs ? <HeadTabs/> : null}
                <HeadTool>
                    {this.props.children}
                </HeadTool>
            </div>

        )
    }
}