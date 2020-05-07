import * as React from 'react';
import {Col, Grid, Row} from 'rsuite';
import QuoteListTable from './component/quoteListTable';
import QuoteProductTable from './component/quoteProductTable';

export default class CartonList extends React.Component {

    public render() {
        return (
            <>
                <Grid fluid={true}>
                    <Row>
                        <Col xs={8} sm={8} md={8} smHidden={true}>
                            <QuoteListTable/>
                        </Col>
                        <Col xs={16} sm={24} md={16}>
                            <QuoteProductTable/>
                        </Col>
                    </Row>
                </Grid>
            </>
        )
    }
}
