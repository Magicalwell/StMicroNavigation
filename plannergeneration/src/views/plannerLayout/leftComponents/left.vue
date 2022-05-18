<template>
  <div class="clearfix">
    <a-upload
      v-model:file-list="fileList"
      list-type="picture-card"
      @preview="handlePreview"
      :before-upload="uploadSync"
    >
      <div>
        <plus-outlined />
        <div style="margin-top: 8px">上传图片</div>
      </div>
    </a-upload>
    <a-modal
      :visible="previewVisible"
      :title="previewTitle"
      @cancel="handleCancel"
    >
      <template #footer>
        <a-button key="back">编辑</a-button>
        <a-button key="submit" type="primary" @click="addImg"
          >添加到画布</a-button
        >
      </template>
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import type { UploadProps } from 'ant-design-vue'

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export default defineComponent({
  components: {
    PlusOutlined
  },
  setup() {
    const store = useStore()
    const previewVisible = ref(false)
    const previewImage = ref('')
    const previewTitle = ref('')
    const fileList = ref<UploadProps['fileList']>([
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      },
      {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      },
      {
        uid: '-3',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      },
      {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }
    ])

    const handleCancel = () => {
      previewVisible.value = false
      previewTitle.value = ''
      store.commit('plannerVuex/resetImgFlag')
    }
    const uploadSync: UploadProps['beforeUpload'] = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          resolve(reader.result as string)
        }
      })
    }
    const handlePreview = async (file: UploadProps['fileList'][number]) => {
      store.commit('plannerVuex/changeImgFlag', file.preview)
      console.log(store.state.plannerVuex)

      // 因为目前没有后台接口，暂时使用本地存储，等后续构建一个图床应用
      if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string
      }
      previewImage.value = file.url || file.preview
      previewVisible.value = true
      previewTitle.value =
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    }
    const addImg = () => {
      store.commit('plannerVuex/changeImgFlag')
    }
    return {
      previewVisible,
      previewImage,
      fileList,
      handleCancel,
      handlePreview,
      previewTitle,
      uploadSync,
      addImg
    }
  }
})
</script>
<style>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
