import * as React from 'react';
import {Col, ControlLabel, Form, FormControl, FormGroup, Grid, InputNumber, InputPicker, Row} from 'rsuite';
import {IPrintingnGlue} from '../../../../../index.types';

interface IProps {
    printingWay?: IPrintingnGlue

    onChange?(formValue: IPrintingnGlue): void
}

/**
 * 胶印印刷
 * @author lk
 * @date 2020/5/4 20:24
 * @version 1.0
 */
export const PrintGlue = (props: IProps) => {
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
                                        value: 1,
                                        label: '开槽'
                                    }, {
                                        value: 3,
                                        label: '模切'
                                    }
                                ]} accepter={InputPicker}/>
                            </FormGroup>
                        </Col>
                        <Col xs={8} sm={8} md={8}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>裱胶方式</ControlLabel>
                                <FormControl name="mountSurfaceType" placeholder="请选择" data={[
                                    {
                                        value: 1,
                                        label: '裱瓦楞'
                                    },
                                    {
                                        value: 2,
                                        label: '裱平板'
                                    }
                                ]} accepter={InputPicker}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8} sm={8} md={8}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>胶印普色</ControlLabel>
                                <FormControl name="glueSurfaceType" placeholder="请选择" accepter={InputNumber}/>
                            </FormGroup>
                        </Col>
                        <Col xs={8} sm={8} md={8}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>胶印专色</ControlLabel>
                                <FormControl name="specialColorNumber" placeholder="请选择" accepter={InputNumber}/>
                            </FormGroup>
                        </Col>
                        <Col xs={8} sm={8} md={8}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>胶印表处</ControlLabel>
                                <FormControl name="glueSurfaceType" placeholder="请选择" data={[
                                    {
                                        value: 1,
                                        label: '无'
                                    },
                                    {
                                        value: 2,
                                        label: 'UV油'
                                    },
                                    {
                                        value: 3,
                                        label: '亮光膜'
                                    },
                                    {
                                        value: 4,
                                        label: '亚光膜'
                                    },
                                    {
                                        value: 5,
                                        label: '防剥离UV'
                                    },
                                    {
                                        value: 6,
                                        label: '吸塑油'
                                    },
                                    {
                                        value: 7,
                                        label: '红外油'
                                    },
                                    {
                                        value: 8,
                                        label: '亚光油'
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
