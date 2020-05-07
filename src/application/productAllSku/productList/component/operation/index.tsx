import * as React from 'react';
import {Button, ButtonToolbar, Col, Dropdown, Grid, Row} from 'rsuite';
//import {createHashHistory} from 'history';
import {ProductListSearchDrawer} from '../search';
import {RouterHistory} from '../../../../../router/routerBase';
import {Prompt} from 'react-router';
import {RouterPath} from "../../../../../router/routerPath";

//创建路由方式
//const history = createHashHistory()


interface IProps {

}

export default class RedenvelopeTableList extends React.Component<IProps> {

    public _ProductListSearchDrawer: ProductListSearchDrawer | undefined

    public state = {
        data: [],
        loading: false,
        show: false,
        userId: '',
        formValue: {
            productType: [
                {
                    value: '123',
                    label: '123',
                    children: [
                        {
                            value: '456',
                            label: '456',
                            children: []
                        }
                    ]
                }
            ],
            productStatus: [
                {
                    value: '1231',
                    label: '123123'
                }
            ]
        }
    }


    public render() {

        return (
            <div style={{padding: '5px 0px'}}>
                <Prompt message="Are you sure you want to leave?"/>
                <Grid fluid={true}>
                    <Row>
                        <Col xs={6} sm={6} md={6}>
                            <Dropdown title="排序方式">
                                <Dropdown.Item>时间</Dropdown.Item>
                            </Dropdown>
                        </Col>
                        <Col xs={18} sm={18} md={18} xsHidden={true} smHidden={true}>
                            <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                                <ButtonToolbar>
                                    <Button onClick={() => {
                                        this._ProductListSearchDrawer?.setOpend()
                                    }}>搜索</Button>
                                    <Button>上架</Button>
                                    <Button>下架</Button>
                                    <Button appearance="primary"
                                            onClick={() => RouterHistory.push(RouterPath.ProductAllSkuAdd)}>新增产品</Button>
                                </ButtonToolbar>
                            </div>
                        </Col>
                    </Row>
                </Grid>
                <ProductListSearchDrawer ref={(ref: any) => this._ProductListSearchDrawer = ref}/>
            </div>
        )
    }

}
