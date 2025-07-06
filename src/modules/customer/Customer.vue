<template>
    <div class="customer-container">
        <p class="title">Customer Management</p>
    </div>
  <a-table :columns="columns" :data-source="data.customers" :pagination="data.pagination" @change="handleTableChange">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
          Name
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>Edit</a>
          <a-divider type="vertical" />
          <a style="color:red">Delete</a>
        </span>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { SmileOutlined } from '@ant-design/icons-vue';
import { onMounted, reactive } from 'vue';
import apiClient from '../../common/configuration/axios.config';
import type { TablePaginationConfig } from 'ant-design-vue';
import type { ICustomer } from './interface/customer.interface';
const columns = [
  {
    name: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Surname',
    dataIndex: 'surname',
    key: 'surname',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Birth Date',
    key: 'birth_date',
    dataIndex: 'birth_date',
  },
  {
    title: 'Gender',
    key: 'gender',
    dataIndex: 'gender',
  },
  {
    title: 'Email',
    key: 'gender',
    customRender: ({ record }: { record: any }) => record.user?.email || '-',
  },
  {
    title: 'Action',
    key: 'action',
  },
];

const data = reactive<ICustomer>({
  customers: [],
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
  }
})

const handleTableChange = (pagination: TablePaginationConfig) => {
  fetchCustomers(pagination.current ?? 1, pagination.pageSize ?? 10);
};

const fetchCustomers = async (page: number, limit: number) => {
  try {
    const response = await apiClient.get('students', {
      params: {
        page,
        limit,
      },
    });
    data.customers = response.data.data;

    // Set Pagination
    const pagination = response.data.pagination;
    data.pagination = {
      current: pagination.currentPage,
      pageSize: pagination.limit,
      total: pagination.total,
      showSizeChanger: true,
    };
    console.log(data.pagination);
  } catch (err: any) {
    console.log(err)
  }
}

onMounted(async () => {
  await fetchCustomers(data.pagination.current, data.pagination.pageSize);
})
</script>

<style lang="scss" scoped>
.customer-container {
  padding: 10px;
  margin-bottom: 10px;
  .title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }
}
</style>

