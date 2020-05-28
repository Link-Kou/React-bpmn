import * as React from 'react';
import {Whisper, Tooltip} from 'rsuite';


interface IProps {
    title: string
}

export default class WhisperTitle extends React.Component<IProps> {
    public render() {
        const {title, children} = this.props
        return (
            <Whisper placement="autoVerticalEnd" trigger="hover" speaker={
                <Tooltip>
                    <p>{title}</p>
                </Tooltip>
            }>
                {children}
            </Whisper>
        )
    }
}
