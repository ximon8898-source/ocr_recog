import { useState } from 'react'
import { Form, Select, Button, DatePicker, Table, Space, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'

const { RangePicker } = DatePicker

interface RawTask {
  id: string
  mall: string
  platform: string
  fileName: string
  uploader: string
  uploadTime: string
  status: '待RPA拉取' | '解析中' | '解析成功' | '解析失败'
}

function RawTaskListPage() {
  const [form] = Form.useForm()
  const [data] = useState<RawTask[]>([
    {
      id: 'TASK001',
      mall: '商场A',
      platform: '平台A',
      fileName: '账单2024-01.pdf',
      uploader: '张三',
      uploadTime: '2024-01-10 12:00:00',
      status: '解析成功'
    }
  ])
  const navigate = useNavigate()

  const handleSearch = () => {
    const values = form.getFieldsValue()
    console.log(values)
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Form layout="inline" form={form}>
        <Form.Item label="商场" name="mall">
          <Select style={{ width: 160 }} allowClear>
            <Select.Option value="mallA">商场A</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="系统平台" name="platform">
          <Select style={{ width: 160 }} allowClear>
            <Select.Option value="platformA">平台A</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="上传时间" name="uploadTime">
          <RangePicker />
        </Form.Item>
        <Form.Item label="状态" name="status">
          <Select style={{ width: 160 }} allowClear>
            <Select.Option value="待RPA拉取">待RPA拉取</Select.Option>
            <Select.Option value="解析中">解析中</Select.Option>
            <Select.Option value="解析成功">解析成功</Select.Option>
            <Select.Option value="解析失败">解析失败</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSearch}>
            查询
          </Button>
        </Form.Item>
      </Form>

      <Table
        rowKey="id"
        dataSource={data}
        columns={[
          { title: '任务ID', dataIndex: 'id' },
          { title: '商场', dataIndex: 'mall' },
          { title: '系统平台', dataIndex: 'platform' },
          { title: '原始文件', dataIndex: 'fileName' },
          { title: '上传人', dataIndex: 'uploader' },
          { title: '上传时间', dataIndex: 'uploadTime' },
          {
            title: '状态',
            dataIndex: 'status',
            render: (v: RawTask['status']) => {
              if (v === '解析成功') return <Tag color="green">{v}</Tag>
              if (v === '解析失败') return <Tag color="red">{v}</Tag>
              return <Tag>{v}</Tag>
            }
          },
          {
            title: '操作',
            render: (_, record) => (
              <Space>
                <Button
                  type="link"
                  onClick={() => navigate(`/tasks/excel-review/${record.id}`)}
                >
                  审核标注
                </Button>
              </Space>
            )
          }
        ]}
      />
    </Space>
  )
}

export default RawTaskListPage
