<template>
  <pro-table
    ref="table"
    title="列表"
    :request="getList"
    :columns="columns"
    :search="searchConfig"
    :pagination="paginationConfig"
    @selection-change="handleSelectionChange"
  >
    <!-- 工具栏 -->
    <template #toolbar>
      <el-button
        type="primary"
        :icon="Plus"
        @click="add"
      > 新增 </el-button>
      <!-- <el-button
        type="danger"
        :icon="Delete"
        @click="handleDelete()"
      >
        删除
      </el-button> -->
    </template>

    <template #type="scope">
      {{ typeLabel(scope.row) }}
    </template>
    <template #status="scope">
      {{ statusLabel(scope.row) }}
    </template>
    <template #operate="scope">
      <el-button
        size="small"
        type="primary"
        @click="handleEdit(scope.row)"
      >
        编辑
      </el-button>
      <el-button
        size="small"
        type="danger"
        @click="handleDelete(scope.row)"
      >
        删除
      </el-button>
    </template>
  </pro-table>
  <Edit
    :open="open"
    :article-info="articleInfo"
    @on-close="close"
  />
</template>

<script setup lang="ts">
import * as articleApi from '@/api/article'
import { ArticleTypes, ArticleStatus } from './article'
import Edit from './Edit.vue'
import dayjs from 'dayjs'

const columns = ref([
  // { type: 'selection' },
  { label: '序号', type: 'index', width: 54 },
  { label: '标题', prop: 'title', width: 180 },
  { label: '类型', prop: 'type', tdSlot: 'type' },
  { label: '状态', prop: 'flag', tdSlot: 'status' }, // sortable: true,
  { label: '创建者', prop: 'create_user_name' },
  { label: '创建时间', prop: 'create_time' },
  {
    label: '操作',
    width: 180,
    align: 'center',
    tdSlot: 'operate' // 自定义单元格内容的插槽名称
  }
])

const typeLabel = computed(() => (row) => ArticleTypes.find(item => item.value === row.type)?.name)
const statusLabel = computed(() => (row) => ArticleStatus.find(item => item.value === row.flag)?.name)
const open = ref(false)
const articleInfo = ref({})
const table = ref(null)
const selectedItems = ref([])

// 分页配置
const paginationConfig = {
  layout: 'total, prev, pager, next, sizes', // 分页组件显示哪些功能
  pageSize: 10, // 每页条数
  pageSizes: [5, 10, 20, 50],
  style: { textAlign: 'left' }
}
const searchConfig = {
  labelWidth: '60px', // 必须带上单位
  inputWidth: '170px', // 必须带上单位
  fields: [
    {
      type: 'text',
      label: '标题',
      name: 'title',
      defaultValue: ''
    },
    {
      label: '类型',
      name: 'type',
      type: 'select',
      defaultValue: null,
      options: ArticleTypes
    },
    {
      label: '状态',
      name: 'flag',
      type: 'select',
      defaultValue: null,
      options: ArticleStatus
    }
  ]
}

const getList = async (params) => {
  // params是从组件接收的，包含分页和搜索字段。
  const { content } = await articleApi.getArticleList(params)
  const data = content.result.map(item => ({ ...item, create_time: dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss') }))
  // 必须要返回一个对象，包含data数组和total总数
  return {
    data,
    total: +content.totals
  }
}

const add = () => {
  open.value = true
  articleInfo.value = {}
}

const close = (refresh?) => {
  open.value = false
  if (refresh) table.value.refresh()
}

const handleEdit = (row) => {
  open.value = true
  articleInfo.value = row
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    '此操作将永久删除该数据, 是否继续?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    return articleApi.deleteArticle(row.id)
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      table.value.refresh()
    })
    .catch(() => {
      return false
    })
}

// 选择
const handleSelectionChange = (arr) => {
  selectedItems.value = arr
}
</script>

<style scoped>

</style>
