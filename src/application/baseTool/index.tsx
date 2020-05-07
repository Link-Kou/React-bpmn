import * as React from 'react';

import {Avatar, Badge, Button, Popover, Whisper} from 'rsuite';

export default class HeadTool extends React.Component {

    public render() {
        return (
            <>
                <div className="app-head-tool-column">
                    <Badge count={0}>
                        <Avatar style={{backgroundColor: '#87d068'}} icon="bell"/>
                    </Badge>
                </div>
                <Whisper
                    trigger="hover"
                    placement='bottom'
                    speaker={
                        <Popover title="">
                            <Button type="dashed" style={{right: '0px'}} onClick={() => {

                            }}>
                                退出登录
                            </Button>
                            <br/>
                            <Button type="dashed" style={{right: '0px'}} onClick={() => {

                            }}>
                                修改密码
                            </Button>
                        </Popover>
                    }
                >
                    <div className="app-head-tool-column">
                        <Badge count={1}>
                            <Avatar style={{backgroundColor: '#87d068'}} icon="user"/>
                        </Badge>
                    </div>
                </Whisper>
                <Button type="dashed" style={{right: '0px'}} onClick={() => {

                }}>
                  隐藏/显示
                </Button>
            </>
        )
    }
}
