import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
  singer: {},
  playing: false, // 是否播放
  fullScreen: false, // 是否是大屏播放器
  playlist: [], // 播放的列表(当是顺序播放时和sequenceList一样，随机播放时不一样)
  sequenceList: [], // 顺序列表
  mode: playMode.sequence, // 播放模式(默认是顺序播放)
  currentIndex: -1, // 当前播放的索引
  disc: {}, // 点击选中的那一首歌
  topList: {}, // 排行榜数据清单
  searchHistory: loadSearch(), // 搜索历史
  playHistory: loadPlay(), // 播放历史
  favoriteList: loadFavorite() // 喜爱清单
}

export default state