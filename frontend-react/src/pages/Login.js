import React from 'react';
import _ from 'lodash';
import { withRouter, useLocation } from 'react-router-dom';
import { Table, Space, Modal, Form, Input, Button, message  } from 'antd';
import * as transportLayer from '../share/TransportLayer';


const { Item } = Form;

function Login(props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>     
        <Form
          name={"editUserModal"}
          onFinish={props.submit}
        >
          <Item
            labelAlign='left'
            name='username'
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}>
            <Input placeholder='请输入用户名' />
          </Item>
          <Item
            labelAlign='left'
            name='password'
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}>
            <Input placeholder='请输入密码' type='password'/>
          </Item>
          <Button type="primary" htmlType="submit" size={'middle'}>
            登录
          </Button>
        </Form>
    </div>
  )
}

let hoc = WrappedComponent => {
  return (class EnhancedComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {

      }
    }

    async componentDidMount() {
      
    }

    submit = async (values) => {
      let result = await transportLayer.signin(values);
      console.log(result);
      if (result.data.ret) {
        message.success('用户登录成功', 2);
        localStorage.setItem('admin-token', result.headers['authorization']);
        this.props.history.push('/');
        return;
      }
      message.error(result.data.data.message);
    }

    

    render() {
      return <WrappedComponent
        submit={this.submit}
      />
    }

  })
}

export default withRouter(hoc(Login));