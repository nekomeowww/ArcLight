<template>
  <div class="img-uplaod">
    <!-- 上传图片 -->
    <FileUpload
      v-if="isShowFileUpload"
      ref="upload"
      v-model="files"
      extensions="gif,jpg,jpeg,png,webp"
      accept="image/png,image/jpeg,image/webp"
      @input-file="inputFile"
      @input-filter="inputFilter"
    >
      <slot name="uploadButton">
        <Button>{{ $t('upload') }}</Button>
      </slot>
    </FileUpload>

    <!-- 编辑图片 modal -->
    <v-dialog
      v-model="modal"
      :append-to-body="appendToBody"
      :visible.sync="modal"
      width="300"
      class="img-upload-modal br10"
    >
      <v-card class="img-upload-card">
        <v-card-title class="headline" style="text-align: center; display: block; margin-top: 10px;">
          <p class="modal-header-title" style="margin-bottom: 0px;">{{ $t('editCover') }}</p>
        </v-card-title>
        <p class="modal-header-subtitle" style="margin-bottom: 10px;">{{ $t('adjustSizeAndPositionOfImage') }}</p>
        <div
          :style="computedStyleContent"
          class="modal-content"
        >
          <!-- 目前都只用了单文件上传, 所以裁剪取得files[0] 如果需要支持多图,请扩展组件 -->
          <img
            v-if="files.length && modal"
            ref="editImage"
            :src="files[0].url"
          >
        </div>
        <v-spacer></v-spacer>
        <v-btn
          color="#E56D9B"
          style="color: white; margin-top:10px; margin-bottom: 20px"
          :loading="modalLoading"
          class="save-button"
          @click.prevent="uploadButton"
        >
          {{ buttonText }}
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
/* eslint-disable vue/custom-event-name-casing */
import VueUploadComponent from 'vue-upload-component'
import Cropper from 'cropperjs'
import Compressor from 'compressorjs'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'ImgUpload',
  components: {
    FileUpload: VueUploadComponent
  },
  props: {
    // 按钮文字
    buttonText: {
      type: String,
      default: function () {
        return this.$t('confirm')
      }
    },
    // 显示上传图片大小 单位 M
    imgSize: {
      type: Number,
      default: 2
    },
    // 是否上传完成
    imgUploadDone: {
      type: Number,
      default: 0,
      required: true
    },
    // 比列
    aspectRatio: {
      type: Number,
      default: 1 / 1
    },
    // 上传类型
    updateType: {
      type: String,
      required: true
    },
    // Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true
    appendToBody: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      // eslint-disable-next-line no-undef
      isShowFileUpload: false,
      files: [], // 文件数据
      modal: false, // modal 框显示和隐藏
      modalLoading: false, // modal button loading
      quality: 0.8 // 压缩品质
    }
  },
  computed: {
    ...mapState(['currentAppId', 'currentTeamId', 'currentTeamAppId', 'userId']),
    computedStyleContent () {
      if (this.updateType === 'artileCover') {
        return {
          width: '240px',
          height: '120px'
        }
      } else {
        return {
          width: '240px',
          height: '240px'
        }
      }
    }
  },
  watch: {
    // 显示modal
    modal (value) {
      if (value) {
        this.modalLoading = false
        this.$nextTick(() => {
          if (!this.$refs.editImage) {
            return
          }
          const cropper = new Cropper(this.$refs.editImage, {
            aspectRatio: this.aspectRatio,
            viewMode: 3,
            dragMode: 'move',
            autoCropArea: 1,
            restore: false,
            modal: false,
            guides: false,
            highlight: false,
            cropBoxMovable: false,
            cropBoxResizable: false,
            toggleDragModeOnDblclick: false
          })
          this.cropper = cropper
        })
      } else if (this.cropper) {
        this.cropper.destroy()
        this.cropper = false
      }
    },
    // 上传完成
    imgUploadDone () {
      this.modal = false
      this.modalLoading = false
    }
  },
  mounted () {
    this.isShowFileUpload = true
  },
  methods: {
    ...mapActions(['setSingleCoverFile', 'setAlbumCoverFile', 'setPodcastCoverFile', 'setSoundEffectCoverFile']),
    /**
     * Pretreatment // 过滤操作可以写在这里
     * @param  Object|undefined   newFile   读写
     * @param  Object|undefined   oldFile   只读
     * @param  Function           prevent   阻止回调
     * @return undefined
     */
    // eslint-disable-next-line consistent-return
    async inputFilter (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // 过滤不是图片后缀的文件
        if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
          this.$message.error({
            duration: 1000,
            message: this.$t('selectImage')
          })
          return prevent()
        }
      }
      // 限定最大字节
      const maxSize = (size) => {
        if (newFile.file.size >= 0 && newFile.file.size > 500 * 500 * size) {
          this.$message.error({
            duration: 2000,
            message: this.$t('imageTooBig')
          })
          prevent()
          return false
        }
        return true
      }
      // 压缩方法
      const compressorFunc = async () => {
        // 如果是 gif 跳过
        // console.log(this.files[0].file);
        if (this.files[0].file.type !== 'image/gif') {
          await new Compressor(newFile.file, {
            quality: this.quality,
            success (file) {
              // eslint-disable-next-line no-param-reassign
              newFile.file = file
              maxSize(this.imgSize)
            },
            error (err) {
              console.log(err)
              this.$message.error({
                duration: 1000,
                message: this.$t('autoCompressImageFail')
              })
            }
          })
        }
      }
      // 图片预览
      const modalImgView = () => {
        if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
          // eslint-disable-next-line no-param-reassign
          newFile.url = ''
          const URL = window.URL || window.webkitURL
          if (URL && URL.createObjectURL) {
            // eslint-disable-next-line no-param-reassign
            newFile.url = URL.createObjectURL(newFile.file)
            //   console.log(this.files);
            this.modal = true // 显示 modal
          }
        }
      }
      const maxSizeResult = await maxSize(10)
      if (!maxSizeResult) return true
      await compressorFunc()
      await modalImgView()
    },
    // 上传图片
    async uploadButton () {
      this.modalLoading = true
      let file = this.files[0].file
      // 如果是gif不作处理
      if (this.files[0].file.type !== 'image/gif') {
        const oldFile = this.files[0]
        const binStr = atob(
          this.cropper
            .getCroppedCanvas()
            .toDataURL(oldFile.type)
            .split(',')[1]
        )
        const arr = new Uint8Array(binStr.length)
        for (let i = 0; i < binStr.length; i++) {
          arr[i] = binStr.charCodeAt(i)
        }
        file = new File([arr], oldFile.name, { type: oldFile.type })
      }
      try {
        const res = { data: { code: 0 } }
        res.data.code = 0
        switch (this.updateType) {
          case 'single':
            this.setSingleCoverFile(file)
            break
          case 'album':
            this.setAlbumCoverFile(file)
            break
          case 'podcast':
            this.setPodcastCoverFile(file)
            break
          case 'soundeffect':
            this.setSoundEffectCoverFile(file)
            break
        }
        if (res.data.code === 0 || res.data.code === 1) {
          this.$emit('done-image-upload', {
            type: this.updateType,
            data: res
          })
        } else {
          this.modalLoading = false
          this.$message.error({
            duration: 1000,
            message: this.$t('imageUploadFail')
          })
        }

        // console.log(file)
      } catch (error) {
        // 捕获错误 未登录提示
        console.log(error)
        this.modalLoading = false
        this.$message({
          showClose: true,
          duration: 1000,
          message: this.$t('imageUploadFail')
        })
      }
    },
    /**
     * Has changed // 上传完的操作写在这里
     * @param  Object|undefined   newFile   只读
     * @param  Object|undefined   oldFile   只读
     * @return undefined
     */
    // eslint-disable-next-line no-unused-vars
    inputFile (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        //
      }
      if (!newFile && oldFile) {
        //
      }
    }
  }
}
</script>

<style lang="less" src="./index.less">
// 覆盖图像上传modal样式 无法使用scoped
</style>

<style lang="less">
.img-uplaod .file-uploads .file-uploads-html4 input, .file-uploads.file-uploads-html5 label {
  cursor: pointer;
}
.img-uplaod .file-uploads {
  width: 100%;
  height: 100%;
}

.img-upload-card {
  background-color: white;
  align-items: center !important;
  justify-content: center !important;
  display: flex !important;
  flex-direction: column;
}

/deep/ .v-card__title {
  display: block;
}

/deep/ .modal-header-title {
  margin-bottom: 0px !important;
}
</style>
