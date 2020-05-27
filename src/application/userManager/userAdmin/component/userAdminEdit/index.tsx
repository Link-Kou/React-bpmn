import * as React from 'react';
import {
    CheckTree,
    Col,
    ControlLabel,
    Dropdown,
    Form,
    FormControl,
    FormGroup,
    Nav,
    Panel,
    Row,
    Tag,
    TagGroup,
    TagPicker
} from 'rsuite';
import {HeadPanel, LoadPanel} from '@component/panel';

/**
 *
 * @author lk
 * @date 2020/5/26 16:37
 * @version 1.0
 */
export default class index extends React.Component {

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
                        <Form fluid={true}>
                            <Row style={{marginBottom: 24}}>
                                <Col sm={8} xs={8} md={8}>
                                    <FormGroup>
                                        <ControlLabel>用户名</ControlLabel>
                                        <FormControl name="name"/>
                                    </FormGroup>
                                </Col>
                                <Col sm={8} xs={8} md={8}>
                                    <FormGroup>
                                        <ControlLabel>手机号码</ControlLabel>
                                        <FormControl name="name"/>
                                    </FormGroup>
                                </Col>
                                <Col sm={8} xs={8} md={8}>
                                    <FormGroup>
                                        <ControlLabel>电子邮箱</ControlLabel>
                                        <FormControl name="name"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <ControlLabel>备注标签</ControlLabel>
                                <TagGroup>
                                    <Tag color="blue" closable={true}>
                                        asdasd
                                    </Tag>
                                    <Tag color="blue" closable={true}>
                                        asdasd
                                    </Tag>
                                </TagGroup>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>关联角色</ControlLabel>
                                <FormControl name="email" style={{width: '100%'}} accepter={TagPicker}
                                             data={[]}/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>权限菜单</ControlLabel>
                                <FormControl name="password" accepter={CheckTree} expandAll={true} data={[
                                    {
                                        label: '中国',
                                        value: 1,
                                        children: [
                                            {
                                                label: '北京市',
                                                value: 2
                                            },
                                            {
                                                label: '福建省',
                                                value: 3,
                                                children: [
                                                    {
                                                        label: '福州市',
                                                        value: 36
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]}/>
                            </FormGroup>
                        </Form>
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
