import React from 'react';
import _ from 'lodash';
import { withRouter, useLocation } from 'react-router-dom';
import { Table,Icon, Space, Modal, Form, Input, Button, message, Popconfirm, Upload } from 'antd';
import moment from 'moment';
import * as transportLayer from '../share/TransportLayer';


const { Column } = Table;
const { Item } = Form;

function Position(props) {
  return (
    <div style={{ width: '100%', height: '100%', padding: 30 }}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row-reverse' }}>
      </div>
      <div>
        <Button onClick={props.addPosition}>添加职位</Button>
      </div>
      <Table dataSource={props.positions}>
        <Column
          title='序号'
          width={20}
          render={(e, record, index) => (
            <span>{index + 1}</span>
          )} />
          <Column
          title={'公司图标'}
          dataIndex='companyLogo'
          width={50}
          key='companyLogo'
          render={(companyLogo) => (
            <img src={companyLogo ? `http://localhost:8000/uploads/${companyLogo}` : ''} width={60} height={50} alt='logo'/>
          )} />
        <Column
          title={'公司名称'}
          dataIndex='companyName'
          width={50}
          key='companyName'
          render={(companyName) => (
            <span>{companyName}</span>
          )} />
        <Column
          title={'职位名称'}
          dataIndex='positionName'
          width={50}
          key='positionName'
          render={(positionName) => (
            <span>{positionName}</span>
          )} />
        <Column
          title={'城市'}
          dataIndex='city'
          width={50}
          key='city'
          render={(city) => (
            <span>{city}</span>
          )} />
        <Column
          title={'职位薪资'}
          dataIndex='salary'
          width={50}
          key='salary'
          render={(salary) => (
            <span>{salary}</span>
          )} />
        <Column
          title={'发布时间'}
          dataIndex='createTime'
          width={50}
          key='createTime'
          render={(createTime) => (
            <span>{moment.unix(createTime).format('YYYY-MM-DD HH:mm')}</span>
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
              <a onClick={() => { props.edit(record) }}>编辑</a>
            </Space>
          )} />
      </Table>

      <Modal
        centered
        width='800px'
        title={props.isEdit ? '编辑职位' : '添加职位'}
        visible={props.visible}
        destroyOnClose
        footer={false}
        onCancel={props.onCancel}
      >
        <Form
          onFinish={props.submit}
        >
          <Upload
            accept=".jpg,.png"
            name='companyLogo'
            maxCount={1}
            onChange={props.uploadChange}
           // headers={{ Authorization: `Bearer ${token}` }}
            action={`http://localhost:8000/api/positions/uploads`}
            fileList={props.fileList}
          >
            <Button>
              <><Icon type="upload" /> 上传图片</>
            </Button>
          </Upload>
          <Item
            labelAlign='left'
            name='id'
            initialValue={props.position && props.position._id ? props.position._id : ''}
            style={{ display: 'none' }}>
            <Input />
          </Item>
          <Item
            labelAlign='left'
            name='companyName'
            label='公司名称'
            initialValue={props.position && props.position.companyName ? props.position.companyName : ''}
            rules={[
              {
                required: true,
                message: '请输入公司名称!',
              },
            ]}>
            <Input placeholder='请输入公司名称' />
          </Item>
          <Item
            labelAlign='left'
            name='positionName'
            label='职位名称'
            initialValue={props.position && props.position.positionName ? props.position.positionName : ''}
            rules={[
              {
                required: true,
                message: '请输入职位名称!',
              },
            ]}>
            <Input placeholder='请输入职位名称' type='text' />
          </Item>
          <Item
            labelAlign='left'
            name='city'
            label='城市'
            initialValue={props.position && props.position.city ? props.position.city : ''}
            rules={[
              {
                required: true,
                message: '请输入城市!',
              },
            ]}>
            <Input placeholder='请输入城市' type='text' />
          </Item>
          <Item
            labelAlign='left'
            name='salary'
            label='薪资'
            initialValue={props.position && props.position.salary ? props.position.salary : ''}
            rules={[
              {
                required: true,
                message: '请输入薪资!',
              },
            ]}>
            <Input placeholder='请输入薪资' type='text' />
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
  return (class EnhancedComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        visible: false,
        positions: [],
        isEdit: false,
        position: null,
        avatar: '',
        avatar_old: '',
        avatar_edit: '',
        // fileList: [{
        //   uid: '-1',
        //   name: 'xxx.png',
        //   url: `/api/v1${next.target.avatar}`,
        //   status: 'done'
        // }]
        fileList: []
      }
    }

    async componentDidMount() {
      await this.getPositions();
    }

    getPositions = async () => {
      let result = await transportLayer.getPositions();
      if (result.ret) {
        this.setState({ positions: result.data });
      }
    }

    addPosition = () => {
      this.setState({ visible: true, isEdit: false, position: null, avatar:'', fileList:[] });
    }

    onCancel = () => {
      this.setState({ visible: false });
    }

    submit = async (values) => {
      const { avatar, avatar_old } = this.state;
      if (values.id) {
        values.companyLogo_old = avatar_old;
        let result = await transportLayer.updatePosition(values);
        if (!result.ret) {
          message.error(result.data.message);
        } else {
          message.success('职位编辑成功');
          this.setState({ visible: false });
          await this.getPositions();
        }
      } else {
        values.avatar = avatar;
        let result = await transportLayer.addPosition(values);
        if (!result.ret) {
          message.error(result.data.message);
        } else {
          message.success('职位添加成功');
          this.setState({ visible: false });
          await this.getPositions();
        }
      }
    }

    delete = async (position) => {
      let id = { id: position._id }
      await transportLayer.deletePosition(id);
      await this.getPositions();
    }

    edit = (position) => {
     let fileList = [{
          uid: position.companyLogo,
          name: position.companyLogo,
          url: `http://localhost:8000/uploads/${position.companyLogo}`,
          status: 'done'
        }]
      this.setState({ isEdit: true, visible: true, position, fileList, avatar_edit: position.companyLogo });
    }

    uploadChange = (info) => {
      const { isEdit, avatar_edit } = this.state;
      if (isEdit) {
        this.setState({ avatar_old: avatar_edit });
      }
      this.setState({ fileList: info.fileList, avatar: _.first(info.fileList) ?   _.first(info.fileList).name : ''});
    }

    render() {
      return <WrappedComponent
        visible={this.state.visible}
        positions={this.state.positions}
        isEdit={this.state.isEdit}
        position={this.state.position}
        fileList={this.state.fileList}
        addPosition={this.addPosition}
        onCancel={this.onCancel}
        submit={this.submit}
        delete={this.delete}
        edit={this.edit}
        uploadChange={this.uploadChange}
      />
    }

  })
}

export default withRouter(hoc(Position));