const Storage = {
  set(key: string, value: any) {
    localStorage.setItem(key, value)
  },
  get(key: string) {
    return localStorage.getItem(key)
  },
  remove(key: string) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  },
}

export default Storage
