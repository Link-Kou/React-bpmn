import * as React from 'react';
import {Col, Grid, Row} from 'rsuite';
import CardboardListTable from './component/cardboardListTable';
import BackColorPanel from '@component/backColorPanel';
import CardboardList from './cardboardList';


export default class Index extends CardboardList {


    public render() {
        return (
            <>
                <Grid fluid={true}>
                    <Row>
                        <Col xs={24} sm={24} md={24}>
                            <BackColorPanel tableBordered={true}>
                                <CardboardListTable onLoadTableData={this.handlersLoadCardboardProductPage}/>
                            </BackColorPanel>
                        </Col>
                    </Row>
                </Grid>
            </>
        )
    }
}
