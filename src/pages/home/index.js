import React, { PureComponent } from 'react'
import Topic from './components/Topic'
import List from './components/List'
import Recommend from './components/Recommend'
import Writer from './components/Writer'
import { actionCreators } from './store'
import { connect } from 'react-redux';
import { 
  HomeWrapper,
  HomeLeft,
  HomeRight,
  BackTop
} from './style'


class Home extends PureComponent {

  handleScrollTop(){
    window.scrollTo(0, 0)
  }

 

  render(){
    const { showScroll } = this.props
    return (
      <HomeWrapper>
        <HomeLeft>
          <img className="banner-img" alt="" src="//upload.jianshu.io/admin_banners/web_images/4381/3cdf43257e95766122959099cd4b41b495e6adfc.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" />
          <Topic/>
          <List/>
        </HomeLeft>
        <HomeRight>
          <Recommend/>
          <Writer/>
        </HomeRight>
        {
          showScroll ?  <BackTop onClick={ this.handleScrollTop }>顶部</BackTop> : null
        }
        
      </HomeWrapper>
    )
  }
  componentDidMount(){
    this.props.changeHomeData()
    this.bindEvents()
  }

  bindEvents(){
    window.addEventListener('scroll', this.props.changeScrollTopShow)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.props.changeScrollTopShow)
  }

}

const mapState = (state) =>({
  showScroll: state.getIn(['home', 'showScroll'])
})


const mapDispatch = (dispatch) => ({
  changeHomeData(){
    dispatch(actionCreators.getHomeInfo())
  },
  changeScrollTopShow(){
    if(document.documentElement.scrollTop > 200){
      dispatch(actionCreators.toggleTopShow(true))
    }else{
      dispatch(actionCreators.toggleTopShow(false))
    }
  }
})

export default connect(mapState, mapDispatch)(Home)