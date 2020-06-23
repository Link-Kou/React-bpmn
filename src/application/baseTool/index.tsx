import * as React from 'react';

import {Avatar, Badge, Button, Icon, Popover, Whisper} from 'rsuite';
import {utilsOther} from '@utils/index';

export default class HeadTool extends React.Component {

    public state = {
        fullScreen: false
    }

    componentDidMount() {
        //Listener.ws();
    }

    public render() {
        const {fullScreen} = this.state
        return (
            <>
                <div className="app-head-tool-column" onClick={() => {
                    this.setState({
                        fullScreen: utilsOther.FullScreen()
                    })
                }}>
                    <Avatar style={{backgroundColor: '#fff', color: '#87d068'}} size={'xs'}>
                        <Icon icon={fullScreen ? 'compress' : 'expand'}/>
                    </Avatar>
                </div>
                <div className="app-head-tool-column" id={'app-tool-comments'} onClick={() => {
                }}>
                    <Badge content={55} maxCount={99}>
                        <Avatar style={{backgroundColor: '#87d068'}} size={'xs'}>
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
                                //Notifications.MessageHtml5('测试');
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
                            <Avatar style={{background: '#edfae1', color: '#4caf50'}} size={'xs'}>RS</Avatar>
                        </Badge>
                    </div>
                </Whisper>
            </>
        )
    }
}
