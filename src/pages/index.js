import React, {Component} from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <div style={{fontSize: '20px', textAlign: 'center', marginTop: '30px', fontWeight: 'normal'}}>
          欢迎登录米饭星后台管理系统
        </div>
      </div>
    )
  }
}

export default Home
