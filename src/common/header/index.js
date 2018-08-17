import React from 'react'
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux'
import { actionCreators }  from './store'
import { Link } from 'react-router-dom'
import { HeaderWrapper, 
          Logo, 
          Nav, 
          NavItem, 
          NavSearch, 
          Addition,
          Button,
          SearchWrapper,
          SearchInfo,
          SearchInfoTitle,
          SearchInfoSwitch,
          SearchInfoItem
       } from './style';



class Header extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      rote : 0
    }
  }
  

  getListArea() {
    const { list, focused, page, mouseIn, totalPage, handleMouseEnter, handleMouseLeave, handleChangePage } = this.props
    const jsList = list.toJS();
    const pageList = []

    // 需要注意的是，第一次执行的情况下， pageList 是没有任何数据的， 但是也就会循环， 
    //  所以，造成了 所有Key 都是 underfind
    if(jsList.length){
      for (let i = (page-1)*10; i< page*10;i++){
        if(jsList[i]){
          pageList.push(
            <SearchInfoItem key={jsList[i]}>{jsList[i]}</SearchInfoItem>
          )
        }
        
      }
    }
    

    return (focused || mouseIn) ? (
      <SearchInfo onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <SearchInfoTitle>
          热门搜索
          <SearchInfoSwitch onClick={()=> handleChangePage(page, totalPage, this.spinIcon)}>
            <i ref={(icon)=> this.spinIcon = icon}  data-rote={`${this.state.rote}deg`}  className="iconfont spin">&#xe851;</i>
            换一批
          </SearchInfoSwitch>
        </SearchInfoTitle>
          {
            pageList.map(item=> item)
          }
      </SearchInfo>
    ): null
  }


  render(){
    const { focused, handleInputFocus, handleInputBlur, list } = this.props
    return (
      <HeaderWrapper>
        <Link to='/'>
          <Logo />
        </Link>
        <Nav>
          <NavItem className='left active'>首页</NavItem>
          <NavItem className='left'>下载App</NavItem>
          <NavItem className='right'>登录</NavItem>
          <NavItem className='right'>
            <i  className="iconfont">&#xe636;</i>
          </NavItem>
          <SearchWrapper>
            <CSSTransition
              in={ focused }
              timeout={200}
              classNames="slide"
            >
              <NavSearch 
                className={ focused ? 'focused' : ''}
                onFocus={()=> handleInputFocus(list)}
                onBlur={handleInputBlur}
              ></NavSearch>
              </CSSTransition>
              <i 
                className={ focused ? 'focused iconfont zoom' : 'iconfont zoom'}
              >&#xe633;</i>
              { this.getListArea(focused) }
          </SearchWrapper>
        </Nav>
        <Addition>
          <Button className='writting'>
            <i className="iconfont">&#xe678;</i>
            写文章
          </Button>
          <Button className='reg'>注册</Button>
        </Addition>
      </HeaderWrapper>
    )
  }
  
}


const mapStateToProps = (state) =>{
  const header = state.get('header')
  return {
    focused: header.get('focused'),
    list: header.get('list'),
    page: header.get('page'),
    mouseIn: header.get('mouseIn'),
    totalPage: state.getIn(['header', 'totalPage'])
  }
}

const mapDispathToProps = (dispatch) =>{
  return {
    // 输入框获得焦点事件
    handleInputFocus(list){
      (list.size === 0) && dispatch(actionCreators.getList())
      dispatch(actionCreators.serchFocus())
    },
    // 离开输入框事件
    handleInputBlur(){
      dispatch(actionCreators.searchBlur())
    },
    handleMouseEnter(){
      dispatch(actionCreators.mouseEnter())
    },
    handleMouseLeave(){
      dispatch(actionCreators.mouseLeave())
    },
    handleChangePage(page, totalPage, spin){
      let repage = page < totalPage ? ++page : 1
      const originAngle = spin.style.transform.replace(/[^0-9]/ig, '')
      spin.style.transform = `rotate(${360 + +originAngle}deg)`
      dispatch(actionCreators.changePage(repage))
    }
  }
}


export default connect(mapStateToProps, mapDispathToProps)(Header)