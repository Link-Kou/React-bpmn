import * as React from 'react';

import {Avatar, Badge, Button, Icon, Popover, Whisper} from 'rsuite';
import {utilsOther} from '@utils/index';

export default class HeadTool extends React.Component {

    public render() {
        return (
            <>
                <div className="app-head-tool-column" onClick={() => {
                    utilsOther.FullScreen();
                }}>
                    <Avatar style={{backgroundColor: '#fff', color: '#87d068'}} size={'sm'}>
                        <Icon icon={'arrows-alt'}/>
                    </Avatar>
                </div>
                <div className="app-head-tool-column">
                    <Badge content={55} maxCount={99}>
                        <Avatar style={{backgroundColor: '#87d068'}} size={'sm'}>
                            <Icon icon={'comments'}/>
                        </Avatar>
                    </Badge>
                </div>
                <Whisper
                    trigger="active"
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
                        <Badge content={55} maxCount={99}>
                            <Avatar style={{background: '#edfae1', color: '#4caf50'}} size={'sm'}>RS</Avatar>
                        </Badge>
                    </div>
                </Whisper>
            </>
        )
    }
}
