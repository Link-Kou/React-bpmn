import * as React from 'react';
import {Col, Grid, Input, InputGroup, InputNumber, InputPicker, Row} from 'rsuite';
import TreeUtils from '@utils/Tree';

interface IProps {
    nodeData?: any

    treedata?: any

    onChange?(value: any): void
}


/*
const RenderRange = () => {
    const [show, setShow] = React.useState(false);
    return (
        <Whisper
            style={{width: '100%'}}
            placement={'bottomEnd'}
            trigger="active"
            open={show}
            speaker={
                <Popover title="表达式">
                    <InputGroup style={{width: 350}}>
                        <Grid fluid={true}>
                            <Row>
                                <Col xs={13} style={{padding: 0}}>
                                    <InputPicker menuStyle={{zIndex: 9999}} style={{border: 'none'}} data={[
                                        {
                                            value: '>',
                                            label: '>'
                                        },
                                        {
                                            value: '>=',
                                            label: '>='
                                        }
                                    ]}/>
                                </Col>
                                <Col xs={11} style={{padding: 0}}>
                                    <InputNumber/>
                                </Col>
                            </Row>
                        </Grid>
                        <InputGroup.Addon>~</InputGroup.Addon>
                        <Grid fluid={true}>
                            <Row>
                                <Col xs={11} style={{padding: 0}}>
                                    <InputNumber/>
                                </Col>
                                <Col xs={13} style={{padding: 0}}>
                                    <InputPicker menuStyle={{zIndex: 9999}} style={{border: 'none'}} data={[
                                        {
                                            value: '<',
                                            label: '<'
                                        },
                                        {
                                            value: '<=',
                                            label: '<='
                                        }
                                    ]}/>
                                </Col>
                            </Row>
                        </Grid>
                    </InputGroup>
                </Popover>
            }
        >
            <Button style={{width: '100%'}} appearance="subtle" onClick={() => {
                setShow(!show)
            }}>添加区间表达式</Button>
        </Whisper>

    )
}
*/

/**
 *
 * @author lk
 * @date 2020/6/14 10:58
 * @version 1.0
 */
export default class El extends React.Component<IProps> {


    private renderRange() {
        return (
            <InputGroup>
                <Grid fluid={true}>
                    <Row>
                        <Col xs={13} style={{padding: 0}}>
                            <InputPicker menuStyle={{zIndex: 9999}} style={{border: 'none'}} data={[
                                {
                                    value: '>',
                                    label: '>'
                                },
                                {
                                    value: '>=',
                                    label: '>='
                                }
                            ]}/>
                        </Col>
                        <Col xs={11} style={{padding: 0}}>
                            <InputNumber/>
                        </Col>
                    </Row>
                </Grid>
                <InputGroup.Addon>~</InputGroup.Addon>
                <Grid fluid={true}>
                    <Row>
                        <Col xs={11} style={{padding: 0}}>
                            <InputNumber/>
                        </Col>
                        <Col xs={13} style={{padding: 0}}>
                            <InputPicker menuStyle={{zIndex: 9999}} style={{border: 'none'}} data={[
                                {
                                    value: '<',
                                    label: '<'
                                },
                                {
                                    value: '<=',
                                    label: '<='
                                }
                            ]}/>
                        </Col>
                    </Row>
                </Grid>
            </InputGroup>
        )
    }

    public render() {
        const {nodeData, treedata, onChange} = this.props
        if (nodeData?.refKey?.split('-')?.length === 3) {
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
                                             value={nodeData.expression}
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
                                <InputNumber value={nodeData.expressionValue}
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
        if (nodeData?.refKey?.split('-')?.length === 4) {
            return (
                <div style={{maxWidth: 600}}>
                    <Grid fluid={true}>
                        <Row>
                            <Col xs={6}>
                                <p>条件满足</p>
                                <InputPicker data={
                                    [
                                        {value: '继续', label: '继续'},
                                        {value: '终止', label: '终止'}
                                    ]
                                }/>
                            </Col>
                            <Col xs={9}>
                                <p>提示</p>
                                <Input postfix="%"/>
                            </Col>
                            <Col xs={4}>
                                <p>优先级</p>
                                <InputNumber/>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            )
        }
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
                        <Col xs={nodeData?.expression === '范围' ? 13 : 9}>
                            <p>值</p>
                            {nodeData?.expression === '范围' ? this.renderRange() : <InputNumber style={{width: '100%'}}/>}
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }

}
