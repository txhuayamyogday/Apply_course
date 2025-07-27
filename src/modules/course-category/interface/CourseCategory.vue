<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import { CourseCategoryComposable } from '../composible';
import type { IFormStateCategoryEntity } from './category.interface';
import type { IData } from './data.interface';
import type { ICategoryEntity } from '../entity/category.entity';

// Initialize composable
const { fetchAll, deleteItem, updateItem, createItem } = CourseCategoryComposable();

// Define table columns
const columns = [
  {
    title: 'No',
    dataIndex: 'id',
    key: 'no',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Action',
    key: 'action',
  },
];

// Reactive data
const data = reactive<IData>({
  categories: [],
  isloading: false,
});

// Modal states
const openUpdate = ref(false);
const openCreate = ref(false);
const formState = reactive<IFormStateCategoryEntity>({
  id: 0,
  name: '',
});

// Methods
const fetchItems = async () => {
  try {
    data.isloading = true;
    const response = await fetchAll();
    data.categories = response.data;
  } catch (err: unknown) {
    console.error(err);
    message.error('Failed to fetch categories');
  } finally {
    data.isloading = false;
  }
};

const onDelete = async (id: number) => {
  try {
    await deleteItem(id);
    message.success('Category deleted successfully');
    await fetchItems();
  } catch (err: unknown) {
    console.error(err);
    message.error('Failed to delete category');
  } finally {
  }
};

const openUpdateModal = (record: ICategoryEntity) => {
  formState.id = record.id;
  formState.name = record.name;
  openUpdate.value = true;
};

const openCreateModal = () => {
  clearFormState();
  openCreate.value = true;
};

const handleUpdate = async () => {
  try {
    data.isloading = true;
    await updateItem(formState);
    message.success('Category updated successfully');
    openUpdate.value = false;
    await fetchItems();
  } catch (err: unknown) {
    console.error(err);
    message.error('Failed to update category');
  } finally {
    data.isloading = false;
  }
};

const handleCreate = async () => {
  try {
    data.isloading = true;
    await createItem({ name: formState.name }); // Exclude id
    message.success('Category created successfully');
    openCreate.value = false;
    await fetchItems();
    clearFormState();
  } catch (err: unknown) {
    console.error(err);
    message.error('Failed to create category');
  } finally {
    data.isloading = false;
  }
};

const clearFormState = () => {
  formState.id = 0;
  formState.name = '';
};

// Fetch data on mount
onMounted(fetchItems);
</script>

<template>
  <div>
    <div class="create-button-container">
      <a-button type="primary" @click="openCreateModal" :loading="data.isloading">
        Create New Category
      </a-button>
    </div>

    <a-table
      :dataSource="data.categories"
      :columns="columns"
      rowKey="id"
      :loading="data.isloading"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'no'">
          {{ index + 1 }}
        </template>
        <template v-if="column.key === 'action'">
          <a @click="openUpdateModal(record)">Edit</a>
          <a-divider type="vertical" />
          <a-popconfirm title="Are You Sure to delete?" @confirm="onDelete(record.id)">
            <a style="color: red;">Delete</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>

    <!-- Update Modal -->
    <a-modal v-model:open="openUpdate" title="Update Category" @ok="handleUpdate" :confirm-loading="data.isloading">
      <a-form layout="vertical">
        <a-form-item label="Name" :rules="[{ required: true, message: 'Please input category name!' }]">
          <a-input v-model:value="formState.name" />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- Create Modal -->
    <a-modal v-model:open="openCreate" title="Create Category" @ok="handleCreate" :confirm-loading="data.isloading">
      <a-form layout="vertical">
        <a-form-item label="Name" :rules="[{ required: true, message: 'Please input category name!' }]">
          <a-input v-model:value="formState.name" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style lang="scss" scoped>
.create-button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}
</style>