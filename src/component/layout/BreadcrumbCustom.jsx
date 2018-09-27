import React from 'react';
import {Breadcrumb, Icon} from 'antd';
import {Link} from 'react-router';

class BreadcrumbCustom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.itemRender = this.itemRender.bind(this)
  }

  itemRender(route) {
    return <span>{route.breadcrumbName}</span>
  }

  render() {
    const {routes, params} = this.props
    // console.log(routes.slice(2))
    return (
      <div style={{backgroundColor: '#ececec', height: '36px', lineHeight: '36px', padding: '0 20px'}}>
        <Icon type="home" style={{float: 'left', fontSize: '14px', lineHeight: '36px', marginRight: '6px'}}/>
        {
          routes.slice(2).length > 1
          && <span style={{float: 'left', paddingRight: '8px'}}>
              <Link to="/app/index">
                首页&nbsp;&nbsp;<span style={{color: 'rgba(0,0,0,0.3)'}}>/</span>
              </Link>
            </span>
        }
        <Breadcrumb
          routes={routes.slice(2)}
          params={params}
          style={{float: 'left'}}
          itemRender={this.itemRender}
        />
      </div>
    )
  }
}

export default BreadcrumbCustom;
