import { useState } from 'react'
import { Form, Select, DatePicker, Button, Table } from 'antd'

const { RangePicker } = DatePicker

interface UsageRecord {
  id: string
  mall: string
  platform: string
  shop: string
  period: string
  rpaFetchCount: number
  referencedCount: number
}

function DataUsagePage() {
  const [form] = Form.useForm()
  const [data] = useState<UsageRecord[]>([
    {
      id: 'JSON001',
      mall: '商场A',
      platform: '平台A',
      shop: '店铺001',
      period: '2024-01',
      rpaFetchCount: 3,
      referencedCount: 2
    }
  ])

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
          <RangePicker picker="month" />
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
          { title: '数据ID', dataIndex: 'id' },
          { title: '商场', dataIndex: 'mall' },
          { title: '系统平台', dataIndex: 'platform' },
          { title: '店铺', dataIndex: 'shop' },
          { title: '账期', dataIndex: 'period' },
          { title: 'RPA拉取次数', dataIndex: 'rpaFetchCount' },
          { title: '被引用次数', dataIndex: 'referencedCount' }
        ]}
      />
    </>
  )
}

export default DataUsagePage
