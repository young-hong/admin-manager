import React from 'react';
import _ from 'lodash';
import { useTranslation, withTranslation } from 'react-i18next';
import { withRouter, useLocation } from 'react-router-dom';
import { Button, Table, Space, Popconfirm, Modal, Form, Input, message } from 'antd';
import { AppContext } from '../Contexts';
import * as transportLayer from '../share/TransportLayer';

const { Column } = Table;
const { Item } = Form;

function Home(props) {
  const { t, i18n } = useTranslation();
  return (
    <div style={{ width: '100%', height: '100%', padding: 30}}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row-reverse'}}>
      </div>
      <div>
        <Button onClick={props.addUser}>添加用户</Button>
      </div>
      <Table dataSource={props.users}>
        <Column
          title='序号'
          width={20}
          render={(e, record, index) => (
            <span>{index + 1}</span>
          )} />
        <Column
          title={'姓名'}
          dataIndex='username'
          width={50}
          key='username'
          render={(user) => (
            <span>{user}</span>
          )} />
        <Column
          title={'操作'}
          key='action'
          width={50}
          render={(text, record) => (
            <Space size="middle">
              <Popconfirm
									title={'确认删除吗'}
									onConfirm={() => { props.delete(record); }}
									okText={'确认'}
									cancelText={'取消'}
								>
									<a>{'删除'}</a>
							</Popconfirm>
            </Space>
          )} />
      </Table>

      <Modal
        centered
        width='800px'
        title='添加用户'
        visible={props.visible}
        destroyOnClose
        footer={false}
        onCancel={props.onCancel}
      >
        <Form
          onFinish={props.submit}
          ref={props.formRef}
        >
          <Item
            labelAlign='left'
            name='username'
            label='用户名'
            //initialValue=''
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
            label='密码'
           // initialValue=' '
            rules={[
              {
                required: true,
                message: '请输入密码!'
              },
            ]}>
            <Input placeholder='请输入密码' type='password'/>
          </Item>
          <Button type="primary" htmlType="submit" size={'middle'}>
            提交
          </Button>
        </Form>
      </Modal>
    </div>
  )
}

let hoc = WrappedComponent => {
  return withTranslation()(class EnhancedComponent extends React.Component {
    get t() { return this.props.t; }
    static contextType = AppContext;
    
    constructor(props) {
      super(props)
      this.state = {
        users: [],
        visible: false
      }
    }

    formRef = React.createRef();

    async componentDidMount() {
      this.me = await this.context;
      //console.log(this.me)
      await this.getUsers();
    }

    getUsers = async () => { 
      let result =  await transportLayer.getUsers();
      if (result.ret) {
        this.setState({ users: result.data });
        return;
      }

      this.setState({ users: [] });

    }

    delete = async (user) => {
      let id = { id : user._id }
      await transportLayer.deleteUser(id);
      await this.getUsers();
    }

    submit = async (target) => {
      let result = await transportLayer.addUser(target);
      if (!result.ret) {
        message.error(result.data.message);
      } else {
        message.success('用户添加成功');
        this.setState({ visible: false });
        await this.getUsers();
      }
    }

    onCancel = () => {
      this.setState({ visible: false });
    }

    addUser = () => {
      
      this.setState({ visible: true });
     // this.formRef.current.resetFields();
    }



    render() {
      return <WrappedComponent
        users={this.state.users}
        visible={this.state.visible}
        delete={(user) => this.delete(user)}
        submit={this.submit}
        onCancel={this.onCancel}
        addUser={this.addUser}
        formRef={this.formRef}
        
      />
    }

  })
}

export default withRouter(hoc(Home));