import * as React from 'react';
import {
    Col,
    ControlLabel,
    Form,
    FormControl,
    FormGroup,
    Grid,
    HelpBlock,
    Input,
    InputNumber,
    InputPicker,
    Panel,
    Radio,
    RadioGroup,
    Row
} from 'rsuite'
import {IFormValue} from '../../../index.types';

interface IProps {
    formValue: IFormValue

    onChange?(formValue: IFormValue): void
}

export default class CartonAddInfoUnified extends React.Component<IProps> {

    public state = {
        formError: {}
    }

    public render() {
        const {formValue: formValues, onChange: onChanges} = this.props
        const {formError: formErrors} = this.state
        return (
            <Panel header={'基础信息'}>
                <Form fluid={true}
                      layout="inline"
                      formValue={formValues}
                      formError={formErrors}
                      onCheck={(formError) => {
                          this.setState({
                              formError
                          })
                      }}
                      onChange={(formValue: any) => {
                          onChanges?.(formValue)
                      }}>
                    <Grid style={{padding: 10}} fluid={true} className={'app-grid-inline-from'}>
                        <Row>
                            <Col xs={12} sm={12} md={12}>
                                <FormGroup>
                                    <ControlLabel><span style={{color: 'red'}}>*</span>商品名称</ControlLabel>
                                    <FormControl name="name" placeholder="限30字，必填" type="text" accepter={Input}/>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={12}>
                                <FormGroup>
                                    <ControlLabel>辅助名称</ControlLabel>
                                    <FormControl name="subname" placeholder="限30字，非必填" type="text"
                                                 accepter={Input}/>
                                    <HelpBlock tooltip={true}><b>例:</b>商品名称(辅助名称)</HelpBlock>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={12} md={12}>
                                <FormGroup className={'app-form-group-inline'}>
                                    <ControlLabel>箱型选择</ControlLabel>
                                    <FormControl name="boxType"
                                                 style={{flexWrap: 'wrap'}}
                                                 placeholder="每个限6字，用空格隔开" type="text" inline={true}
                                                 accepter={RadioGroup}>
                                        <Radio value={1}>全包</Radio>
                                        <Radio value={2}>半包</Radio>
                                        <Radio value={3}>天地盖</Radio>
                                        <Radio value={4}>有底无盖</Radio>
                                    </FormControl>
                                </FormGroup>
                            </Col>
                            <Col xs={6} sm={6} md={6}>
                                <FormGroup className={'app-form-group-inline'}>
                                    <ControlLabel>成型方式</ControlLabel>
                                    <FormControl name="molding" placeholder="请选择" data={[
                                        {
                                            value: 1,
                                            label: '一页成型'
                                        },
                                        {
                                            value: 2,
                                            label: '两页成型'
                                        }
                                    ]} accepter={InputPicker}/>
                                </FormGroup>
                            </Col>
                            <Col xs={6} sm={6} md={6}>
                                <FormGroup className={'app-form-group-inline'}>
                                    <ControlLabel>成箱方式</ControlLabel>
                                    <FormControl name="moldBox" placeholder="请选择" data={[
                                        {
                                            value: 1,
                                            label: '钉箱'
                                        },
                                        {
                                            value: 2,
                                            label: '粘箱'
                                        }
                                    ]} accepter={InputPicker}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6} sm={6} md={6}>
                                <FormGroup className={'app-form-group-inline'}>
                                    <ControlLabel>尺寸类型</ControlLabel>
                                    <FormControl name="sizeType" placeholder="请选择" data={[
                                        {
                                            value: 1,
                                            label: '制造尺寸'
                                        }, {
                                            value: 2,
                                            label: '内径尺寸'
                                        }, {
                                            value: 3,
                                            label: '外径尺寸'
                                        }
                                    ]} accepter={InputPicker}/>
                                </FormGroup>
                            </Col>
                            <Col xs={6} sm={6} md={6}>
                                <FormGroup>
                                    <ControlLabel><span style={{color: 'red'}}>*</span>纸箱长</ControlLabel>
                                    <FormControl name="length" autocomplete="off" type="number"
                                                 disabled={false}
                                                 max={999}
                                                 min={0}
                                                 postfix={'cm'}
                                                 accepter={InputNumber}/>
                                </FormGroup>
                            </Col>
                            <Col xs={6} sm={6} md={6}>
                                <FormGroup>
                                    <ControlLabel><span style={{color: 'red'}}>*</span>纸箱宽</ControlLabel>
                                    <FormControl name="width" autocomplete="off" type="number"
                                                 disabled={false}
                                                 max={999}
                                                 min={0}
                                                 postfix={'cm'}
                                                 accepter={InputNumber}/>
                                </FormGroup>
                            </Col>
                            <Col xs={6} sm={6} md={6}>
                                <FormGroup>
                                    <ControlLabel><span style={{color: 'red'}}>*</span>纸箱高</ControlLabel>
                                    <FormControl name="height" autocomplete="off" type="number"
                                                 disabled={false}
                                                 max={999}
                                                 min={0}
                                                 postfix={'cm'}
                                                 accepter={InputNumber}/>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Grid>
                </Form>
            </Panel>
        )
    }

}
