import request from "@/utils/server";

export function getInfo() {
  return request({
    method: 'get',
    url: '/site'
  })
}
