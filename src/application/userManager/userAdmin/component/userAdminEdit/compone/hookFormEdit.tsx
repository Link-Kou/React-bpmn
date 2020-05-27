import * as React from 'react';
import {CheckTree, Col, ControlLabel, Form, FormControl, FormGroup, Row, Tag, TagGroup, TagPicker} from 'rsuite';

/**
 *
 * @author lk
 * @date 2020/5/27 23:50
 * @version 1.0
 */
export default class HookFormEdit extends React.Component {

    public render() {
        return (
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
        )
    }
}
