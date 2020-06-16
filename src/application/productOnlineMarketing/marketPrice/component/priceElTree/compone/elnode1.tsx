import * as React from 'react';
import {Col, Grid, InputNumber, InputPicker, Row} from 'rsuite';
import TreeUtils from '@utils/Tree';
import {DroolRange} from '@component/elDrools';


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
const elnode1 = (props: IProps) => {
    const {nodeData, treedata, onChange} = props
    return (
        <div style={{maxWidth: 600}}>
            <Grid fluid={true}>
                <Row>
                    <Col xs={6}>
                        <p>类目</p>
                        <InputPicker style={{width: '100%'}} data={
                            [
                                {value: '购买数量', label: '购买数量'},
                                {value: '购买金额', label: '购买金额'}
                            ]
                        }/>
                    </Col>
                    <Col xs={5}>
                        <p>条件</p>
                        <InputPicker style={{width: '100%'}}
                                     value={nodeData?.expression ?? ''}
                                     data={
                                         [
                                             {value: '大于', label: '大于'},
                                             {value: '小于', label: '小于'},
                                             {value: '等于', label: '等于'},
                                             {value: '范围', label: '范围'},
                                             {value: '大于等于', label: '大于等于'},
                                             {value: '小于等于', label: '小于等于'}
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
                                     }}/>
                    </Col>
                    <Col xs={13}>
                        <p>值</p>
                        {nodeData?.expression === '范围' ? <DroolRange/> : <InputNumber style={{width: '100%'}}/>}
                    </Col>
                </Row>
            </Grid>
        </div>
    )
}

export default elnode1
