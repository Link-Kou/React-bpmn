import * as React from 'react';
import {Button, FlexboxGrid, Icon, IconButton, List, Panel} from 'rsuite';
import {BackColorPanel, HeadPanel, LoadPanel} from '@component/panel';
import RoleManageAddEditModel from '../addEditModel'

const slimText = {
    fontSize: '0.666em',
    color: '#000',
    fontWeight: 'lighter',
    paddingBottom: 5
};

const dataStyle = {
    fontSize: '1.2em',
    fontWeight: 500
};

const styleCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px'
};

const titleStyle = {
    paddingBottom: 15,
    whiteSpace: 'nowrap',
    fontWeight: 500
};

interface IProps {
    onEdit?(): void

    edit?: boolean
}

/**
 *
 * @author lk
 * @date 2020/5/27 18:40
 * @version 1.0
 */
export default class RoleList extends React.Component<IProps> {

    public state = {
        model: false
    }


    private _onShow = () => {
        const {model} = this.state
        this.setState({
            model: !model
        })
    }

    public render() {
        const {edit, onEdit} = this.props
        const {model} = this.state
        return (
            <>
                <RoleManageAddEditModel show={model} onClose={this._onShow}/>
                <BackColorPanel>
                    <HeadPanel hideBorderBottom={true} title={'角色管理'}>
                        <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                            <IconButton appearance={'subtle'}
                                        onClick={this._onShow}
                                        icon={<Icon icon={'user-plus'}/>}>新建角色</IconButton>
                        </div>
                    </HeadPanel>
                    <LoadPanel loadering={false} outrender={false} queueAnim={true}>
                        <Panel>
                            <List bordered={true} hover={true}>
                                <List.Item key={1} index={1}>
                                    <FlexboxGrid>
                                        <FlexboxGrid.Item
                                            colspan={6}
                                            style={{
                                                flexDirection: 'column',
                                                alignItems: 'flex-start',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <div style={titleStyle as any}>
                                                <Icon icon="expeditedssl"
                                                      style={{marginRight: 5, color: 'red'}}/>
                                                总经理
                                            </div>
                                            <div style={{paddingBottom: 5, fontSize: '0.666em'}}>
                                                <div>2020-12-11 11:00:00</div>
                                            </div>
                                        </FlexboxGrid.Item>
                                        <FlexboxGrid.Item
                                            colspan={6}
                                            style={styleCenter as any}
                                        >
                                            <div style={{textAlign: 'right'}}>
                                                <div style={slimText as any}><Icon icon="peoples"
                                                                                   style={{marginRight: 5}}/>关联人数
                                                </div>
                                                <div style={dataStyle as any}>0</div>
                                            </div>
                                        </FlexboxGrid.Item>
                                        <FlexboxGrid.Item
                                            colspan={6}
                                            style={styleCenter as any}
                                        >
                                            <div style={{textAlign: 'right'}}>
                                                <div style={slimText as any}><Icon icon="peoples-map"
                                                                                   style={{marginRight: 5}}/>关联权限
                                                </div>
                                                <div style={dataStyle as any}>0</div>
                                            </div>
                                        </FlexboxGrid.Item>
                                        <FlexboxGrid.Item
                                            colspan={6}
                                            style={styleCenter as any}
                                        >
                                            <Button style={{padding: 5}} appearance={'link'} disabled={edit}
                                                    onClick={this._onShow}>编辑</Button>
                                            <span style={{padding: 2}}>|</span>
                                            <Button style={{padding: 5}} appearance={'link'} disabled={edit}>禁用</Button>
                                            <span style={{padding: 2}}>|</span>
                                            <Button style={{padding: 5}} appearance={'link'} disabled={edit}
                                                    onClick={onEdit}>权限</Button>
                                        </FlexboxGrid.Item>
                                    </FlexboxGrid>
                                </List.Item>
                                <List.Item key={2} index={2}>
                                    <FlexboxGrid>
                                        <FlexboxGrid.Item
                                            colspan={6}
                                            style={{
                                                flexDirection: 'column',
                                                alignItems: 'flex-start',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <div style={titleStyle as any}>
                                                <Icon icon="expeditedssl"
                                                      style={{marginRight: 5, color: 'red'}}/>
                                                总经理
                                            </div>
                                            <div style={{paddingBottom: 5, fontSize: '0.666em'}}>
                                                <div>2020-12-11 11:00:00</div>
                                            </div>
                                        </FlexboxGrid.Item>
                                        <FlexboxGrid.Item
                                            colspan={6}
                                            style={styleCenter as any}
                                        >
                                            <div style={{textAlign: 'right'}}>
                                                <div style={slimText as any}><Icon icon="peoples"
                                                                                   style={{marginRight: 5}}/>关联人数
                                                </div>
                                                <div style={dataStyle as any}>0</div>
                                            </div>
                                        </FlexboxGrid.Item>
                                        <FlexboxGrid.Item
                                            colspan={6}
                                            style={styleCenter as any}
                                        >
                                            <div style={{textAlign: 'right'}}>
                                                <div style={slimText as any}><Icon icon="peoples-map"
                                                                                   style={{marginRight: 5}}/>关联权限
                                                </div>
                                                <div style={dataStyle as any}>0</div>
                                            </div>
                                        </FlexboxGrid.Item>
                                        <FlexboxGrid.Item
                                            colspan={6}
                                            style={styleCenter as any}
                                        >
                                            <Button style={{padding: 5}} appearance={'link'} disabled={edit}>启动</Button>
                                            <span style={{padding: 2}}>|</span>
                                            <Button style={{padding: 5}} appearance={'link'} disabled={edit}
                                                    onClick={this._onShow}>删除</Button>
                                        </FlexboxGrid.Item>
                                    </FlexboxGrid>
                                </List.Item>
                            </List>
                        </Panel>
                    </LoadPanel>
                </BackColorPanel>
            </>
        )
    }
}
