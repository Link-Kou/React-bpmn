import * as React from 'react';
import {Col, ControlLabel, Form, FormControl, FormGroup, Grid, InputPicker, Row} from 'rsuite';
import {IPrintingnDigital} from '../../../../../index.types';

interface IProps {
    printingWay?: IPrintingnDigital

    onChange?(formValue: IPrintingnDigital): void
}

/**
 * 数码印刷
 * @author lk
 * @date 2020/5/4 20:22
 * @version 1.0
 */
export const PrintDigital = (props: IProps) => {
    const [formErrors, setFormErrors] = React.useState({});
    const {printingWay, onChange: onChanges} = props
    return (
        <>
            <Form fluid={true}
                  layout="inline"
                  formError={formErrors}
                  formValue={printingWay}
                  onCheck={(formError) => {
                      setFormErrors(formError)
                  }}
                  onChange={(formValue: any) => {
                      onChanges?.(formValue)
                  }}>
                <Grid style={{padding: 10, marginBottom: 0}} fluid={true} className={'app-grid-inline-from'}>
                    <Row>
                        <Col xs={8} sm={8} md={8}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>版面设定</ControlLabel>
                                <FormControl name="layoutType" placeholder="请选择" data={[
                                    {
                                        value: 1,
                                        label: 'AA'
                                    },
                                    {
                                        value: 2,
                                        label: 'AB'
                                    }
                                ]} accepter={InputPicker}/>
                            </FormGroup>
                        </Col>
                        <Col xs={8} sm={8} md={8}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>面纸类型</ControlLabel>
                                <FormControl name="tissueType" placeholder="请选择" data={[
                                    {
                                        value: 1,
                                        label: '牛皮纸'
                                    },
                                    {
                                        value: 2,
                                        label: '涂布纸'
                                    }
                                ]} accepter={InputPicker}/>
                            </FormGroup>
                        </Col>
                        <Col xs={8} sm={8} md={8}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>开槽模切</ControlLabel>
                                <FormControl name="slottingCutting" placeholder="请选择" data={[
                                    {
                                        value: 1,
                                        label: '无'
                                    },
                                    {
                                        value: 2,
                                        label: '开槽'
                                    },
                                    {
                                        value: 3,
                                        label: '模切'
                                    }
                                ]} accepter={InputPicker}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8} sm={8} md={8}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>印刷面积</ControlLabel>
                                <FormControl name="printingArea" placeholder="请选择" data={[
                                    {
                                        value: 1,
                                        label: '30%以内'
                                    },
                                    {
                                        value: 2,
                                        label: '31%-50%'
                                    },
                                    {
                                        value: 3,
                                        label: '50%-70%'
                                    },
                                    {
                                        value: 4,
                                        label: '70%以上'
                                    }
                                ]} accepter={InputPicker}/>
                            </FormGroup>
                        </Col>
                        <Col xs={8} sm={8} md={8}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>数码表处</ControlLabel>
                                <FormControl name="surfaceType" placeholder="请选择" data={[
                                    {
                                        value: 1,
                                        label: '水性光油'
                                    },
                                    {
                                        value: 2,
                                        label: 'UV油'
                                    }
                                ]} accepter={InputPicker}/>
                            </FormGroup>
                        </Col>
                    </Row>
                </Grid>
            </Form>
        </>
    )
}
