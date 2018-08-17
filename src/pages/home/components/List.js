import React, { PureComponent } from 'react'
import { ListItem, ListInfo, LoadMore } from '../style'
import { actionCreators } from '../store'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
 
class List extends PureComponent {
  render(){
    const { list, getMoreList, page } = this.props
    return (
        <div>
          {
            list.map((item, index)=>(
              <Link key={index} to='/deatil'>
                <ListItem >
                  <img className="pic" src={item.get('imgUrl')} alt=""/>
                  <ListInfo>
                    <h3>{item.get('title')}</h3>
                    <p>{item.get('desc')}</p>
                  </ListInfo>
                </ListItem>
              </Link>
            ))
          }
          <LoadMore onClick={()=>getMoreList(page)}>更多文字</LoadMore>
        </div>
    )
  }
}
const mapState = (state) =>({
  list: state.getIn(['home', 'articleList']),
  page: state.getIn(['home', 'articlePage'])
})

const mapDispatch = (dispatch) => ({
  getMoreList(page){
    const action = actionCreators.getMoreList(page)
    dispatch(action)
  }
})


export default connect(mapState, mapDispatch)(List)