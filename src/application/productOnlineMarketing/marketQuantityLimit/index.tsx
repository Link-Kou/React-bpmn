import * as React from 'react';
import {Col, Grid, Row} from 'rsuite';
import {BackColorPanel} from '@component/panel';
import PriceListTable from './component/priceListTable';
import PriceElSteps from './component/priceElSteps';


/**
 *
 * @author lk
 * @date 2020/5/6 22:34
 * @version 1.0
 */
export default class MarketPrice extends React.Component {
    public render() {
        return (
            <>
                <Grid fluid={true}>
                    <Row>
                        <Col xs={16} sm={16} md={16} smHidden={true}>
                            <BackColorPanel tableBordered={true}>
                                <PriceListTable/>
                            </BackColorPanel>
                        </Col>
                        <Col xs={8} sm={8} md={8}>
                            <BackColorPanel tableBordered={true}>
                                <PriceElSteps/>
                            </BackColorPanel>
                        </Col>
                    </Row>
                </Grid>
            </>
        )
    }
}

