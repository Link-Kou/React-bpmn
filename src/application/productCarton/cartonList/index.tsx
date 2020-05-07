import * as React from 'react';
import {Col, Grid, Row} from 'rsuite';
import CartonListTable from './component/cartonListTable';
import BackColorPanel from '@component/backColorPanel';
import CartonList from './cartonList';

export default class Index extends CartonList {

    public render() {
        return (
            <>
                <Grid fluid={true}>
                    <Row>
                        <Col xs={24} sm={24} md={24}>
                            <BackColorPanel tableBordered={true}>
                                <CartonListTable onLoadTableData={this.handlersLoadCartonProductPage}/>
                            </BackColorPanel>
                        </Col>
                    </Row>
                </Grid>
            </>
        )
    }
}
