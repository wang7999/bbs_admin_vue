<template>
  <el-drawer
    size="100%"
    :title="title"
    :model-value="open"
    :append-to-body="true"
    direction="rtl"
    :before-close="cancel"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="80px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="标题"
            prop="title"
          >
            <el-input
              v-model="formData.title"
              placeholder="请输入标题"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="描述"
            prop="desc"
          >
            <el-input
              v-model="formData.desc"
              placeholder="请输入描述"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="标签"
            prop="tags"
          >
            <el-tag
              v-for="item in tagList"
              :key="item.id"
              class="tag-item"
              :effect="tagEffect(item)"
              round
              @click="changTag(item)"
            >
              {{ item.name }}
            </el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="类型"
            prop="type"
          >
            <el-select
              v-model="formData.type"
              placeholder="类型"
            >
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="内容">
            <md-editor
              v-model="formData.content"
              :on-upload-img="onUploadImg"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="drawerOps">
      <el-button
        type="primary"
        :loading="loading"
        @click="submitForm(formRef)"
      >确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import type { FormInstance } from 'element-plus'
import { ArticleTypes } from './article'
import * as articleApi from '@/api/article'

const baseImgUrl = import.meta.env.DEV ? '/img_url' : ''

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  articleInfo: {
    type: Object,
    default: () => ({})
  }
})
const emit = defineEmits(['on-close'])

const formRef = ref<FormInstance>()
const formData = reactive({
  title: '',
  type: '',
  desc: '',
  content: '',
  tags: []
})

const title = ref('')
const loading = ref(false)
const types = ArticleTypes
const tagList = ref([])

const tagEffect = computed(() => tag => {
  return formData.tags.some(item => tag.id === item) ? 'dark' : 'plain'
})

const rules = {
  title: [{ required: true, message: '标题不能为空', trigger: 'change' }],
  type: [{ required: true, message: '请选择类型', trigger: 'change' }]
}

const cancel = () => {
  emit('on-close')
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      if (!props.articleInfo.id) {
        articleApi.createArticle(formData)
          .then((res) => {
            ElMessage({
              message: res.message,
              type: 'success'
            })
            emit('on-close', true)
          })
          .finally(() => (loading.value = false))
      } else {
        articleApi.updateArticle({ ...formData, id: props.articleInfo.id })
          .then((res) => {
            ElMessage({
              message: res.message,
              type: 'success'
            })
            emit('on-close', true)
          })
          .finally(() => (loading.value = false))
      }
    }
  })
}

const getTagList = async () => {
  const res = await articleApi.getTagList({
    curPage: 1,
    pageSize: 15
  })
  tagList.value = res.content.result
}

const changTag = (tag) => {
  const index = formData.tags.findIndex(item => item === tag.id)
  if (index === -1) {
    formData.tags = [...formData.tags, tag.id]
  } else {
    formData.tags.splice(index, 1)
  }
}

const onUploadImg = async (files: FileList, callback: (urls: string[]) => void) => {
  console.log(files, 'files')

  if (Array.from(files).some((file) => file.size > 1024 * 1024 * 0.5)) {
    ElMessage({
      message: '图片不能大于500K',
      type: 'warning'
    })
    return false
  }
  const res = await Promise.all(
    Array.from(files).map((file) => {
      return new Promise((rev, rej) => {
        const formData = new FormData()
        formData.append('file', file)

        // Upload(formData)
        //   .then((res) => {
        //     ElMessage({
        //       message: res.message,
        //       type: 'success'
        //     })
        //     rev(res)
        //   })
        //   .catch((error) => rej(error))
      })
    })
  )

  callback(res.map((item: any) => baseImgUrl + item.data.path))
}

watch(() => props.articleInfo, (newValue) => {
  formData.title = newValue.title
  formData.desc = newValue.desc
  formData.content = newValue.content
  formData.type = newValue.type
  formData.tags = newValue?.tagList?.map(item => item.id) || []

  title.value = newValue.id ? '编辑文章' : '添加文章'
})

onMounted(() => {
  getTagList()
})

</script>

<style scoped>
.tag-item{
  margin-right: 10px;
  cursor: pointer;
}
</style>
