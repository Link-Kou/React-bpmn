import * as React from 'react';
import {Col, ControlLabel, Form, FormControl, FormGroup, Grid, InputPicker, Panel, Row} from 'rsuite'
import {PrintDigital} from './compose/printDigital';
import {PrintGlue} from './compose/printGlue';
import {PrintWatermark} from './compose/printWatermark';
import {PrintNone} from './compose/printNone';
import {IFormValue} from '../../../index.types';

interface IProps {
    formValue: IFormValue

    onChange?(formValue: IFormValue): void
}

export default class CartonPrintingUnified extends React.Component<IProps> {

    public state = {
        formError: {}
    }

    public _viewSelectPrinting(printingType: number = 0) {
        const {formValue: formValues, onChange: onChanges} = this.props
        const {printingWay} = formValues
        const printing = ['', '无印刷', '水印印刷', '胶印印刷', '数码印刷']
        const _onChange = (printingWays: any) => {
            formValues.printingWay = printingWays
            onChanges?.(formValues)
        }
        const printingView = {
            '水印印刷': <PrintWatermark printingWay={printingWay}
                                    onChange={_onChange}/>,
            '数码印刷': <PrintDigital printingWay={printingWay}
                                  onChange={_onChange}/>,
            '胶印印刷': <PrintGlue printingWay={printingWay}
                               onChange={_onChange}/>,
            '无印刷': <PrintNone printingWay={printingWay}
                              onChange={_onChange}/>
        }
        return printingView[printing[printingType]] ?? undefined
    }

    public render() {
        const {formValue: formValues, onChange: onChanges} = this.props
        const {formError: formErrors} = this.state
        return (
            <Panel header={'印刷信息'}>
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
                    <Grid style={{padding: 10, marginBottom: 0}} fluid={true} className={'app-grid-inline-from'}>
                        <Row>
                            <Col xs={8} sm={8} md={8}>
                                <FormGroup className={'app-form-group-inline'}>
                                    <ControlLabel>印刷方式</ControlLabel>
                                    <FormControl name="printingType" placeholder="请选择" data={[
                                        {
                                            value: 4,
                                            label: '数码印刷'
                                        }, {
                                            value: 3,
                                            label: '胶印印刷'
                                        }, {
                                            value: 2,
                                            label: '水印印刷'
                                        }, {
                                            value: 1,
                                            label: '无印刷'
                                        }
                                    ]} accepter={InputPicker}/>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Grid>
                </Form>
                {this._viewSelectPrinting(formValues.printingType)}
            </Panel>
        )
    }

}
