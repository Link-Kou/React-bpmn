import * as React from 'react';
import {InputPicker, Icon, Pagination} from 'rsuite';


interface IPropsInputPagesPicker {

    /**
     * 回调 改变
     * @param value 改变值
     * @param data 数据
     * @param callbackForm 回调原生改变
     */
    callbackChange?(value: any, data: any, callbackForm: () => void): void

    /**
     * 搜索
     */
    onSearch(value: any, activePage: number, displayLength: number, callbackClose: (total: number) => void): void

    data?: Array<any>

    [x: string]: any
}

/**
 * 分页 输入选择器
 * @author lk
 * @date 2020/4/20 15:55
 * @version 1.0
 */
const HookInputPagesPicker = (props: IPropsInputPagesPicker): any => {
    const [activePage, setActivePage] = React.useState(1);
    const [pages, setPages] = React.useState(1);
    const [loading, setLoading] = React.useState(true);
    const {onChange, data, callbackChange, onSearch} = props

    React.useEffect(() => {
        if (!loading) {
            setLoading(true)
            onSearch?.('', activePage, 10, (total) => {
                setPages(Math.ceil(total / 10));
                setLoading(false)
            })
        }
    }, [activePage])
    let timeSearchKeyword: any = null;
    return (
        <InputPicker {...props as any}
                     onChange={(value, event) => {
                         if (callbackChange) {
                             callbackChange?.(value, data, () => {
                                 onChange?.(value)
                             })
                         } else {
                             onChange?.(value)
                         }
                     }}
                     onOpen={() => {
                         onSearch?.('', 1, 10, (total) => {
                             setPages(Math.ceil(total / 10));
                             setLoading(false)
                         })
                     }}
                     onSearch={(searchKeyword) => {
                         clearTimeout(timeSearchKeyword);
                         timeSearchKeyword = setTimeout(() => {
                             setLoading(true)
                             onSearch?.(searchKeyword, 1, 10, (total) => {
                                 setPages(Math.ceil(total / 10));
                                 setLoading(false)
                             })
                         }, 300)
                     }}
                     renderMenu={menu => {
                         if (loading) {
                             return (
                                 <p style={{padding: 4, color: '#999', textAlign: 'center'}}>
                                     <Icon icon="spinner" spin={true}/> Loading...
                                 </p>
                             )
                         }
                         return (
                             <>
                                 {menu}
                                 <div style={{display: 'flex', justifyContent: 'center'}}>
                                     <Pagination
                                         prev={true}
                                         last={true}
                                         next={true}
                                         first={true}
                                         size="xs"
                                         activePage={activePage}
                                         maxButtons={5}
                                         pages={pages}
                                         onSelect={(eventKey) => {
                                             setActivePage(eventKey)
                                         }}
                                     />
                                 </div>
                             </>
                         );
                     }}
        />
    )
}

export default HookInputPagesPicker
