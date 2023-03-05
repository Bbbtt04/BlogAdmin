import myAxios from '../../utils/server'

export const login = (data: any): any => {
  return myAxios.post('/auth/login', data)
}

export const register = (data: any) => {
  return myAxios.post('/user/register', data)
}
