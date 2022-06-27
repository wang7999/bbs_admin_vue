import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import store from '../store'

// 创建 axios 实例
const request: AxiosInstance = axios.create({
  // API 请求的默认前缀
  baseURL: import.meta.env.VITE_BASE_URL as string | undefined,
  timeout: 10000 // 请求超时时间
})

let timer: any

// 拦截请求
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = store.getters.token
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (token && config?.headers) {
      config.headers.Authorization = `${token}` // Bearer
    }
    return config
  },
  (error) => {
    console.log(`err${error}`)
    // ElNotification({
    //   title: '请求失败',
    //   message: error.message,
    //   type: 'error'
    // })
    Promise.reject(error)
  }
)

// 拦截响应
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    if (response.data.success) {
      return response.data
    }
    ElMessage({
      showClose: true,
      message: response.data.message || '操作失败',
      type: 'error'
    })
    return Promise.reject(response.data)
  },
  (err: any) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    clearTimeout(timer)
    timer = setTimeout(() => {
      if (err.response) {
        const { status, data } = err.response
        // const { logout } = useLayoutStore()
        switch (status) {
          case 401:

            ElMessage({
              showClose: true,
              message: (data && data.message) || '登录信息过期或未授权，请重新登录！',
              type: 'error'
            })
            // logout()
            break

          default:
            ElMessage({
              showClose: true,
              message: data.message || `连接错误 ${status}！`,
              type: 'error'
            })
            break
        }
      } else {
        ElMessage({
          showClose: true,
          message: err.message,
          type: 'error'
        })
      }
    }, 200) // 200 毫秒内重复报错则只提示一次！

    return Promise.reject(err)
  }
)

export default request
