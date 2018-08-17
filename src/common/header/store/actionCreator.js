import  * as actionTypes  from './constants'
import { fromJS } from 'immutable'
import axios from 'axios'

export const serchFocus = () => ({
  type: actionTypes.SEARCH_FOCUS
})

export const searchBlur = () => ({
  type: actionTypes.SEARCH_BLUR
})

export const mouseEnter = () => ({
  type: actionTypes.MOUSE_ENTER
})

export const mouseLeave = () => ({
  type: actionTypes.MOUSE_LEAVE
})

export const changePage = (page) => ({
  type: actionTypes.CHANGE_PAGE,
  page: fromJS(page)
})



export const getList = () =>{
  return (dispatch) =>{
    axios.get('/api/headerList.json').then(res=>{
      const data = res.data.data
      dispatch(changeList(data))
    }).catch(()=>{
      console.log('error')
    })
  }
}




// 搜索框的热门信息
const changeList = (data) => ({
  type: actionTypes.CHANGE_LIST,
  data: fromJS(data),
  totalPage: fromJS(Math.ceil(data.length / 10 ))
})
