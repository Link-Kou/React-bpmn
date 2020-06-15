import * as React from 'react';
import {Col, Grid, Row} from 'rsuite';
import {BackColorPanel} from '@component/panel';
import PriceListTable from './component/priceListTable';
import PriceElTree from './component/priceElTree';


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
                        <Col xs={14} sm={14} md={14} smHidden={true}>
                            <BackColorPanel tableBordered={true}>
                                <PriceListTable/>
                            </BackColorPanel>
                        </Col>
                        <Col xs={10} sm={10} md={10}>
                            <BackColorPanel tableBordered={true}>
                                <PriceElTree/>
                            </BackColorPanel>
                        </Col>
                    </Row>
                </Grid>
            </>
        )
    }
}

