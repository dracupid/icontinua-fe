import API from './index'

export default {
  listRentDevices: () => API('/api/rent/listDevice'),
  rentHistory: (noCache = true) => API('/api/rent/s/history', {noCache}),
  orderInfo: (id) => API('/api/rent/orderInfo?orderId=' + id),
  payOrder: (devices, realName, address, phone, tenancy, totalRent, totalDeposit, test = false) => {
    if (devices.length === 0) return Promise.reject('no device found')

    let data = new FormData()
    data.append('devices', JSON.stringify(devices))
    data.append('realName', realName)
    data.append('address', address)
    data.append('phone', phone)
    data.append('tenancy', tenancy)
    data.append('totalRent', totalRent)
    data.append('totalDeposit', totalDeposit)
    data.append('type', 'JS')
    data.append('test', test)

    return API('/api/rent/s/take_order', {method: 'POST', body: data, noCache: true})
  },
  rePay: (orderId) => API('/api/rent/repay?type=JS&orderId=' + orderId),
  query: (orderId) => API('/api/pay/query?orderId=' + orderId)

}
