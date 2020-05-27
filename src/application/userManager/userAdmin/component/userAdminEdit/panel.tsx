import * as React from 'react';
import {Dropdown, Nav, Panel} from 'rsuite';
import {HeadPanel, LoadPanel} from '@component/panel';
import HookFormEdit from './compone/hookFormEdit';

/**
 *
 * @author lk
 * @date 2020/5/26 16:37
 * @version 1.0
 */
export default class UserAdminEditPanel extends React.Component {

    public render() {
        return (
            <>
                <HeadPanel hideBorderBottom={true} title={'管理面板'}>
                    <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                        <Dropdown title={'管理'} trigger="click" onSelect={(e) => {

                        }}>
                            <Dropdown.Item>保存修改</Dropdown.Item>
                            <Dropdown.Item>重置密码</Dropdown.Item>
                            <Dropdown.Item>删除用户</Dropdown.Item>
                        </Dropdown>
                    </div>
                </HeadPanel>
                <LoadPanel subHeight={170} loadering={false} outrender={false} queueAnim={false}>
                    <Panel bodyFill={false}>
                        <HookFormEdit/>
                    </Panel>
                </LoadPanel>
                <Nav justified={true} vertical={false} appearance={'tabs'} activeKey={'home'}
                     reversed={true}>
                    <Nav.Item eventKey="home">权限信息</Nav.Item>
                    <Nav.Item eventKey="news">操作记录</Nav.Item>
                </Nav>
            </>
        )
    }

}
