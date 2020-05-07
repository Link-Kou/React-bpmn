import {ButtonToolbar, Col, Grid, Icon, IconButton, Row, Table} from 'rsuite';
import * as React from 'react';

const {Cell} = Table;


interface IProps {

    [x: string]: any
}


interface IControllerAddReduce extends IProps {

    hide?: 'add' | 'del'

    delRow?(rowData: any, rowIndex: number): void

    addrow?(rowData: any, rowIndex: number): void
}


/**
 * 控制列-添加删除
 * @param props
 * @constructor
 */
export const ControllerAddReduce = (props: IControllerAddReduce) => {
    const {delRow, addrow, rowData, rowIndex, hide} = props;
    return (
        <Cell {...props}>
            <Grid fluid={true}>
                <Row>
                    <Col xs={24} sm={24} md={24}>
                        <ButtonToolbar>
                            {
                                hide === 'del' ? null : (
                                    <IconButton onClick={() => {
                                        delRow?.(rowData, rowIndex)
                                    }} icon={<Icon icon="minus-square"/>} size="xs" appearance={'link'} color={'red'}/>
                                )
                            }
                            {
                                hide === 'add' ? null : (
                                    <IconButton onClick={() => {
                                        addrow?.(rowData, rowIndex)
                                    }} icon={<Icon icon="plus-square"/>} size="xs" appearance={'link'}/>
                                )
                            }
                        </ButtonToolbar>
                    </Col>
                </Row>
            </Grid>
        </Cell>
    )
}

interface IControllerSortUpDown extends IProps {
    maxRow(): number

    /**
     *
     * @param rowIndex
     * @param upOrDown 1 -1
     */
    sortRow?(rowIndex: number, upOrDown: number): void
}


/**
 * 控制列-上下排序
 * @param props
 * @constructor
 */
export const ControllerSortUpDown = (props: IControllerSortUpDown) => {
    const {sortRow, rowIndex, maxRow} = props;
    return (
        <Cell {...props}>
            <Grid fluid={true}>
                <Row>
                    <Col xs={24} sm={24} md={24}>
                        <ButtonToolbar>
                            {
                                rowIndex === 0 ? null : (
                                    <IconButton onClick={() => {
                                        sortRow?.(rowIndex, -1)
                                    }} icon={<Icon icon="angle-up"/>} size="sm" appearance={'link'}/>
                                )
                            }
                            {
                                rowIndex + 1 === maxRow?.() ? null : (
                                    <IconButton onClick={() => {
                                        sortRow?.(rowIndex, 1)
                                    }} style={{marginLeft: 0}} icon={<Icon icon="angle-down"/>} size="sm"
                                                appearance={'link'} color={'red'}/>
                                )
                            }
                        </ButtonToolbar>
                    </Col>
                </Row>
            </Grid>
        </Cell>
    )
}
