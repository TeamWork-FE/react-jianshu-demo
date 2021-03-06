import  * as constants  from "./constants";
import axios from 'axios';
import { fromJS } from 'immutable'

const { get, post } = axios



// ajax

export const getHomeInfo = () => {
  return (dispatch)=>{
    get('/api/home.json').then((res)=>{
      const result = res.data.data
      const action = changeHomeData(result)
      dispatch(action)
    })
  }
}

export const getMoreList = (page) =>{
  return (dispatch) =>{
    get('/api/homeList.json?page='+ page).then((res)=>{
      const result = res.data.data
      dispatch(addHomeList(result, page + 1))
    })
  }
}

export const toggleTopShow = (show) => ({
  type: constants.TOGGLE_SCROLL_TOP,
  show
})




//  util 

const  changeHomeData = (result) => {
  return {
    type: constants.CHANGE_HOME_DATA,
    topicList: result.topicList,
    articleList: result.articleList,
    recommendList: result.recommendList
  }
}


const addHomeList = (list, nextPage) => ({
  type: constants.ADD_ARTICLE_LIST,
  list: fromJS(list),
  nextPage
})