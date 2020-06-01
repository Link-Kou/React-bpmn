import * as React from 'react';
import {ControlLabel, Form, FormControl, FormGroup, Tag, TagGroup, TagPicker, Row, Col} from 'rsuite';

interface IProps {
    hv?: boolean
}

/**
 *
 * @author lk
 * @date 2020/5/27 23:50
 * @version 1.0
 */
export default class HookFormEdit extends React.Component<IProps> {


    public renderFormGroup(hv: boolean = false) {
        if (hv) {
            return (
                <>
                    <FormGroup>
                        <ControlLabel>用户名</ControlLabel>
                        <FormControl name="name"/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>手机号码</ControlLabel>
                        <FormControl name="name"/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>电子邮箱</ControlLabel>
                        <FormControl name="name"/>
                    </FormGroup>
                </>
            )
        }
        return (
            <>
                <Row style={{marginBottom: 20}}>
                    <Col md={8} sm={8} lg={8} xs={8}>
                        <FormGroup>
                            <ControlLabel>用户名</ControlLabel>
                            <FormControl name="name"/>
                        </FormGroup>
                    </Col>
                    <Col md={8} sm={8} lg={8} xs={8}>
                        <FormGroup>
                            <ControlLabel>手机号码</ControlLabel>
                            <FormControl name="name"/>
                        </FormGroup>
                    </Col>
                    <Col md={8} sm={8} lg={8} xs={8}>
                        <FormGroup>
                            <ControlLabel>电子邮箱</ControlLabel>
                            <FormControl name="name"/>
                        </FormGroup>
                    </Col>
                </Row>
            </>
        )
    }

    public render() {
        const {hv} = this.props
        return (
            <Form fluid={true}>
                {
                    this.renderFormGroup(hv)
                }
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
            </Form>
        )
    }
}
