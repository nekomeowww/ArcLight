import Vue from 'vue'
import Vuex from 'vuex'
import Arweave from 'arweave'

import { encryptBuffer } from '../util/encrypt'

import API from '../api/api'

Vue.use(Vuex)

let ar = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
  timeout: 40000,
  logging: false
})

export default new Vuex.Store({
  modules: {
  },
  state: {
    isLoggedIn: false,
    keyFile: '',
    keyFileRaw: '',
    keyFileName: '',
    keyFileContent: '',
    wallet: '',
    username: '',
    userType: '',
    userAvatar: '',
    userIntroduction: '',
    isMe: false,
    userPage: {
      avatar: 'loading'
    },
    userPageLoading: true,
    singleCoverFile: '',
    singleCoverRaw: '',
    singleCoverId: '',
    singleCoverLink: '',
    singleCoverType: '',
    albumCoverFile: '',
    albumCoverRaw: '',
    albumCoverType: '',
    albumCoverId: '',
    albumCoverLink: '',
    albumUploadComplete: false,
    albumInfo: '',
    albumObj: '',
    podcastCoverFile: '',
    podcastCoverRaw: '',
    podcastCoverId: '',
    podcastCoverLink: '',
    podcastCoverType: '',
    podcastMusicRaw: '',
    podcastMusicFile: '',
    podcastMusicType: '',
    podcastUploadComplete: false,
    podcastInfo: '',
    podcastObj: '',
    soundEffectCoverFile: '',
    soundEffectCoverRaw: '',
    soundEffectCoverId: '',
    soundEffectCoverLink: '',
    soundEffectCoverType: '',
    soundEffectMusicRaw: '',
    soundEffectMusicFile: '',
    soundEffectMusicType: '',
    soundEffectUploadComplete: false,
    soundEffectInfo: '',
    soundEffectObj: '',
    uploadCoverPct: 0,
    uploadMusicNumber: 0,
    uploadMusicPct: 0,
    singleMuiscFile: '',
    singleMuiscRaw: '',
    singleMusicId: '',
    singleMusicLink: '',
    singleMusicType: '',
    singleUploadComplete: false,
    singleLink: '',
    singleInfo: '',
    singleObj: ''
  },
  mutations: {
    setIsLoggedIn (state, status) {
      state.isLoggedIn = status
    },
    setKeyFile (state, file) {
      state.keyFile = file
    },
    setKeyFileRaw (state, raw) {
      state.keyFileRaw = raw
    },
    setKeyFileName (state, name) {
      state.keyFileName = name
    },
    setKeyFileContent (state, content) {
      state.keyFileContent = content
    },
    setWallet (state, address) {
      state.wallet = address
    },
    setUsername (state, username) {
      state.username = username
    },
    setUserType (state, type) {
      state.userType = type
    },
    setUserAvatar (state, avatar) {
      state.userAvatar = avatar
    },
    setUserIntroduction (state, intro) {
      state.userIntroduction = intro
    },
    setIsMe (state, status) {
      state.isMe = status
    },
    setUserPage (state, data) {
      state.userPage = data
    },
    setUserPageLoading (state, status) {
      state.userPageLoading = status
    },
    setSingleCoverFile (state, file) {
      state.singleCoverFile = file
    },
    setSingleCoverRaw (state, raw) {
      state.singleCoverRaw = raw
    },
    setSingleCoverId (state, id) {
      state.singleCoverId = id
    },
    setSingleCoverLink (state, link) {
      state.singleCoverLink = link
    },
    setSingleCoverType (state, type) {
      state.singleCoverType = type
    },
    setAlbumCoverFile (state, file) {
      state.albumCoverFile = file
    },
    setAlbumCoverRaw (state, raw) {
      state.albumCoverRaw = raw
    },
    setAlbumCoverType (state, type) {
      state.albumCoverType = type
    },
    setAlbumCoverId (state, id) {
      state.albumCoverId = id
    },
    setAlbumCoverLink (state, link) {
      state.albumCoverLink = link
    },
    setAlbumUploadComplete (state, status) {
      state.albumUploadComplete = status
    },
    setAlbumInfo (state, info) {
      state.albumInfo = info
    },
    setAlbumObj (state, obj) {
      state.albumObj = obj
    },
    setPodcastCoverFile (state, file) {
      state.podcastCoverFile = file
    },
    setPodcastCoverRaw (state, raw) {
      state.podcastCoverRaw = raw
    },
    setPodcastCoverId (state, id) {
      state.podcastCoverId = id
    },
    setPodcastCoverLink (state, link) {
      state.podcastCoverLink = link
    },
    setPodcastCoverType (state, type) {
      state.podcastCoverType = type
    },
    setPodcastMusicRaw (state, raw) {
      state.podcastMusicRaw = raw
    },
    setPodcastMusicFile (state, file) {
      state.podcastMusicFile = file
    },
    setPodcastMusicType (state, type) {
      state.podcastMusicType = type
    },
    setPodcastUploadComplete (state, status) {
      state.podcastUploadComplete = status
    },
    setPodcastInfo (state, info) {
      state.podcastInfo = info
    },
    setPodcastObj (state, obj) {
      state.podcastObj = obj
    },
    setSoundEffectCoverFile (state, file) {
      state.soundEffectCoverFile = file
    },
    setSoundEffectCoverRaw (state, raw) {
      state.soundEffectCoverRaw = raw
    },
    setSoundEffectCoverId (state, id) {
      state.soundEffectCoverId = id
    },
    setSoundEffectCoverLink (state, link) {
      state.soundEffectCoverLink = link
    },
    setSoundEffectCoverType (state, type) {
      state.soundEffectCoverType = type
    },
    setSoundEffectMusicRaw (state, raw) {
      state.soundEffectMusicRaw = raw
    },
    setSoundEffectMusicFile (state, file) {
      state.soundEffectMusicFile = file
    },
    setSoundEffectMusicType (state, type) {
      state.soundEffectMusicType = type
    },
    setSoundEffectUploadComplete (state, status) {
      state.soundEffectUploadComplete = status
    },
    setSoundEffectInfo (state, info) {
      state.soundEffectInfo = info
    },
    setSoundEffectObj (state, obj) {
      state.soundEffectObj = obj
    },
    setUploadCoverPct (state, pct) {
      state.uploadCoverPct = pct
    },
    setUploadMusicNumber (state, number) {
      state.uploadMusicNumber = number
    },
    setUploadMusicPct (state, pct) {
      state.uploadMusicPct = pct
    },
    setSingleMusicFile (state, file) {
      state.singleMuiscFile = file
    },
    setSingleMusicRaw (state, raw) {
      state.singleMuiscRaw = raw
    },
    setSingleMusicId (state, id) {
      state.singleMusicId = id
    },
    setSingleMusicLink (state, link) {
      state.singleMusicLink = link
    },
    setSingleMusicType (state, type) {
      state.singleMusicType = type
    },
    setSingleUploadComplete (state, status) {
      state.singleUploadComplete = status
    },
    setSingleLink (state, link) {
      state.singleLink = link
    },
    setSingleInfo (state, info) {
      state.singleInfo = info
    },
    setSingleObj (state, obj) {
      state.singleObj = obj
    }
  },
  getters: {
  },
  actions: {
    async setKey ({ commit }, data) {
      commit('setKeyFile', data.file)
      commit('setKeyFileRaw', data.raw)
      commit('setKeyFileName', data.name)
      commit('setKeyFileContent', data.content)

      API.arweave.getAddress(data.content).then(res => {
        commit('setWallet', res)
        API.arweave.getIdFromAddress(res).then(res2 => {
          commit('setUsername', res2.data)
          commit('setUserType', res2.type)
          commit('setIsLoggedIn', true)
          if (res2.type !== 'guest') {
            API.arweave.getAvatarFromAddress(res).then(data => {
              if (data) {
                commit('setUserAvatar', data)
              }
            })
          }
        })
      })
    },
    logout ({ commit }) {
      commit('setUsername', '')
      commit('setUserAvatar', '')
      commit('setIsLoggedIn', false)
    },
    setIsMe ({ commit }, status) {
      commit('setIsMe', status)
    },
    async setUserPage ({ commit }, data) {
      let userPage = {
        nickname: '',
        avatar: '',
        location: '',
        introduction: '',
        website: '',
        neteaseId: '',
        soundcloudId: '',
        bandcampId: '',
        type: ''
      }

      const location = await API.arweave.getLocationFromAddress(data.wallet)
      userPage.location = location
      const website = await API.arweave.getWebsiteFromAddress(data.wallet)
      userPage.website = website
      const introduction = await API.arweave.getIntroFromAddress(data.wallet)
      userPage.introduction = introduction
      const neteaseId = await API.arweave.getNeteaseIdFromAddress(data.wallet)
      userPage.neteaseId = neteaseId
      const soundcloudId = await API.arweave.getSoundCloudIdFromAddress(data.wallet)
      userPage.soundcloudId = soundcloudId
      const bandcampId = await API.arweave.getBandCampFromAddress(data.wallet)
      userPage.bandcampId = bandcampId
      const user = await API.arweave.getIdFromAddress(data.wallet)
      userPage.nickname = user.data
      userPage.type = user.type
      if (user.type !== 'guest') {
        const avatar = await API.arweave.getAvatarFromAddress(data.wallet)
        if (avatar) {
          userPage.avatar = avatar
          commit('setUserPage', userPage)
          commit('setUserPageLoading', false)
        }
      }
    },
    setSingleCoverFile ({ commit }, file) {
      commit('setSingleCoverFile', file)
    },
    setAlbumCoverFile ({ commit }, file) {
      commit('setAlbumCoverFile', file)
    },
    setPodcastCoverFile ({ commit }, file) {
      commit('setPodcastCoverFile', file)
    },
    setSoundEffectCoverFile ({ commit }, file) {
      commit('setSoundEffectCoverFile', file)
    },
    reviewSingle ({ commit }, data) {
      commit('setSingleCoverRaw', data.img.data)
      commit('setSingleCoverType', data.img.type)
      commit('setSingleMusicRaw', data.music.data)
      commit('setSingleMusicFile', data.music.read)
      commit('setSingleMusicType', data.music.type)
      commit('setSingleInfo', data.single)
      commit('setSingleObj', data)
    },
    reviewAlbum ({ commit }, data) {
      commit('setAlbumCoverRaw', data.img.data)
      commit('setAlbumCoverType', data.img.type)
      commit('setAlbumInfo', data.album)
      commit('setAlbumObj', data)
    },
    reviewPodcast ({ commit }, data) {
      console.log(data)
      commit('setPodcastCoverRaw', data.img.data)
      commit('setPodcastCoverType', data.img.type)
      commit('setPodcastMusicRaw', data.music.data)
      commit('setPodcastMusicFile', data.music.read)
      commit('setPodcastMusicType', data.music.type)
      commit('setPodcastInfo', data.podcast)
      commit('setPodcastObj', data)
    },
    reviewSoundEffect ({ commit }, data) {
      commit('setSoundEffectCoverRaw', data.img.data)
      commit('setSoundEffectCoverType', data.img.type)
      commit('setSoundEffectMusicRaw', data.music.data)
      commit('setSoundEffectMusicFile', data.music.read)
      commit('setSoundEffectMusicType', data.music.type)
      commit('setSoundEffectInfo', data.soundeffect)
      commit('setSoundEffectObj', data)
    },
    async uploadSingle ({ commit }, data) {
      commit('setSingleUploadComplete', false)
      commit('setUploadCoverPct', 0)
      commit('setUploadMusicPct', 0)

      let imgTransaction = ''
      let musicTransaction = ''
      let singleTransaction = ''
      let postInfoTransaction = ''

      // User info
      const address = await API.arweave.getAddress(data.key)
      const user = await API.arweave.getIdFromAddress(address)

      // Image Upload
      imgTransaction = await ar.createTransaction({ data: data.img.data }, data.key).catch(err => console.log('Image Transaction Created Failed: ', err))

      // // Add tag 添加标签
      imgTransaction.addTag('Content-Type', data.img.type)
      imgTransaction.addTag('App-Name', 'arclight-test')
      imgTransaction.addTag('Unix-Time', Date.now())
      imgTransaction.addTag('Type', 'single-cover')
      imgTransaction.addTag('Author-Address', address)
      imgTransaction.addTag('Author-Username', user.data)

      await ar.transactions.sign(imgTransaction, data.key)
      let imgUploader = await ar.transactions.getUploader(imgTransaction)

      while (!imgUploader.isComplete) {
        await imgUploader.uploadChunk()
        commit('setUploadCoverPct', imgUploader.pctComplete)
        console.log(`${imgUploader.pctComplete}% complete, ${imgUploader.uploadedChunks}/${imgUploader.totalChunks}`)
      }

      commit('setSingleCoverId', imgTransaction.id)
      commit('setSingleCoverLink', 'https://arweave.net/' + imgTransaction.id)
      console.log(imgTransaction.id)

      const imgRes = await ar.transactions.post(imgTransaction)
      console.log(imgTransaction.id + ': ', imgRes)

      // Upload Music
      const musicReady = encryptBuffer(Buffer.from(data.music.data.music))
      musicTransaction = await ar.createTransaction({ data: musicReady }, data.key).catch(err => console.log('Music Transaction Created Failed: ', err))

      // Add tag 添加标签
      musicTransaction.addTag('Content-Type', data.music.type)
      musicTransaction.addTag('App-Name', 'arclight-test')
      musicTransaction.addTag('Unix-Time', Date.now())
      musicTransaction.addTag('Type', 'single-music')
      musicTransaction.addTag('Author-Address', address)
      musicTransaction.addTag('Author-Username', user.data)

      await ar.transactions.sign(musicTransaction, data.key)
      let musicUploader = await ar.transactions.getUploader(musicTransaction)

      while (!musicUploader.isComplete) {
        await musicUploader.uploadChunk()
        commit('setUploadMusicPct', musicUploader.pctComplete)
        console.log(`${musicUploader.pctComplete}% complete, ${musicUploader.uploadedChunks}/${musicUploader.totalChunks}`)
      }

      commit('setSingleMusicId', musicTransaction.id)
      commit('setSingleMusicLink', 'https://arweave.net/' + musicTransaction.id)
      console.log(musicTransaction.id)

      const musicRes = await ar.transactions.post(musicTransaction)
      console.log(musicTransaction.id + ': ', musicRes)

      // Create single info
      const singleInfo = {
        title: data.single.title,
        desp: data.single.desp,
        genre: data.single.genre,
        price: data.single.price,
        duration: data.single.duration,
        cover: imgTransaction.id,
        music: musicTransaction.id
      }

      console.log(singleInfo)

      singleTransaction = await ar.createTransaction({ data: JSON.stringify(singleInfo) }, data.key).catch(err => console.log('Single Transaction Created Failed: ', err))

      singleTransaction.addTag('App-Name', 'arclight-test')
      singleTransaction.addTag('Unix-Time', Date.now())
      singleTransaction.addTag('Type', 'single-info')
      singleTransaction.addTag('Title', data.single.title)
      singleTransaction.addTag('Genre', data.single.genre)
      singleTransaction.addTag('Price', data.single.price)
      singleTransaction.addTag('Author-Address', address)
      singleTransaction.addTag('Author-Username', user.data)

      await ar.transactions.sign(singleTransaction, data.key)
      let singleUploader = await ar.transactions.getUploader(singleTransaction)

      while (!singleUploader.isComplete) {
        await singleUploader.uploadChunk()
        console.log(`${singleUploader.pctComplete}% complete, ${singleUploader.uploadedChunks}/${singleUploader.totalChunks}`)
      }

      const singleRes = await ar.transactions.post(singleTransaction)
      console.log(singleTransaction.id + ': ', singleRes)

      // Create post info
      let postInfo = await API.arweave.getPostFromAddress(address)
      if (postInfo) {
        postInfo = JSON.parse(postInfo)
      } else {
        postInfo = []
      }

      postInfo.push({ 'single': singleTransaction.id, 'timestamp': Date.now() })

      postInfoTransaction = await ar.createTransaction({ data: JSON.stringify(postInfo) }, data.key).catch(err => console.log('Post Info Transaction Created Failed: ', err))

      postInfoTransaction.addTag('App-Name', 'arclight-test')
      postInfoTransaction.addTag('Unix-Time', Date.now())
      postInfoTransaction.addTag('Type', 'post-info')
      postInfoTransaction.addTag('Author-Address', address)
      postInfoTransaction.addTag('Author-Username', user.data)

      await ar.transactions.sign(postInfoTransaction, data.key)
      let postInfoUploader = await ar.transactions.getUploader(postInfoTransaction)

      while (!postInfoUploader.isComplete) {
        await postInfoUploader.uploadChunk()
        console.log(`${postInfoUploader.pctComplete}% complete, ${postInfoUploader.uploadedChunks}/${postInfoUploader.totalChunks}`)
      }

      const postInfoRes = await ar.transactions.post(postInfoTransaction)
      console.log(postInfoTransaction.id + ': ', postInfoRes)

      commit('setSingleLink', singleTransaction.id)
      commit('setSingleUploadComplete', true)
    },
    async uploadAlbum ({ commit }, data) {
      commit('setAlbumUploadComplete', false)
      commit('setUploadCoverPct', 0)
      commit('setUploadMusicPct', 0)
      commit('setUploadMusicNumber', 0)
      let imgTransaction = ''
      let musicTransaction = ''
      let albumTransaction = ''
      let postInfoTransaction = ''

      // User info
      const address = await API.arweave.getAddress(data.key)
      const user = await API.arweave.getIdFromAddress(address)

      // Image Upload
      imgTransaction = await ar.createTransaction({ data: data.img.data }, data.key).catch(err => console.log('Image Transaction Created Failed: ', err))

      // // Add tag 添加标签
      imgTransaction.addTag('Content-Type', data.img.type)
      imgTransaction.addTag('App-Name', 'arclight-test')
      imgTransaction.addTag('Unix-Time', Date.now())
      imgTransaction.addTag('Type', 'album-cover')
      imgTransaction.addTag('Author-Address', address)
      imgTransaction.addTag('Author-Username', user.data)

      await ar.transactions.sign(imgTransaction, data.key)
      let imgUploader = await ar.transactions.getUploader(imgTransaction)

      while (!imgUploader.isComplete) {
        await imgUploader.uploadChunk()
        commit('setUploadCoverPct', imgUploader.pctComplete)
        console.log(`${imgUploader.pctComplete}% complete, ${imgUploader.uploadedChunks}/${imgUploader.totalChunks}`)
      }

      commit('setAlbumCoverId', imgTransaction.id)
      commit('setAlbumCoverLink', 'https://arweave.net/' + imgTransaction.id)
      console.log(imgTransaction.id)

      const imgRes = await ar.transactions.post(imgTransaction)
      console.log(imgTransaction.id + ': ', imgRes)

      // // Upload Music
      let musicList = []
      const musicFileList = data.music.data.music

      for (let i = 0; i < musicFileList.length; i++) {
        console.log('Uploading #' + (i + 1))
        const musicReady = encryptBuffer(Buffer.from(musicFileList[i].data))
        musicTransaction = await ar.createTransaction({ data: musicReady }, data.key).catch(err => console.log('Music Transaction Created Failed: ', err))
        // Add tag 添加标签
        musicTransaction.addTag('Content-Type', musicFileList[i].type)
        musicTransaction.addTag('App-Name', 'arclight-test')
        musicTransaction.addTag('Unix-Time', Date.now())
        musicTransaction.addTag('Type', 'album-music')
        musicTransaction.addTag('Track-Number', i + 1)
        musicTransaction.addTag('Title', musicFileList[i].title)
        musicTransaction.addTag('Album-Title', data.album.title)
        musicTransaction.addTag('Album-Desp', data.album.desp)
        musicTransaction.addTag('Author-Address', address)
        musicTransaction.addTag('Author-Username', user.data)

        await ar.transactions.sign(musicTransaction, data.key)
        let musicUploader = await ar.transactions.getUploader(musicTransaction)

        while (!musicUploader.isComplete) {
          await musicUploader.uploadChunk()
          commit('setUploadMusicNumber', i + 1)
          commit('setUploadMusicPct', musicUploader.pctComplete)
          console.log(`${musicUploader.pctComplete}% complete, ${musicUploader.uploadedChunks}/${musicUploader.totalChunks}`)
        }

        commit('setSingleMusicId', musicTransaction.id)
        commit('setSingleMusicLink', 'https://arweave.net/' + musicTransaction.id)
        console.log(musicTransaction.id)

        console.log('Await confirmation on post for #' + (i + 1))
        const musicRes = await ar.transactions.post(musicTransaction)
        console.log(musicTransaction.id + ': ', musicRes)
        musicList.push({ id: musicTransaction.id, title: musicFileList[i].title, price: musicFileList[i].price })
      }

      // Create single info
      const albumInfo = {
        title: data.album.title,
        desp: data.album.desp,
        genre: data.album.genre,
        price: data.album.price,
        duration: data.album.duration,
        cover: imgTransaction.id,
        music: musicList
      }

      console.log(albumInfo)

      albumTransaction = await ar.createTransaction({ data: JSON.stringify(albumInfo) }, data.key).catch(err => console.log('Album Transaction Created Failed: ', err))

      albumTransaction.addTag('App-Name', 'arclight-test')
      albumTransaction.addTag('Unix-Time', Date.now())
      albumTransaction.addTag('Type', 'album-info')
      albumTransaction.addTag('Title', data.album.title)
      albumTransaction.addTag('Tracks', musicList.length)
      albumTransaction.addTag('Genre', data.album.genre)
      albumTransaction.addTag('Price', data.album.price)
      albumTransaction.addTag('Author-Address', address)
      albumTransaction.addTag('Author-Username', user.data)

      await ar.transactions.sign(albumTransaction, data.key)
      let albumUploader = await ar.transactions.getUploader(albumTransaction)

      while (!albumUploader.isComplete) {
        await albumUploader.uploadChunk()
        console.log(`${albumUploader.pctComplete}% complete, ${albumUploader.uploadedChunks}/${albumUploader.totalChunks}`)
      }

      const singleRes = await ar.transactions.post(albumTransaction)
      console.log(albumTransaction.id + ': ', singleRes)

      // Create post info
      let postInfo = await API.arweave.getPostFromAddress(address)
      if (postInfo) {
        postInfo = JSON.parse(postInfo)
      } else {
        postInfo = []
      }

      postInfo.push({ 'album': albumTransaction.id, 'timestamp': Date.now() })

      postInfoTransaction = await ar.createTransaction({ data: JSON.stringify(postInfo) }, data.key).catch(err => console.log('Post Info Transaction Created Failed: ', err))

      postInfoTransaction.addTag('App-Name', 'arclight-test')
      postInfoTransaction.addTag('Unix-Time', Date.now())
      postInfoTransaction.addTag('Type', 'post-info')
      postInfoTransaction.addTag('Author-Address', address)
      postInfoTransaction.addTag('Author-Username', user.data)

      await ar.transactions.sign(postInfoTransaction, data.key)
      let postInfoUploader = await ar.transactions.getUploader(postInfoTransaction)

      while (!postInfoUploader.isComplete) {
        await postInfoUploader.uploadChunk()
        console.log(`${postInfoUploader.pctComplete}% complete, ${postInfoUploader.uploadedChunks}/${postInfoUploader.totalChunks}`)
      }

      const postInfoRes = await ar.transactions.post(postInfoTransaction)
      console.log(postInfoTransaction.id + ': ', postInfoRes)

      commit('setAlbumUploadComplete', true)
    },
    async uploadPodcast ({ commit }, data) {
      commit('setPodcastUploadComplete', false)
      commit('setUploadCoverPct', 0)
      commit('setUploadMusicPct', 0)
      console.log(data)
      let imgTransaction = ''
      let programTransaction = ''
      let podcastTransaction = ''
      let postInfoTransaction = ''

      // User info
      const address = await API.arweave.getAddress(data.key)
      const user = await API.arweave.getIdFromAddress(address)

      // Image Upload
      imgTransaction = await ar.createTransaction({ data: data.img.data }, data.key).catch(err => console.log('Image Transaction Created Failed: ', err))

      // // Add tag 添加标签
      imgTransaction.addTag('Content-Type', data.img.type)
      imgTransaction.addTag('App-Name', 'arclight-test')
      imgTransaction.addTag('Unix-Time', Date.now())
      imgTransaction.addTag('Type', 'podcast-cover')
      imgTransaction.addTag('Author-Address', address)
      imgTransaction.addTag('Author-Username', user.data)

      await ar.transactions.sign(imgTransaction, data.key)
      let imgUploader = await ar.transactions.getUploader(imgTransaction)

      while (!imgUploader.isComplete) {
        await imgUploader.uploadChunk()
        commit('setUploadCoverPct', imgUploader.pctComplete)
        console.log(`${imgUploader.pctComplete}% complete, ${imgUploader.uploadedChunks}/${imgUploader.totalChunks}`)
      }

      commit('setSingleCoverId', imgTransaction.id)
      commit('setSingleCoverLink', 'https://arweave.net/' + imgTransaction.id)
      console.log(imgTransaction.id)

      const imgRes = await ar.transactions.post(imgTransaction)
      console.log(imgTransaction.id + ': ', imgRes)

      // Upload Program
      const musicReady = encryptBuffer(Buffer.from(data.music.data.music))
      programTransaction = await ar.createTransaction({ data: musicReady }, data.key).catch(err => console.log('Program Transaction Created Failed: ', err))

      // Add tag 添加标签
      programTransaction.addTag('Content-Type', data.music.type)
      programTransaction.addTag('App-Name', 'arclight-test')
      programTransaction.addTag('Unix-Time', Date.now())
      programTransaction.addTag('Type', 'podcast-program')
      programTransaction.addTag('Author-Address', address)
      programTransaction.addTag('Author-Username', user.data)

      await ar.transactions.sign(programTransaction, data.key)
      let programUploader = await ar.transactions.getUploader(programTransaction)

      while (!programUploader.isComplete) {
        await programUploader.uploadChunk()
        if (programUploader.pctComplete > 98) {
          return
        } else {
          commit('setUploadMusicPct', programUploader.pctComplete)
          console.log(`${programUploader.pctComplete}% complete, ${programUploader.uploadedChunks}/${programUploader.totalChunks}`)
        }
      }

      commit('setSingleMusicId', programTransaction.id)
      commit('setSingleMusicLink', 'https://arweave.net/' + programTransaction.id)
      console.log(programTransaction.id)

      const musicRes = await ar.transactions.post(programTransaction)
      console.log(programTransaction.id + ': ', musicRes)

      // Create Podcast info
      const podcastInfo = {
        podcast: data.podcast.podcast,
        title: data.podcast.title,
        desp: data.podcast.desp,
        category: data.podcast.category,
        price: data.podcast.price,
        duration: data.podcast.duration,
        cover: imgTransaction.id,
        program: programTransaction.id
      }

      console.log(podcastInfo)

      podcastTransaction = await ar.createTransaction({ data: JSON.stringify(podcastInfo) }, data.key).catch(err => console.log('Podcast Transaction Created Failed: ', err))

      podcastTransaction.addTag('App-Name', 'arclight-test')
      podcastTransaction.addTag('Unix-Time', Date.now())
      podcastTransaction.addTag('Type', 'podcast-info')
      podcastTransaction.addTag('Podcast', data.podcast.podcast)
      podcastTransaction.addTag('Title', data.podcast.title)
      podcastTransaction.addTag('Category', data.podcast.category)
      podcastTransaction.addTag('Price', data.podcast.price)
      podcastTransaction.addTag('Author-Address', address)
      podcastTransaction.addTag('Author-Username', user.data)

      await ar.transactions.sign(podcastTransaction, data.key)
      let podcastUploader = await ar.transactions.getUploader(podcastTransaction)

      while (!podcastUploader.isComplete) {
        await podcastUploader.uploadChunk()
        console.log(`${podcastUploader.pctComplete}% complete, ${podcastUploader.uploadedChunks}/${podcastUploader.totalChunks}`)
      }

      const singleRes = await ar.transactions.post(podcastTransaction)
      console.log(podcastTransaction.id + ': ', singleRes)

      // Create post info
      let postInfo = await API.arweave.getPostFromAddress(address)
      if (postInfo) {
        postInfo = JSON.parse(postInfo)
      } else {
        postInfo = []
      }

      postInfo.push({ 'podcast': podcastTransaction.id, 'timestamp': Date.now() })

      postInfoTransaction = await ar.createTransaction({ data: JSON.stringify(postInfo) }, data.key).catch(err => console.log('Post Info Transaction Created Failed: ', err))

      postInfoTransaction.addTag('App-Name', 'arclight-test')
      postInfoTransaction.addTag('Unix-Time', Date.now())
      postInfoTransaction.addTag('Type', 'post-info')
      postInfoTransaction.addTag('Author-Address', address)
      postInfoTransaction.addTag('Author-Username', user.data)

      await ar.transactions.sign(postInfoTransaction, data.key)
      let postInfoUploader = await ar.transactions.getUploader(postInfoTransaction)

      while (!postInfoUploader.isComplete) {
        await postInfoUploader.uploadChunk()
        console.log(`${postInfoUploader.pctComplete}% complete, ${postInfoUploader.uploadedChunks}/${postInfoUploader.totalChunks}`)
      }

      const postInfoRes = await ar.transactions.post(postInfoTransaction)
      console.log(postInfoTransaction.id + ': ', postInfoRes)

      commit('setPodcastUploadComplete', true)
    },
    async uploadSoundEffect ({ commit }, data) {
      commit('setSoundEffectUploadComplete', false)
      commit('setUploadCoverPct', 0)
      commit('setUploadMusicPct', 0)
      let imgTransaction = ''
      let audioTransaction = ''
      let soundEffectTransaction = ''
      let postInfoTransaction = ''

      // User info
      const address = await API.arweave.getAddress(data.key)
      const user = await API.arweave.getIdFromAddress(address)

      // Image Upload
      imgTransaction = await ar.createTransaction({ data: data.img.data }, data.key).catch(err => console.log('Image Transaction Created Failed: ', err))

      // // Add tag 添加标签
      imgTransaction.addTag('Content-Type', data.img.type)
      imgTransaction.addTag('App-Name', 'arclight-test')
      imgTransaction.addTag('Unix-Time', Date.now())
      imgTransaction.addTag('Type', 'soundeffect-cover')
      imgTransaction.addTag('Author-Address', address)
      imgTransaction.addTag('Author-Username', user.data)

      await ar.transactions.sign(imgTransaction, data.key)
      let imgUploader = await ar.transactions.getUploader(imgTransaction)

      while (!imgUploader.isComplete) {
        await imgUploader.uploadChunk()
        commit('setUploadCoverPct', imgUploader.pctComplete)
        console.log(`${imgUploader.pctComplete}% complete, ${imgUploader.uploadedChunks}/${imgUploader.totalChunks}`)
      }

      commit('setSingleCoverId', imgTransaction.id)
      commit('setSingleCoverLink', 'https://arweave.net/' + imgTransaction.id)
      console.log(imgTransaction.id)

      const imgRes = await ar.transactions.post(imgTransaction)
      console.log(imgTransaction.id + ': ', imgRes)

      // Upload Audio
      const musicReady = encryptBuffer(Buffer.from(data.music.data.music))
      audioTransaction = await ar.createTransaction({ data: musicReady }, data.key).catch(err => console.log('Music Transaction Created Failed: ', err))

      // Add tag 添加标签
      audioTransaction.addTag('Content-Type', data.music.type)
      audioTransaction.addTag('App-Name', 'arclight-test')
      audioTransaction.addTag('Unix-Time', Date.now())
      audioTransaction.addTag('Type', 'soundeffect-audio')
      audioTransaction.addTag('Author-Address', address)
      audioTransaction.addTag('Author-Username', user.data)

      await ar.transactions.sign(audioTransaction, data.key)
      let musicUploader = await ar.transactions.getUploader(audioTransaction)

      while (!musicUploader.isComplete) {
        await musicUploader.uploadChunk()
        commit('setUploadMusicPct', musicUploader.pctComplete)
        console.log(`${musicUploader.pctComplete}% complete, ${musicUploader.uploadedChunks}/${musicUploader.totalChunks}`)
      }

      commit('setSingleMusicId', audioTransaction.id)
      commit('setSingleMusicLink', 'https://arweave.net/' + audioTransaction.id)
      console.log(audioTransaction.id)

      const musicRes = await ar.transactions.post(audioTransaction)
      console.log(audioTransaction.id + ': ', musicRes)

      // Create SoundEffect info
      const soundEffectInfo = {
        title: data.soundEffect.title,
        desp: data.soundEffect.desp,
        price: data.soundEffect.price,
        duration: data.soundEffect.duration,
        cover: imgTransaction.id,
        audio: audioTransaction.id
      }

      console.log(soundEffectInfo)

      soundEffectTransaction = await ar.createTransaction({ data: JSON.stringify(soundEffectInfo) }, data.key).catch(err => console.log('Single Transaction Created Failed: ', err))

      soundEffectTransaction.addTag('App-Name', 'arclight-test')
      soundEffectTransaction.addTag('Unix-Time', Date.now())
      soundEffectTransaction.addTag('Type', 'soundeffect-info')
      soundEffectTransaction.addTag('Title', data.soundEffect.title)
      soundEffectTransaction.addTag('Price', data.soundEffect.price)
      soundEffectTransaction.addTag('Author-Address', address)
      soundEffectTransaction.addTag('Author-Username', user.data)

      await ar.transactions.sign(soundEffectTransaction, data.key)
      let singleUploader = await ar.transactions.getUploader(soundEffectTransaction)

      while (!singleUploader.isComplete) {
        await singleUploader.uploadChunk()
        console.log(`${singleUploader.pctComplete}% complete, ${singleUploader.uploadedChunks}/${singleUploader.totalChunks}`)
      }

      const singleRes = await ar.transactions.post(soundEffectTransaction)
      console.log(soundEffectTransaction.id + ': ', singleRes)

      // Create post info
      let postInfo = await API.arweave.getPostFromAddress(address)
      if (postInfo) {
        postInfo = JSON.parse(postInfo)
      } else {
        postInfo = []
      }

      postInfo.push({ 'soundeffect': soundEffectTransaction.id, 'timestamp': Date.now() })

      postInfoTransaction = await ar.createTransaction({ data: JSON.stringify(postInfo) }, data.key).catch(err => console.log('Post Info Transaction Created Failed: ', err))

      postInfoTransaction.addTag('App-Name', 'arclight-test')
      postInfoTransaction.addTag('Unix-Time', Date.now())
      postInfoTransaction.addTag('Type', 'post-info')
      postInfoTransaction.addTag('Author-Address', address)
      postInfoTransaction.addTag('Author-Username', user.data)

      await ar.transactions.sign(postInfoTransaction, data.key)
      let postInfoUploader = await ar.transactions.getUploader(postInfoTransaction)

      while (!postInfoUploader.isComplete) {
        await postInfoUploader.uploadChunk()
        console.log(`${postInfoUploader.pctComplete}% complete, ${postInfoUploader.uploadedChunks}/${postInfoUploader.totalChunks}`)
      }

      const postInfoRes = await ar.transactions.post(postInfoTransaction)
      console.log(postInfoTransaction.id + ': ', postInfoRes)

      commit('setSoundEffectUploadComplete', true)
    },
    async updateLocation ({ commit }, data) {
      console.log('Update location to user profile')
      const address = await API.arweave.getAddress(data.key)
      const user = await API.arweave.getIdFromAddress(address)

      let transaction = ''

      transaction = await ar.createTransaction({ data: data.value }, data.key).catch(err => console.log('Post Info Transaction Created Failed: ', err))

      transaction.addTag('App-Name', 'arclight-test')
      transaction.addTag('Unix-Time', Date.now())
      transaction.addTag('Type', 'profile-location')
      transaction.addTag('Username', user.data)

      await ar.transactions.sign(transaction, data.key)
      let uploader = await ar.transactions.getUploader(transaction)

      while (!uploader.isComplete) {
        await uploader.uploadChunk()
        console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`)
      }

      const res = await ar.transactions.post(transaction)
      console.log(transaction.id + ': ', res)
    },
    async updateWebsite ({ commit }, data) {
      console.log('Update website to user profile')
      const address = await API.arweave.getAddress(data.key)
      const user = await API.arweave.getIdFromAddress(address)

      let transaction = ''

      transaction = await ar.createTransaction({ data: data.value }, data.key).catch(err => console.log('Post Info Transaction Created Failed: ', err))

      transaction.addTag('App-Name', 'arclight-test')
      transaction.addTag('Unix-Time', Date.now())
      transaction.addTag('Type', 'profile-website')
      transaction.addTag('Username', user.data)

      await ar.transactions.sign(transaction, data.key)
      let uploader = await ar.transactions.getUploader(transaction)

      while (!uploader.isComplete) {
        await uploader.uploadChunk()
        console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`)
      }

      const res = await ar.transactions.post(transaction)
      console.log(transaction.id + ': ', res)
    },
    async updateIntro ({ commit }, data) {
      console.log('Update introduction to user profile')
      const address = await API.arweave.getAddress(data.key)
      const user = await API.arweave.getIdFromAddress(address)

      let transaction = ''

      transaction = await ar.createTransaction({ data: data.value }, data.key).catch(err => console.log('Post Info Transaction Created Failed: ', err))

      transaction.addTag('App-Name', 'arclight-test')
      transaction.addTag('Unix-Time', Date.now())
      transaction.addTag('Type', 'profile-introduction')
      transaction.addTag('Username', user.data)

      await ar.transactions.sign(transaction, data.key)
      let uploader = await ar.transactions.getUploader(transaction)

      while (!uploader.isComplete) {
        await uploader.uploadChunk()
        console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`)
      }

      const res = await ar.transactions.post(transaction)
      console.log(transaction.id + ': ', res)
    },
    async updateNeteaseId ({ commit }, data) {
      console.log('Update netease id to user profile')
      const address = await API.arweave.getAddress(data.key)
      const user = await API.arweave.getIdFromAddress(address)

      let transaction = ''

      transaction = await ar.createTransaction({ data: data.value }, data.key).catch(err => console.log('Post Info Transaction Created Failed: ', err))

      transaction.addTag('App-Name', 'arclight-test')
      transaction.addTag('Unix-Time', Date.now())
      transaction.addTag('Type', 'profile-neteaseid')
      transaction.addTag('Username', user.data)

      await ar.transactions.sign(transaction, data.key)
      let uploader = await ar.transactions.getUploader(transaction)

      while (!uploader.isComplete) {
        await uploader.uploadChunk()
        console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`)
      }

      const res = await ar.transactions.post(transaction)
      console.log(transaction.id + ': ', res)
    },
    async updateSoundCloudId ({ commit }, data) {
      console.log('Update soundcloud id to user profile')
      const address = await API.arweave.getAddress(data.key)
      const user = await API.arweave.getIdFromAddress(address)

      let transaction = ''

      transaction = await ar.createTransaction({ data: data.value }, data.key).catch(err => console.log('Post Info Transaction Created Failed: ', err))

      transaction.addTag('App-Name', 'arclight-test')
      transaction.addTag('Unix-Time', Date.now())
      transaction.addTag('Type', 'profile-soundcloudid')
      transaction.addTag('Username', user.data)

      await ar.transactions.sign(transaction, data.key)
      let uploader = await ar.transactions.getUploader(transaction)

      while (!uploader.isComplete) {
        await uploader.uploadChunk()
        console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`)
      }

      const res = await ar.transactions.post(transaction)
      console.log(transaction.id + ': ', res)
    },
    async updateBandcampId ({ commit }, data) {
      console.log('Update bandcamp id to user profile')
      const address = await API.arweave.getAddress(data.key)
      const user = await API.arweave.getIdFromAddress(address)

      let transaction = ''

      transaction = await ar.createTransaction({ data: data.value }, data.key).catch(err => console.log('Post Info Transaction Created Failed: ', err))

      transaction.addTag('App-Name', 'arclight-test')
      transaction.addTag('Unix-Time', Date.now())
      transaction.addTag('Type', 'profile-bandcampid')
      transaction.addTag('Username', user.data)

      await ar.transactions.sign(transaction, data.key)
      let uploader = await ar.transactions.getUploader(transaction)

      while (!uploader.isComplete) {
        await uploader.uploadChunk()
        console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`)
      }

      const res = await ar.transactions.post(transaction)
      console.log(transaction.id + ': ', res)
    },
    async paymentForItem ({ commit }, data) {
      console.log(data)
    }
  }
})
