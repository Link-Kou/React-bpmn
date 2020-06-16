import * as React from 'react';
import {Col, Grid, InputNumber, InputPicker, Row} from 'rsuite';
import TreeUtils from '@utils/Tree';

interface IProps {
    nodeData?: any

    treedata?: any

    onChange?(value: any): void
}

/**
 *
 * @author lk
 * @date 2020/6/15 21:21
 * @version 1.0
 */
const elnode3 = (props: IProps) => {
    const {nodeData, treedata, onChange} = props
    return (
        <div style={{maxWidth: 600}}>
            <Grid fluid={true}>
                <Row>
                    <Col xs={6}>
                        <InputPicker style={{width: '100%'}} data={
                            [
                                {value: '付款金额', label: '付款金额'},
                                {value: '单价', label: '单价'}
                            ]
                        }/>
                    </Col>
                    <Col xs={5}>
                        <InputPicker style={{width: '100%'}}
                                     value={nodeData?.expression ?? ''}
                                     data={
                                         [
                                             {value: '减少', label: '减少'},
                                             {value: '增加', label: '增加'},
                                             {value: '等于', label: '等于'},
                                             {value: '折扣', label: '折扣'}
                                         ]
                                     }
                                     onChange={(value, event) => {
                                         const updataNode = TreeUtils.updataNode({
                                             treeData: treedata,
                                             updataNode: nodeData.value,
                                             newNode: {
                                                 ...nodeData,
                                                 expression: value
                                             },
                                             getNodeKey: (node) => node.value
                                         });
                                         onChange?.(updataNode)
                                     }}
                        />
                    </Col>
                    <Col xs={9}>
                        <InputNumber value={nodeData?.expressionValue ?? ''}
                                     onChange={(value, event) => {
                                         const updataNode = TreeUtils.updataNode({
                                             treeData: treedata,
                                             updataNode: nodeData.value,
                                             newNode: {
                                                 ...nodeData,
                                                 expressionValue: value
                                             },
                                             getNodeKey: (node) => node.value
                                         });
                                         onChange?.(updataNode)
                                     }}/>
                    </Col>
                </Row>
            </Grid>
        </div>
    )
}

export default elnode3
