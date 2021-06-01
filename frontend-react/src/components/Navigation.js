import React from 'react';
import _ from 'lodash';
import { withRouter, useLocation, NavLink } from 'react-router-dom';
import { Table, Space, Modal, Form, Input, Button, message, Menu } from 'antd';
import * as transportLayer from '../share/TransportLayer';


const { SubMenu } = Menu;

function Navigation(props) {
  return (
    <Menu mode="horizontal" onClick={props.handleMenuClick} selectedKeys={[props.currentKey]}>
      <Menu.Item key="user" >
        <NavLink to='/'>用户管理</NavLink>
      </Menu.Item>
      <Menu.Item key="position">
        <NavLink to='/position'>职位管理</NavLink>
      </Menu.Item>
      <Menu.Item key="layout">
        <Button onClick={props.layout}>退出登录</Button>
      </Menu.Item>
    </Menu>
  )
}

let hoc = WrappedComponent => {
  return (class EnhancedComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        currentKey: 'user'
      }
    }

    async componentDidMount() {
      let currentKey = this.props.history.location.pathname === '/' ? 'user' : _.replace(this.props.history.location.pathname, '/', '');
      this.setState({ currentKey });
    }

    handleMenuClick = (e) => {
      this.setState({ currentKey: e.key });
    }

    layout = () => {
      localStorage.removeItem('admin-token');
      this.props.history.push('/login');
    }

    render() {
      return <WrappedComponent
        currentKey={this.state.currentKey}
        handleMenuClick={this.handleMenuClick}
        layout={this.layout}
      />
    }

  })
}

export default withRouter(hoc(Navigation));