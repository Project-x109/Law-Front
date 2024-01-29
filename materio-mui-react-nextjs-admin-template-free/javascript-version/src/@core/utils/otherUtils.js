export const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return '#EFCD00';
    case 'processing':
      return '#16B1FF';
    case 'closed':
      return '#9155FD';
    default:
      return 'gray';
  }
};
export const getLevelColor = (status) => {
  switch (status.toLowerCase()) {
    case 'medium':
      return '#9155FD';
    case 'low':
      return '#16B1FF';
    case 'high':
      return '#FF4C51';
    default:
      return 'gray';
  }
};

export const getUserStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return '#EFCD00';
    case 'active':
      return '#16B1FF';
    case 'blocked':
      return '#FF4C51'
    default:
      return 'gray'
  }
}
