import * as React from 'react';
import {Col, ControlLabel, Form, FormControl, FormGroup, Grid, Input, Row} from 'rsuite'

interface IProps {

}

export default class ProductInfoUnified extends React.Component<IProps> {

    public state = {}

    public render() {

        return (
            <Form fluid={true} layout="inline" onChange={(formValue) => {
                alert(JSON.stringify(formValue))
            }}>
                <Grid style={{padding: 10}} fluid={true}>
                    <Row>
                        <Col xs={12}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>商品标题</ControlLabel>
                                <FormControl name="productName" placeholder="限30字，必填" type="text" accepter={Input}/>
                            </FormGroup>
                        </Col>
                        <Col xs={12}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>商品描述</ControlLabel>
                                <FormControl name="productName" placeholder="限30字，非必填" type="text"
                                             accepter={Input}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>商品品牌</ControlLabel>
                                <FormControl name="productType" placeholder="区分商品最小聚合单位（SPU）的编号，必填" data={[]}
                                             accepter={Input}/>
                            </FormGroup>
                        </Col>
                        <Col xs={8}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>商品产地</ControlLabel>
                                <FormControl name="productType" placeholder="区分商品最小聚合单位（SPU）的编号，必填" data={[]}
                                             accepter={Input}/>
                            </FormGroup>
                        </Col>
                        <Col xs={8}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>商品单位</ControlLabel>
                                <FormControl name="productType" placeholder="区分商品最小聚合单位（SPU）的编号，必填" data={[]}
                                             accepter={Input}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>商品编码</ControlLabel>
                                <FormControl name="productType" placeholder="区分商品最小聚合单位（SPU）的编号，必填" data={[]}
                                             accepter={Input}/>
                            </FormGroup>
                        </Col>
                        <Col xs={8}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>商品型号</ControlLabel>
                                <FormControl name="productType" placeholder="区分商品最小聚合单位（SPU）的编号，必填" data={[]}
                                             accepter={Input}/>
                            </FormGroup>
                        </Col>
                        <Col xs={8}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>商品类型</ControlLabel>
                                <FormControl name="productType" placeholder="区分商品最小聚合单位（SPU）的编号，必填" data={[]}
                                             accepter={Input}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>商品重量</ControlLabel>
                                <FormControl name="productType" placeholder="区分商品最小聚合单位（SPU）的编号，必填" data={[]}
                                             accepter={Input}/>
                            </FormGroup>
                        </Col>
                        <Col xs={8}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>商品长宽</ControlLabel>
                                <FormControl name="productType" placeholder="区分商品最小聚合单位（SPU）的编号，必填" data={[]}
                                             accepter={Input}/>
                            </FormGroup>
                        </Col>
                        <Col xs={8}>
                            <FormGroup className={'app-form-group-inline'}>
                                <ControlLabel>商品体积</ControlLabel>
                                <FormControl name="productType" placeholder="区分商品最小聚合单位（SPU）的编号，必填" data={[]}
                                             accepter={Input}/>
                            </FormGroup>
                        </Col>

                    </Row>
                </Grid>
            </Form>

        )
    }

}
