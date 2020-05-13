import {Panel, Grid, Row, Col} from 'rsuite';
import {ImageCardView} from '@component/imageManager';
import * as React from 'react';
import {IReturnMaterialProductList} from '../../../../index.types';
import TextSpan from '@component/textSpan';

export const HooKRowExpanded = (props: { w: number, rowData: IReturnMaterialProductList }) => {
    const {w, rowData} = props
    return (
        <div style={{width: w - 60}}>
            <Panel header="其他信息">
                <Grid fluid={true}>
                    <Row>
                        <Col md={6}>
                            <Row>
                                <Col md={6}> <TextSpan width={50} lineClamp={1}>商品产地:</TextSpan></Col>
                                <Col md={18}>{rowData.productOrigin}</Col>
                            </Row>
                        </Col>
                        <Col md={6}>
                            <Row>
                                <Col md={6}>商品型号:</Col>
                                <Col md={8}>{rowData.productModel}</Col>
                            </Row>
                        </Col>
                        <Col md={6}>
                            <Row>
                                <Col md={6}>商品类型:</Col>
                                <Col md={8}>{rowData.productType}</Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Row>
                                <Col md={6}>商品重量:</Col>
                                <Col md={8}>{rowData.productWeight}</Col>
                            </Row>
                        </Col>
                        <Col md={6}>
                            <Row>
                                <Col md={6}>商品长宽:</Col>
                                <Col md={8}>{rowData.productLength}</Col>
                            </Row>
                        </Col>
                        <Col md={6}>
                            <Row>
                                <Col md={6}>商品体积:</Col>
                                <Col md={8}>{rowData.productVolume}</Col>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </Panel>
            <Panel header="品牌信息">
                <Grid fluid={true}>
                    <Row>
                        <Col md={6}>
                            <Row>
                                <Col md={6}>商品品牌:</Col>
                                <Col md={8}>{rowData.brandName}</Col>
                            </Row>
                        </Col>
                        <Col md={6}>
                            <Row>
                                <Col md={6}>品牌LOGO:</Col>
                                <Col md={8}>
                                    {
                                        rowData?.images?.filter((k: any, i: any, a: any) => k.type === 4).map((k: any, i: any, a: any) => (
                                            <ImageCardView
                                                fileUrl={k.url}/>
                                        ))
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </Panel>
            <Panel header="详情主图">
                <div style={{display: 'flex'}}>
                    {
                        rowData?.images?.filter((k: any, i: any, a: any) => k.type === 2).map((k: any, i: any, a: any) => (
                            <ImageCardView
                                fileUrl={k.url}/>
                        ))
                    }
                </div>
            </Panel>
            <Panel header="详情列表图">
                <div style={{display: 'flex'}}>
                    {
                        rowData?.images?.filter((k: any, i: any, a: any) => k.type === 3).map((k: any, i: any, a: any) => (
                            <ImageCardView
                                fileUrl={k.url}/>
                        ))
                    }
                </div>
            </Panel>
        </div>
    )
}
