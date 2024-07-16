import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { List, message } from 'antd';
import { listInterfaceInfoByPageUsingGet } from '@/services/shuangcodeapi-back/interfaceInfoController';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const Index: React.FC = ({}) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTolal] = useState<number>(0);

  const loadData = async (current = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const res = await listInterfaceInfoByPageUsingGet({
        current,
        pageSize,
      });
      setList(res?.data?.records??[]);
      setTolal(res?.data?.total??0);
    } catch (e) {
      message.error('加载失败');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  },[]);
  return (
    <PageContainer title="接口开放平台">
      <List
        className="api-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => {
            const apiLink = `/interface_info/${item.id}`;
            return(
          <List.Item actions={[<a href={apiLink} key = {item.id}>查看</a>]}>
            <List.Item.Meta
              title={<a href={apiLink}>{item.name}</a>}
              description={item.description}
            />
          </List.Item>
        );
        }}
        pagination={{
          showTotal(total:number){
            return '总数' + total;
          },
          pageSize: 10,
          total,
          onChange(page, pageSize) {
            loadData(page, pageSize);
          },
        }}
      />
    </PageContainer>
  );
};

export default Index;
