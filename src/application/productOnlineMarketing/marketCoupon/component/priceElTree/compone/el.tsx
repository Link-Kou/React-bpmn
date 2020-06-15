import * as React from 'react';
import {CheckPicker, Col, Grid, InputNumber, InputPicker, Row} from 'rsuite';
import TreeUtils from '@utils/Tree';

interface IProps {
    nodeData?: any

    treedata?: any

    onChange?(value: any): void
}

/**
 *
 * @author lk
 * @date 2020/6/14 10:58
 * @version 1.0
 */
export default class El extends React.Component<IProps> {

    public render() {
        const {nodeData, treedata, onChange} = this.props
        return (
            <div style={{maxWidth: 520, minWidth: 500}}>
                <Grid fluid={true}>
                    <Row>
                        <Col xs={nodeData?.expressionType === '特点产品' ? 8 : 6}>
                            <p>类目</p>
                            <InputPicker style={{width: '100%'}}
                                         value={nodeData.expressionType}
                                         data={
                                             [
                                                 {value: '购买数量', label: '购买数量'},
                                                 {value: '特点产品', label: '特点产品'},
                                                 {value: '购买金额', label: '购买金额'}
                                             ]
                                         }
                                         onChange={(value, event) => {
                                             const updataNode = TreeUtils.updataNode({
                                                 treeData: treedata,
                                                 updataNode: nodeData.value,
                                                 newNode: {
                                                     ...nodeData,
                                                     expressionType: value
                                                 },
                                                 getNodeKey: (node) => node.value
                                             });
                                             onChange?.(updataNode)
                                         }}/>
                        </Col>
                        {
                            nodeData.expressionType === '特点产品' ?
                                undefined :
                                <Col xs={5}>
                                    <p>条件</p>
                                    <InputPicker style={{width: '100%'}}
                                                 value={nodeData.expression}
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
                        }
                        <Col xs={nodeData?.expressionType === '特点产品' ? 16 : 13}>
                            <p>值</p>
                            {
                                nodeData?.expressionType === '特点产品' ?
                                    <CheckPicker data={[]} style={{width: '100%'}}/> :
                                    <InputNumber style={{width: '100%'}}/>
                            }
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }

}
