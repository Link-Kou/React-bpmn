import * as React from 'react';

import './tool.scss'

export default class HeadTool extends React.Component {

    public render() {
        return (
            <div className="app-head-tool-icotool">
                {this.props.children}
            </div>
        )
    }
}