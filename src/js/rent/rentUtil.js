export function formatState (state) {
  switch (state) {
    case 'CREATED':
      return '待支付'
    case 'PAID':
      return '待发货'
    case 'DELIVERED':
      return '已发货'
    case 'RETURNED':
      return '已归还'
    default:
      return '处理中'
  }
}
