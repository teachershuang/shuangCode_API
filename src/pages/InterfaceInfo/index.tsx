import {PageContainer} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {Card, Descriptions, message} from 'antd';
import {getInterfaceInfoByIdUsingGet} from '@/services/shuangcodeapi-back/interfaceInfoController';
import {useParams} from "react-router";

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const Index: React.FC = ({}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const params = useParams();
  const loadData = async (current = 1, pageSize = 10) => {
    setLoading(true);
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    try {
      const res = await getInterfaceInfoByIdUsingGet({
        id: Number(params.id),
      });
      setData(res.data);
    } catch (error: any) {
      message.error('加载失败' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <PageContainer title="查看接口文档">
      <Card>
        {data ? (
          <Descriptions title={data.name}>
            <Descriptions.Item label="接口状态">{data.status}</Descriptions.Item>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头"> {data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间"> {data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间"> {data.createTime}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在哦</>
        )}
      </Card>
    </PageContainer>
  );
};
export default Index;
