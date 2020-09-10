/* eslint-disable no-trailing-spaces */
import Arweave from 'arweave'
import Axios from 'axios'

import { decryptBuffer } from '../util/encrypt'

const arweaveHost = 'https://arweave.net/'

let ar = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
  timeout: 20000,
  logging: false
})

// Configuration

/**
 * Single 单曲信息的标记均为 single-info,
 * Album 专辑信息的标记均为 album-info,
 * Podcast 播客的标记均为 podcast-info,
 * SoundEffect 音效的标记均为 soundeffect-info.
 */
const AUDIO_TYPE = {
  single: 'single-info',
  album: 'album-info',
  podcast: 'podcast-info',
  soundEffect: 'soundeffect-info'
}

const APP_NAME = 'arclight-test'

let arweave = {

  /**
   * Get user address based on key file content input   
   * 根据密钥文件内容获取用户地址
   * @param {String} key      - 使用 keyFileContent，不是原始文件
   */
  getAddress (key) {
    return new Promise((resolve, reject) => {
      ar.wallets.jwkToAddress(key).then((address) => {
        resolve(address)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * Get transaction detail entirely based on given txid   
   * 根据给定的 txid (交易ID) 获取完整的交易明细
   * @param {String} txid     - 交易编号
   */
  getTransactionDetail (txid) {
    return new Promise((resolve, reject) => {
      ar.transactions.get(txid).then(detail => {
        resolve(detail)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * Get the decoded data and buffer to string from the given transaction id   
   * 根据给定的 txid (交易ID) 获取解码的数据并缓冲为字符串
   * @param {String} txid     - 交易编号
   */
  getTransactionDataDecodedString (txid) {
    return new Promise((resolve, reject) => {
      ar.transactions.getData(txid, {decode: true, string: true}).then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * Get user's Arweave Id based on the input wallet address   
   * 根据输入的钱包地址获取用户的 Arweave ID
   * @param {String} address  - 用户的钱包地址
   */
  getIdFromAddress (address) {
    return new Promise((resolve, reject) => {
      /**
       * Use ArQL language to search the user's Arweave ID database
       * 使用 ArQL 语言搜索用户的 Arweave ID 数据库
       */
      ar.arql({
        op: 'and',
        expr1: {
          op: 'equals',
          expr1: 'from',
          expr2: address // User address 用户钱包地址
        },
        expr2: {
          op: 'and',
          expr1: {
            op: 'equals',
            expr1: 'App-Name',
            expr2: 'arweave-id' // Specified the App-Name as arweave-id 将应用程序名称指定为arweave-id
          },
          expr2: {
            op: 'equals',
            expr1: 'Type',
            expr2: 'name'
          }
        }
      }).then(ids => {
        // Init a object to be resolved later
        // 初始化要稍后返回的对象
        const res = {
          type: '',
          data: ''
        }

        // Sepecify the user to be a guest if ids is empty
        // 如果 id 为空，则指定用户为访客 Guest
        if (ids.length === 0) {
          res.type = 'guest'
          res.data = 'Guest'
          // resolve data on finish
          resolve(res)
        }

        // If the user has multiple records, use for go through
        // 如果用户有多个记录，使用 for 循环遍历
        for (let i = 0; i < ids.length; i++) {
          const id = ids[i]

          // Get transaction detial
          // 获取交易明细
          this.getTransactionDetail(id).then(transaction => {
            // Go through for each id to find the tag
            // 遍历每个id来找到标签
            transaction.get('tags').forEach(tag => {
              let key = tag.get('name', { decode: true, string: true })
              let value = tag.get('value', { decode: true, string: true })
              if (key === 'Type') {
                res.type = value
              }
            })

            // Get the encoded data from transaction
            // 从交易中获取编码数据
            this.getTransactionDataDecodedString(id).then(data => {
              res.data = data
              // resolve data on finish
              // 完成时返回数据
              resolve(res)
            })
          })
        }
      })
    })
  },

  /**
   * Get user's Arweave Avatar based on the input wallet address   
   * 根据输入的钱包地址获取用户的 Arweave 头像
   * @param {String} address    - 用户的钱包地址
   */
  getAvatarFromAddress (address) {
    return new Promise((resolve, reject) => {
      ar.arql({
        op: 'and',
        expr1: {
          op: 'equals',
          expr1: 'from',
          expr2: address
        },
        expr2: {
          op: 'or',
          expr1: {
            op: 'equals',
            expr1: 'App-Name',
            expr2: 'arweave-avatar'
          },
          expr2: {
            op: 'equals',
            expr1: 'Type',
            expr2: 'avatar'
          }
        }
      }).then(async ids => {
        if (ids.length === 0) {
          resolve(false)
          return
        }

        let detail = await this.getTransactionDetail(ids[0])
        ar.transactions.getData(detail.id, {decode: true, string: true}).then(data => {
          resolve(data)
        })
      })
    })
  },

  /**
   * Get All Audio Release List
   * 获取所有音频发行列表
   * @param {String} type 音频类型（single, album, podcast, soundEffect）
   * @param {String} style 【可选】筛选歌曲风格（需要注意的是部分音频类型下没有区分歌曲风格）
   */
  getAllAudioList (type, style) {
    return new Promise((resolve, reject) => {
      // 筛选音频类型
      const typeString = AUDIO_TYPE[type]
      if (!typeString) throw new Error(`${type} is the wrong type`)
      // 筛选歌曲风格
      const ordinary = {
        op: 'equals',
        expr1: 'Type',
        expr2: typeString
      }
      let hasTypedSearch = style ? {
        op: 'and', // 使用相等运算符
        expr1: ordinary,
        expr2: {
          op: 'equals',
          expr1: 'Genre',
          expr2: style
        }
      } : ordinary

      ar.arql({
        op: 'and', // 使用 AND 运算符
        expr1: {
          op: 'equals', // 使用 相等 运算符
          expr1: 'App-Name', // 特指 App-Name 标签
          expr2: APP_NAME // 特指值为 arclight-test (测试网)
        },
        expr2: hasTypedSearch
      }).then(ids => {
        if (ids.length === 0) {
          resolve([])
        } else {
          resolve(ids)
        }
      })
    })
  },

  /**
   * Get cover image based on given txid (transaction id)
   * 根据输入的 txid (交易 ID)获取封面
   * @param {String} txid(TransactionId)  - 图片的交易地址
   */
  getCover (txid) {
    return new Promise((resolve, reject) => {
      ar.transactions.getData(txid, {decode: true, string: true}).then(data => {
        resolve(data)
      })
    })
  },

  /**
   * Get audio data based on given txid (transaction id)
   * @param {String} txid(TransactionId)  - 音频的交易地址
   */
  getMusicUrl (txid) {
    return arweaveHost + txid
  },

  /**
   * Get audio data based on given txid (transaction id)
   * @param {String} txid(TransactionId)  - 音频的交易地址
   * @param {Function} callback - 如果需要获取加载进度，请使用这个回调方法
   */
  getMusic (txid, callback) {
    return new Promise((resolve, reject) => {
      // 加载进度回调
      let onDownloadProgress
      if (callback) {
        onDownloadProgress = progressEvent => {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          callback(percentCompleted)
        }
      }
      // get
      Axios.get(arweaveHost + txid, {
        responseType: 'arraybuffer',
        onDownloadProgress
      }).then(res => {
        if (callback) callback()
        const data = decryptBuffer(Buffer.from(res.data))
        resolve({ data: data, type: res.headers['content-type'] })
      })
    })
  },

  getPostFromAddress (address) {
    return new Promise((resolve, reject) => {
      ar.arql({
        op: 'and',
        expr1: {
          op: 'equals',
          expr1: 'from',
          expr2: address
        },
        expr2: {
          op: 'and',
          expr1: {
            op: 'equals',
            expr1: 'App-Name',
            expr2: 'arclight'
          },
          expr2: {
            op: 'equals',
            expr1: 'Type',
            expr2: 'post-info'
          }
        }
      }).then(async ids => {
        if (ids.length === 0) {
          resolve(false)
          return
        }

        let detail = await this.getTransactionDetail(ids[0])
        ar.transactions.getData(detail.id, {decode: true, string: true}).then(data => {
          resolve(data)
        })
      })
    })
  },

  getSearchObject (data) {
    return new Promise((resolve, reject) => {
      ar.arql({
        op: 'equals',
        expr1: {
          op: 'equals',
          expr1: 'from',
          expr2: data
        }
      }).then(async ids => {
        if (ids.length === 0) {
          resolve(false)
          return
        }

        let detail = await this.getTransactionDetail(ids[0])
        ar.transactions.getData(detail.id, {decode: true, string: true}).then(data => {
          resolve(data)
        })
      })
    })
  },

  /**
   * Publish a single based on the given address and key file   
   * 根据给定的钱包地址和密钥文件发布音乐（单曲）
   * @param {String} address              - 用户的钱包地址
   * @param {JSON Object} key             - 使用 keyFileContent，不是原始文件
   * @param {SingleMusic Object} single   - Single 单曲音乐的 data obejct 对象
   */
  postSingleFromAddress (address, key, single) {

  },

  /**
   * Publish an album based on the given address and key file   
   * 根据给定的地址和密钥文件发布专辑
   * @param {*} address                   - 用户的钱包地址
   * @param {*} key                       - 使用 keyFileContent，不是原始文件
   * @param {*} single                    - Album 专辑音乐的 data object 对象
   */
  postAlbumFromAddress (address, key, single) {

  },

  /**
   * Publish a podcast based on the given address and key file   
   * 根据给定的地址和密钥文件发布播客
   * @param {*} address                   - 用户的钱包地址
   * @param {*} key                       - 使用 keyFileContent，不是原始文件
   * @param {*} podcast                   - Podcast 播客的 data object 对象
   */
  postPodcastFromAddress (address, key, podcast) {

  }
}

export default arweave
