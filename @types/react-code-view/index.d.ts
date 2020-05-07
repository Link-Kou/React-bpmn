import * as React from 'react';

declare module 'react-code-view' {

    export interface CodeViewProperties {
        /**
         * Babel配置参数选项
         */
        babelTransformOptions?: any
        /**
         * 相关组件
         */
        dependencies: any

        /**
         * 自定义工具栏。
         */
        renderToolbar?: () => void

        /**
         * 延迟
         */
        delay?: number
        /**
         * 来源文本
         */
        source?: string
        /**
         * 显示代码
         */
        showCode?: boolean
        /**
         * 主题
         */
        theme?: 'light' | 'dark'

        /**
         * 执行代码
         */
        executeCode?(nextCode: any): void;
    }

    export default class CodeView extends React.Component<CodeViewProperties, any> {
    }
}

