export const useKeepAliveStore = defineStore({
  id: 'KeepAliveStore',
  state: () => ({
    keepAliveList: [] as string[],
  }),
  getters:{
    getKeepAliveList: (state) => state.keepAliveList
  },
  actions: {
    // 添加缓存
    async addKeepAlive(name: string) {
      !this.keepAliveList.includes(name) && this.keepAliveList.push(name)
    },
    // 移除缓存
    async removeKeepAlive(name: string) {
      this.keepAliveList = this.keepAliveList.filter(item => item !== name)
    },
    // 设置缓存
    async setKeepAlive(list: string[]) {
      this.keepAliveList = list
    },
  },
})
