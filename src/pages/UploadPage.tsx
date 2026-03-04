import { useState } from 'react'
import { Form, Select, Input, Button, Upload, Table, Space, message } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import { InboxOutlined } from '@ant-design/icons'

const { Dragger } = Upload

interface UploadRecord {
  uid: string
  name: string
  mall: string
  platform: string
  status: 'uploading' | 'success' | 'error'
  error?: string
}

function UploadPage() {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [records, setRecords] = useState<UploadRecord[]>([])

  const handleSubmit = async () => {
    const values = await form.validateFields()
    if (!fileList.length) {
      message.warning('请先选择要上传的文件')
      return
    }
    const mall = values.mall as string
    const platform = values.platform as string
    const newRecords: UploadRecord[] = fileList.map(f => ({
      uid: f.uid,
      name: f.name,
      mall,
      platform,
      status: 'success'
    }))
    setRecords(prev => [...prev, ...newRecords])
    message.success('模拟上传成功，后端对接时在此发起请求')
    setFileList([])
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Form layout="inline" form={form}>
        <Form.Item
          label="商场"
          name="mall"
          rules={[{ required: true, message: '请选择商场' }]}
        >
          <Select style={{ width: 200 }} placeholder="请选择商场">
            <Select.Option value="mallA">商场A</Select.Option>
            <Select.Option value="mallB">商场B</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="系统平台"
          name="platform"
          rules={[{ required: true, message: '请选择系统平台' }]}
        >
          <Select style={{ width: 200 }} placeholder="请选择系统平台">
            <Select.Option value="platformA">平台A</Select.Option>
            <Select.Option value="platformB">平台B</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="批次名称" name="batchName">
          <Input placeholder="可选" style={{ width: 200 }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            提交上传
          </Button>
        </Form.Item>
      </Form>

      <Dragger
        multiple
        fileList={fileList}
        beforeUpload={() => false}
        onChange={info => setFileList(info.fileList)}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽文件到此上传</p>
        <p className="ant-upload-hint">支持多文件上传</p>
      </Dragger>

      <Table
        rowKey="uid"
        dataSource={records}
        columns={[
          { title: '文件名', dataIndex: 'name' },
          { title: '商场', dataIndex: 'mall' },
          { title: '系统平台', dataIndex: 'platform' },
          { title: '状态', dataIndex: 'status' },
          { title: '错误信息', dataIndex: 'error' }
        ]}
      />
    </Space>
  )
}

export default UploadPage
