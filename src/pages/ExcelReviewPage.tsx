import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Descriptions, Table, Space, Drawer, Form, Select, DatePicker, Button, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'

const { RangePicker } = DatePicker

interface ExcelRow {
  id: string
  item: string
  amount: number
  date: string
  remark?: string
  shop?: string
  period?: [string, string]
  status?: '待审核' | '通过' | '驳回'
}

function ExcelReviewPage() {
  const { taskId } = useParams()
  const [rows, setRows] = useState<ExcelRow[]>([
    { id: '1', item: '租金', amount: 10000, date: '2024-01-01', status: '待审核' },
    { id: '2', item: '物业费', amount: 2000, date: '2024-01-01', status: '待审核' }
  ])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [form] = Form.useForm()

  const columns: ColumnsType<ExcelRow> = [
    { title: '行号', dataIndex: 'id' },
    { title: '项目', dataIndex: 'item' },
    { title: '金额', dataIndex: 'amount' },
    { title: '日期', dataIndex: 'date' },
    { title: '店铺', dataIndex: 'shop' },
    {
      title: '账期',
      dataIndex: 'period',
      render: value => (value ? `${value[0]} ~ ${value[1]}` : '')
    },
    { title: '状态', dataIndex: 'status' }
  ]

  const handleBatchMark = async () => {
    const values = await form.validateFields()
    const range = values.period as [any, any]
    const period: [string, string] = [
      range[0].format('YYYY-MM-DD'),
      range[1].format('YYYY-MM-DD')
    ]
    const shop = values.shop as string
    const status = values.status as '通过' | '驳回'
    setRows(prev =>
      prev.map(row =>
        selectedRowKeys.includes(row.id)
          ? { ...row, shop, period, status }
          : row
      )
    )
    message.success('批量标注成功')
    setDrawerOpen(false)
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Card title="任务信息">
        <Descriptions column={3}>
          <Descriptions.Item label="任务ID">{taskId}</Descriptions.Item>
          <Descriptions.Item label="商场">商场A</Descriptions.Item>
          <Descriptions.Item label="系统平台">平台A</Descriptions.Item>
          <Descriptions.Item label="原始文件">账单2024-01.pdf</Descriptions.Item>
          <Descriptions.Item label="状态">待审核</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card
        title="EXCEL明细"
        extra={
          <Space>
            <Button
              type="primary"
              disabled={!selectedRowKeys.length}
              onClick={() => setDrawerOpen(true)}
            >
              批量标注店铺和账期
            </Button>
          </Space>
        }
      >
        <Table
          rowKey="id"
          dataSource={rows}
          columns={columns}
          rowSelection={{
            selectedRowKeys,
            onChange: keys => setSelectedRowKeys(keys)
          }}
        />
      </Card>

      <Drawer
        title="批量标注"
        width={360}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        destroyOnClose
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="关联店铺"
            name="shop"
            rules={[{ required: true, message: '请选择店铺' }]}
          >
            <Select placeholder="请选择店铺">
              <Select.Option value="shop001">店铺001</Select.Option>
              <Select.Option value="shop002">店铺002</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="账期"
            name="period"
            rules={[{ required: true, message: '请选择账期' }]}
          >
            <RangePicker />
          </Form.Item>
          <Form.Item
            label="审核结果"
            name="status"
            rules={[{ required: true, message: '请选择审核结果' }]}
          >
            <Select>
              <Select.Option value="通过">通过</Select.Option>
              <Select.Option value="驳回">驳回</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" onClick={handleBatchMark}>
                保存
              </Button>
              <Button onClick={() => setDrawerOpen(false)}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </Space>
  )
}

export default ExcelReviewPage
