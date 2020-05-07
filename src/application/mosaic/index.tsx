import * as React from 'react';
import {Mosaic, MosaicWindow} from 'react-mosaic-component';
//import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import './example.less'
import 'react-mosaic-component/react-mosaic-component.css'
import PoductList from '../productAllSku/productList';


export type ViewId = 'a' | 'b' | 'c';

const TITLE_MAP: Record<ViewId, any> = {
    a: 'a Window',
    b: 'b Window',
    c: 'c Window'
};

const TITLE_MAP_COM: Record<ViewId, any> = {
    a: <PoductList/>,
    b: <h1>b Window</h1>,
    c: <h1>c Window</h1>
};

/*


class Index extends React.Component {

    public state = {
        laly: {
            direction: 'column',
            first: 'a',
            second: {
                direction: 'row',
                first: 'b',
                second: 'c'
            },
            splitPercentage: 40
        }
    }

    public render() {
        /!*initialValue={{
                   direction: 'column',
                   first: {first: 'c', second: 'a', direction: 'row'},
                   second: 'b'
               }}*!/
        // @ts-ignore
        return (
            <Mosaic<string> key='a'
                            className={'mosaic-blueprint-theme'}
                            renderTile={(id, path) => (
                                <MosaicWindow<ViewId>
                                    path={path}
                                    /!**
                                    * 其他控件将隐藏在工具栏下面的抽屉中
                                    *!/
                                    additionalControls={<div>我是隐藏抽屉</div>}
                                    additionalControlButtonText={'我是显示隐藏抽屉'}
                                    /!**
                                    * 工具栏
                                    * default: [Replace, Split, Expand, Remove]
                                    *!/
                                    toolbarControls={<div>工具栏覆盖</div>}
                                    /!**
                                     * 是否拖动
                                     *!/
                                    draggable={true}
                                    //renderPreview={() => <div>拖动覆盖预览</div>}
                                    //createNode={() => 'new'}
                                    title={TITLE_MAP[id]}>
                                    <div>{TITLE_MAP_COM[id]}</div>
                                </MosaicWindow>
                            )}
                            zeroStateView={
                                <div>
                                    我是默认视图
                                </div>
                            }
                            onChange={(v) => {
                                console.log(JSON.stringify(v))
                            }}
                            initialValue={{
                                direction: 'column',
                                first: 'a',
                                second: {
                                    direction: 'row',
                                    first: 'b',
                                    second: 'c'
                                },
                                splitPercentage: 40
                            }}
            />

        )
    }
}
*/

class Index2 extends React.Component {

    public state = {
        laly: {
            direction: 'column',
            first: 'a',
            second: {
                direction: 'row',
                first: 'b',
                second: 'c'
            },
            splitPercentage: 40
        }
    }

    public render() {
        /*initialValue={{
                   direction: 'column',
                   first: {first: 'c', second: 'a', direction: 'row'},
                   second: 'b'
               }}*/
        // @ts-ignore
        return (
            <Mosaic<any> key='a'
                         className={'mosaic-blueprint-theme'}
                         renderTile={(id, path) => (
                             <MosaicWindow<ViewId>
                                 path={path}
                                 /**
                                 * 其他控件将隐藏在工具栏下面的抽屉中
                                 */
                                 additionalControls={<div>我是隐藏抽屉</div>}
                                 additionalControlButtonText={'我是显示隐藏抽屉'}
                                 /**
                                 * 工具栏
                                 * default: [Replace, Split, Expand, Remove]
                                 */
                                 toolbarControls={<div>工具栏覆盖</div>}
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
                         zeroStateView={
                             <div>
                                 我是默认视图
                             </div>
                         }
                         onChange={(v) => {
                             console.log(JSON.stringify(v))
                             this.setState({
                                 laly: v
                             })
                         }}
                         value={this.state.laly}
            />

        )
    }
}


export default Index2

