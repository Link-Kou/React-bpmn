import * as React from 'react';
import OrderCardboardTable from './component/orderCardboardTable';
import OrderCardboardInfoUnified from './component/orderCardboardInfoUnified';
import {Col, Grid, Row} from 'rsuite';
//import SplitterLayout from 'react-splitter-layout';

export default class CartonList extends React.Component {

    public render() {
        return (
            <>
                <Grid fluid={true}>
                    <Row>
                        <Col xs={18} sm={18} md={18}>
                            <OrderCardboardTable/>
                        </Col>
                        <Col xs={6} sm={6} md={6} smHidden={true}>
                            <OrderCardboardInfoUnified/>
                        </Col>
                    </Row>
                </Grid>
            </>
        )
    }
}
