import * as React from 'react';
import {Col, ControlLabel, Form, FormControl, FormGroup, Grid, InputNumber, InputPicker, Row} from 'rsuite';
import {IPrintingnWatermark} from '../../../../../index.types';

interface IProps {
    printingWay?: IPrintingnWatermark

    onChange?(formValue: IPrintingnWatermark): void
}

/**
 * 水印印刷
 * @author lk
 * @date 2020/5/4 20:25
 * @version 1.0
 */
export const PrintWatermark = (props: IProps) => {
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
                    </Row>
                    <Row>
                        <Col xs={6} sm={6} md={6}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>水印色数</ControlLabel>
                                <FormControl name="colorNumber" placeholder="请选择" data={[
                                    {
                                        value: 1,
                                        label: '单黑'
                                    },
                                    {
                                        value: 2,
                                        label: '单杂'
                                    },
                                    {
                                        value: 3,
                                        label: '2色'
                                    },
                                    {
                                        value: 4,
                                        label: '2色'
                                    },
                                    {
                                        value: 5,
                                        label: '2色'
                                    },
                                    {
                                        value: 6,
                                        label: '5色'
                                    },
                                    {
                                        value: 7,
                                        label: '5色以上'
                                    }
                                ]} accepter={InputPicker}/>
                            </FormGroup>
                        </Col>
                        <Col xs={6} sm={6} md={6}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>水印表处</ControlLabel>
                                <FormControl name="surfaceType" placeholder="请选择" data={[
                                    {
                                        value: 1,
                                        label: '无'
                                    },
                                    {
                                        value: 2,
                                        label: '水性光油'
                                    }
                                ]} accepter={InputPicker}/>
                            </FormGroup>
                        </Col>
                        <Col xs={6} sm={6} md={6}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>橡皮版面积</ControlLabel>
                                <FormControl name="rubberArea" placeholder="请选择" postfix={'mm'}
                                             accepter={InputNumber}/>
                            </FormGroup>
                        </Col>
                        <Col xs={6} sm={6} md={6}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>柔性版面积</ControlLabel>
                                <FormControl name="柔版面积" placeholder="请选择" postfix={'mm'}
                                             accepter={InputNumber}/>
                            </FormGroup>
                        </Col>
                    </Row>
                </Grid>
            </Form>

        </>
    )
}
