import * as React from 'react';
import {Alert, Checkbox, Col, Grid, Row} from 'rsuite';
import MarketingTypeTable from './marketingTypeTable';
import MarketingProductTable from './marketingProductTable';
import {Mosaic, MosaicNode, MosaicWindow} from 'react-mosaic-component';
import classNames from 'classnames';


type ViewId = 'a' | 'b';

const TITLE_MAP: Record<ViewId, any> = {
    a: '营销类型列表',
    b: '产品列表'
};

const TITLE_MAP_COM: Record<ViewId, any> = {
    a: <MarketingTypeTable/>,
    b: <MarketingProductTable/>
};

interface IState {
    layout: MosaicNode<any>
}

export default class CartonList extends React.Component {

    public state: IState = {
        layout: {
            direction: 'row',
            first: 'a',
            second: 'b',
            splitPercentage: 30
        }
    }

    public _MosaictoolbarControls(props: { id: string }) {
        const {layout} = this.state
        if (layout.second === props.id) {
            return (
                <div style={{width: 180}}>
                    <Grid fluid={true}>
                        <Row className="show-grid">
                            <Col xs={12} sm={12} md={12}/>
                            <Col xs={12} sm={12} md={12}>
                                <Checkbox checked={true}>筛选</Checkbox>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            )
        }
        return <div/>
    }

    public render() {
        const {layout} = this.state
        return (
            <>
                <Mosaic<any> className={'mosaic-blueprint-theme'}
                             renderTile={(id, path) => (
                                 <MosaicWindow<ViewId>
                                     className={classNames({
                                         'app-mosaic-select-red': layout.second === id
                                     })}
                                     path={path}
                                     /**
                                     * 工具栏
                                     * default: [Replace, Split, Expand, Remove]
                                     */
                                     toolbarControls={this._MosaictoolbarControls({id})}
                                     /**
                                      * 是否拖动
                                      */
                                     draggable={true}
                                     //renderPreview={() => <div>拖动覆盖预览</div>}
                                     //createNode={() => 'new'}
                                     title={TITLE_MAP[id]}>
                                     <div>{TITLE_MAP_COM[id]}</div>
                                 </MosaicWindow>
                             )}
                             onChange={(v) => {
                                 if (v.direction === 'row') {
                                     this.setState((state: IState) => {
                                         if (state.layout.first !== v.first) {
                                             v.first === 'a' ? v.splitPercentage = 30 : v.splitPercentage = 70
                                         }
                                         return {
                                             layout: v
                                         }
                                     })
                                 } else {
                                     this.setState((state: IState) => {
                                         state.layout.first === 'a' ? state.layout.splitPercentage = 30 : state.layout.splitPercentage = 70
                                         return state
                                     })
                                     Alert.warning('布局不支持上下结构')
                                 }
                             }}
                             value={this.state.layout}
                />
            </>
        )
    }
}
