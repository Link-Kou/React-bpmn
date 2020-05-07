import * as React from 'react';
import UserTable from './component/userTable';
import {Col, Grid, Row} from 'rsuite';

export default class CartonList extends React.Component {

    public render() {
        return (
            <>
                <Grid fluid={true}>
                    <Row>
                        <Col xs={24} sm={24} md={24}>
                            <UserTable/>
                        </Col>
                    </Row>
                </Grid>
            </>
        )
    }
}
