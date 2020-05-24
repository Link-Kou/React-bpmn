import React from 'react';
import {Popover, Whisper, Dropdown} from 'rsuite';

interface IProps {
    container?: any
    Menu?: Array<any>
}

/**
 *
 * @author lk
 * @date 2020/5/23 23:11
 * @version 1.0
 */
export default class More extends React.Component<IProps> {

    private _trigger: any

    private _onSelectMenu = (eventKey: any) => {
        this._trigger.hide();
    }

    render() {
        const {container, Menu} = this.props
        return (
            <Whisper
                placement="autoVerticalStart"
                trigger="click"
                triggerRef={ref => {
                    this._trigger = ref;
                }}
                container={container}
                speaker={<Popover>
                    <Dropdown.Menu onSelect={this._onSelectMenu}>
                        {
                            Menu?.map((k, i, a) => (
                                <Dropdown.Item eventKey={k}>{k}</Dropdown.Item>
                            ))
                        }
                    </Dropdown.Menu>
                </Popover>}
            >
                {this.props.children}
            </Whisper>
        );
    }
}

