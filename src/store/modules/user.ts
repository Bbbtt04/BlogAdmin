import { store } from '..'
import { login } from '@/api/modules/user'
import Storage from '@/utils/storage'

export const useUserStore = defineStore('app-user', {
  state: () => ({
    token: '',
    username: '',
    avator: '',
    roles: [],
  }),
  getters: {
    getToken(): string {
      return this.token
    },
  },
  actions: {
    async login(userInfo: any) {
      const { data, success } = await login(userInfo)
      if (success) {
        this.token = data.token
        Storage.set('ACCESS_TOKEN', data.access_token)
      }
      return Promise.resolve({ success, data })
    },
    GetInfo() {
      return {
        roles: this.$state.roles,
        name: this.$state.username,
      }
    },
  },
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
