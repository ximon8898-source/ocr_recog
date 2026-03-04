import { useState } from 'react'
import { Form, Select, DatePicker, Button, Table, Space, Modal } from 'antd'

const { RangePicker } = DatePicker

interface JsonTask {
  id: string
  mall: string
  platform: string
  shop: string
  period: string
  status: '待解析' | '解析中' | '解析成功' | '解析失败'
  createdAt: string
}

function JsonTaskPoolPage() {
  const [form] = Form.useForm()
  const [data] = useState<JsonTask[]>([
    {
      id: 'JSON001',
      mall: '商场A',
      platform: '平台A',
      shop: '店铺001',
      period: '2024-01-01 ~ 2024-01-31',
      status: '解析成功',
      createdAt: '2024-01-15 10:00:00'
    }
  ])
  const [jsonModalOpen, setJsonModalOpen] = useState(false)
  const [currentJson, setCurrentJson] = useState<string>('{}')

  const handleSearch = () => {
    const values = form.getFieldsValue()
    console.log(values)
  }

  return (
    <>
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
        <Form.Item label="店铺" name="shop">
          <Select style={{ width: 160 }} allowClear>
            <Select.Option value="shop001">店铺001</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="账期" name="period">
          <RangePicker />
        </Form.Item>
        <Form.Item label="状态" name="status">
          <Select style={{ width: 160 }} allowClear>
            <Select.Option value="待解析">待解析</Select.Option>
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
        style={{ marginTop: 16 }}
        rowKey="id"
        dataSource={data}
        columns={[
          { title: '任务ID', dataIndex: 'id' },
          { title: '商场', dataIndex: 'mall' },
          { title: '系统平台', dataIndex: 'platform' },
          { title: '店铺', dataIndex: 'shop' },
          { title: '账期', dataIndex: 'period' },
          { title: '状态', dataIndex: 'status' },
          { title: '创建时间', dataIndex: 'createdAt' },
          {
            title: '操作',
            render: (_, record) => (
              <Space>
                <Button
                  type="link"
                  onClick={() => {
                    setCurrentJson(
                      JSON.stringify(
                        { id: record.id, demo: '这里展示后端返回的JSON内容' },
                        null,
                        2
                      )
                    )
                    setJsonModalOpen(true)
                  }}
                >
                  查看JSON
                </Button>
              </Space>
            )
          }
        ]}
      />

      <Modal
        open={jsonModalOpen}
        title="JSON内容"
        width={600}
        footer={null}
        onCancel={() => setJsonModalOpen(false)}
      >
        <pre>{currentJson}</pre>
      </Modal>
    </>
  )
}

export default JsonTaskPoolPage
