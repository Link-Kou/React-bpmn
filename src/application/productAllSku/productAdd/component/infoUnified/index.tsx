import * as React from 'react';
import {Col, ControlLabel, Form, FormControl, FormGroup, Grid, Input, Row} from 'rsuite'
import TextRequired from '@component/textRequired';
import {FormImageUploader} from '@component/formControl';

interface IProps {

}

export default class ProductInfoUnified extends React.Component<IProps> {

    public state = {}

    public render() {

        return (
            <Form fluid={true} layout="vertical" className={'app-form-group-vertical'}
                  onChange={(formValue) => {
                      alert(formValue)
                  }}>
                <Grid style={{padding: 10}} fluid={true}>
                    <Row>
                        <Col xs={5} sm={24} md={10}>
                            <FormGroup>
                                <TextRequired accepter={ControlLabel}>商品标题</TextRequired>
                                <FormControl name="productName"
                                             placeholder="限30字，必填"
                                             type="text"
                                             accepter={Input}/>
                            </FormGroup>
                        </Col>
                        <Col xs={5} sm={24} md={10} xsHidden={true}>
                            <FormGroup>
                                <TextRequired accepter={ControlLabel}>商品描述</TextRequired>
                                <FormControl name="productName"
                                             placeholder="限30字，非必填" type="text"
                                             accepter={Input}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={7}>
                            <FormGroup>
                                <ControlLabel>商品品牌</ControlLabel>
                                <FormControl name="productType" placeholder="请输入商品品牌" data={[]}
                                             accepter={Input}/>
                            </FormGroup>
                        </Col>
                        <Col xs={7}>
                            <FormGroup>
                                <TextRequired accepter={ControlLabel}>商品单位</TextRequired>
                                <FormControl name="productType" placeholder="请输入商品单位，必填" data={[]}
                                             accepter={Input}/>
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup>
                                <TextRequired accepter={ControlLabel}>商品编码</TextRequired>
                                <FormControl name="productType" placeholder="请输入商品编码，必填" data={[]}
                                             accepter={Input}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <FormGroup>
                                <ControlLabel>商品主图</ControlLabel>
                                <FormControl name="productType"
                                             accepter={FormImageUploader}/>
                            </FormGroup>
                        </Col>
                        <Col xs={4}>
                            <FormGroup>
                                <ControlLabel>品牌LOGO</ControlLabel>
                                <FormControl name="productType"
                                             accepter={FormImageUploader}/>
                            </FormGroup>
                        </Col>
                        <Col xs={7}>
                            <Row>
                                <Col xs={24}>
                                    <FormGroup>
                                        <ControlLabel>商品产地</ControlLabel>
                                        <FormControl name="productType" placeholder="请输入商品产地，选填" data={[]}
                                                     accepter={Input}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24}>
                                    <FormGroup>
                                        <ControlLabel>商品型号</ControlLabel>
                                        <FormControl name="productType" placeholder="请输入商品型号，选填" data={[]}
                                                     accepter={Input}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24}>
                                    <FormGroup>
                                        <ControlLabel>商品类型</ControlLabel>
                                        <FormControl name="productType" placeholder="请输入商品类型，选填" data={[]}
                                                     accepter={Input}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={7}>
                            <FormGroup>
                                <ControlLabel>商品重量</ControlLabel>
                                <FormControl name="productType" placeholder="请输入商品重量，选填" data={[]}
                                             accepter={Input}/>
                            </FormGroup>
                        </Col>
                        <Col xs={7}>
                            <FormGroup>
                                <ControlLabel>商品长宽</ControlLabel>
                                <FormControl name="productType" placeholder="请输入商品长宽，选填" data={[]}
                                             accepter={Input}/>
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup>
                                <ControlLabel>商品体积</ControlLabel>
                                <FormControl name="productType" placeholder="请输入商品体积，选填" data={[]}
                                             accepter={Input}/>
                            </FormGroup>
                        </Col>
                    </Row>
                </Grid>
            </Form>

        )
    }

}
