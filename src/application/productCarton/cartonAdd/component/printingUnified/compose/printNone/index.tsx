import * as React from 'react';
import {Col, ControlLabel, Form, FormControl, FormGroup, Grid, InputPicker, Row} from 'rsuite';
import {IPrintingnNone} from '../../../../../index.types';


interface IProps {
    printingWay?: IPrintingnNone

    onChange?(formValue: IPrintingnNone): void
}

/**
 * 无印刷方式
 * @author lk
 * @date 2020/5/4 20:21
 * @version 1.0
 */
export const PrintNone = (props: IProps) => {
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
                </Grid>
            </Form>
        </>
    )
}
