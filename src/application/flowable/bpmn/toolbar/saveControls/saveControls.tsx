import * as React from 'react';
import './index.scss'
import {Icon} from 'rsuite';

export const {default: sc} = require('./svg/01.svg');
export const {default: xz} = require('./svg/02.svg');
export const {default: tp} = require('./svg/03.svg');

interface IProps {
    elementRegistry: any
}

/**
 *
 * @author lk
 * @date 2020/6/18 10:21
 * @version 1.0
 */
export default class SaveControls extends React.Component<IProps> {

    private bpmnViewer: any

    componentDidMount() {

    }

    public setViewer(viewer: any) {
        this.bpmnViewer = viewer
    }

    public _onSaveXml = () => {
        const {elementRegistry} = this.props
        const bpmnViewer = this.bpmnViewer
        const filter = elementRegistry.filter((x: any) => {
            return x.type === 'bpmn:Process'
        });
        if (Array.isArray(filter)) {
            const name = filter?.[0]?.businessObject?.name ?? new Date().toString();
            bpmnViewer?.saveXML({format: true}, (err: any, xml: any) => {
                const eleLink = document.createElement('a');
                eleLink.download = `${name}.bpmn20.xml`;
                eleLink.style.display = 'none';
                // 字符内容转变成blob地址
                const blob = new Blob([xml]);
                eleLink.href = URL.createObjectURL(blob);
                // 触发点击
                document.body.appendChild(eleLink);
                eleLink.click();
                // 然后移除
                document.body.removeChild(eleLink);
            });
        }
    }

    public _onSaveSVG = () => {
        const {elementRegistry} = this.props
        const bpmnViewer = this.bpmnViewer
        const filter = elementRegistry.filter((x: any) => {
            return x.type === 'bpmn:Process'
        });
        if (Array.isArray(filter)) {
            const name = filter?.[0]?.businessObject?.name ?? new Date().toString();
            bpmnViewer?.saveSVG({format: true}, (err: any, svg: any) => {
                const eleLink = document.createElement('a');
                eleLink.download = `${name}.svg`;
                eleLink.style.display = 'none';
                // 字符内容转变成blob地址
                const blob = new Blob([svg]);
                eleLink.href = URL.createObjectURL(blob);
                // 触发点击
                document.body.appendChild(eleLink);
                eleLink.click();
                // 然后移除
                document.body.removeChild(eleLink);
            });
        }
    }

    public _onOpen = () => {
        const inputObj: any = document.createElement('input')
        inputObj.setAttribute('id', '_ef');
        inputObj.setAttribute('type', 'file');
        inputObj.setAttribute('style', 'visibility:hidden');
        inputObj.setAttribute('accept', '.xml,.bpmn');
        document.body.appendChild(inputObj);
        inputObj.click();
        inputObj.onchange = (e: any) => {
            const files = e.currentTarget.files[0]
            //新建一个FileReader
            const reader = new FileReader();
            //读取文件
            reader.readAsText(files, 'UTF-8');
            //读取完文件之后会回来这里
            reader.onload = (evt: any) => {
                // 读取文件内容
                const fileString = evt.target.result;
                this.bpmnViewer.importXML(fileString, (error: any) => {
                    document.body.removeChild(inputObj);
                })
            }
        }
    }

    public render() {
        return (
            <>
                <ul>
                    <li onClick={() => {
                        this._onOpen()
                    }}>
                        <Icon size={'lg'} icon={sc}/>
                    </li>
                    <li onClick={() => {
                        this._onSaveXml()
                    }}>
                        <Icon size={'lg'}
                              icon={xz}/>
                    </li>
                    <li onClick={() => {
                        this._onSaveSVG()
                    }}>
                        <Icon size={'lg'}
                              icon={tp}/>
                    </li>
                </ul>
            </>
        );
    }
}
