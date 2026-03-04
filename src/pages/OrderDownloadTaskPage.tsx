import { useState } from 'react'
import { Form, Select, DatePicker, Button, Table, Space, Tag } from 'antd'

const { RangePicker } = DatePicker

interface OrderDownloadTask {
  id: string
  mall: string
  platform: string
  shop: string
  period: string
  status: '待处理' | '处理中' | '完成' | '失败'
  createdAt: string
  finishedAt?: string
}

function OrderDownloadTaskPage() {
  const [form] = Form.useForm()
  const [data, setData] = useState<OrderDownloadTask[]>([
    {
      id: 'ORDER001',
      mall: '商场A',
      platform: '平台A',
      shop: '店铺001',
      period: '2024-01',
      status: '完成',
      createdAt: '2024-01-20 09:00:00',
      finishedAt: '2024-01-20 09:05:00'
    }
  ])

  const handleCreate = async () => {
    const values = await form.validateFields()
    const periodValue = values.period as moment.Moment
    const period = periodValue.format('YYYY-MM')
    const newTask: OrderDownloadTask = {
      id: `ORDER${(data.length + 1).toString().padStart(3, '0')}`,
      mall: values.mall as string,
      platform: values.platform as string,
      shop: values.shop as string,
      period,
      status: '待处理',
      createdAt: new Date().toISOString()
    }
    setData(prev => [newTask, ...prev])
  }

  return (
    <>
      <Form layout="inline" form={form}>
        <Form.Item
          label="商场"
          name="mall"
          rules={[{ required: true, message: '请选择商场' }]}
        >
          <Select style={{ width: 160 }}>
            <Select.Option value="mallA">商场A</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="系统平台"
          name="platform"
          rules={[{ required: true, message: '请选择平台' }]}
        >
          <Select style={{ width: 160 }}>
            <Select.Option value="platformA">平台A</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="店铺"
          name="shop"
          rules={[{ required: true, message: '请选择店铺' }]}
        >
          <Select style={{ width: 160 }}>
            <Select.Option value="shop001">店铺001</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="账期"
          name="period"
          rules={[{ required: true, message: '请选择账期' }]}
        >
          <DatePicker picker="month" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleCreate}>
            创建商单下载任务
          </Button>
        </Form.Item>
      </Form>

      <Table
        style={{ marginTop: 16 }}
        rowKey="id"
        dataSource={data}
        columns={[
          { title: '任务ID', dataIndex: 'id' },
          { title: '商场', dataIndex: 'mall' },
          { title: '系统平台', dataIndex: 'platform' },
          { title: '店铺', dataIndex: 'shop' },
          { title: '账期', dataIndex: 'period' },
          {
            title: '状态',
            dataIndex: 'status',
            render: (v: OrderDownloadTask['status']) => {
              if (v === '完成') return <Tag color="green">{v}</Tag>
              if (v === '失败') return <Tag color="red">{v}</Tag>
              return <Tag>{v}</Tag>
            }
          },
          { title: '创建时间', dataIndex: 'createdAt' },
          { title: '完成时间', dataIndex: 'finishedAt' },
          {
            title: '操作',
            render: (_, record) => (
              <Space>
                <Button type="link">查看结果</Button>
                {record.status === '失败' && <Button type="link">重试</Button>}
              </Space>
            )
          }
        ]}
      />
    </>
  )
}

export default OrderDownloadTaskPage
