import { Layout, Menu } from 'antd'
import {
  CloudUploadOutlined,
  ProfileOutlined,
  DatabaseOutlined,
  FileSearchOutlined,
  BarChartOutlined
} from '@ant-design/icons'
import { Link, Route, Routes } from 'react-router-dom'
import UploadPage from './pages/UploadPage'
import RawTaskListPage from './pages/RawTaskListPage'
import ExcelReviewPage from './pages/ExcelReviewPage'
import JsonTaskPoolPage from './pages/JsonTaskPoolPage'
import OrderDownloadTaskPage from './pages/OrderDownloadTaskPage'
import DataUsagePage from './pages/DataUsagePage'

const { Header, Sider, Content } = Layout

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark">
        <div style={{ height: 48, margin: 16, background: 'rgba(255,255,255,0.2)' }} />
        <Menu theme="dark" mode="inline">
          <Menu.Item key="upload" icon={<CloudUploadOutlined />}>
            <Link to="/upload">原始数据上传</Link>
          </Menu.Item>
          <Menu.Item key="rawTasks" icon={<ProfileOutlined />}>
            <Link to="/tasks/raw">RPA原始解析任务</Link>
          </Menu.Item>
          <Menu.Item key="jsonTasks" icon={<DatabaseOutlined />}>
            <Link to="/tasks/json">JSON解析任务池</Link>
          </Menu.Item>
          <Menu.Item key="orders" icon={<FileSearchOutlined />}>
            <Link to="/orders/download">商单下载任务</Link>
          </Menu.Item>
          <Menu.Item key="analytics" icon={<BarChartOutlined />}>
            <Link to="/analytics/usage">数据使用分析</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff' }}>OCR识别管理平台</Header>
        <Content style={{ margin: 16 }}>
          <Routes>
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/tasks/raw" element={<RawTaskListPage />} />
            <Route path="/tasks/excel-review/:taskId" element={<ExcelReviewPage />} />
            <Route path="/tasks/json" element={<JsonTaskPoolPage />} />
            <Route path="/orders/download" element={<OrderDownloadTaskPage />} />
            <Route path="/analytics/usage" element={<DataUsagePage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
