export const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'gray'; // Set the color for 'pending' status
    case 'processing':
      return 'blue'; // Set the color for 'processing' status
    case 'closed':
      return 'green'; // Set the color for 'closed' status
    default:
      return 'gray'; // Set a default color for unknown statuses
  }
};
export const getLevelColor = (status) => {
  switch (status.toLowerCase()) {
    case 'medium':
      return 'green'; // Set the color for 'pending' status
    case 'low':
      return 'blue'; // Set the color for 'processing' status
    case 'high':
      return 'red'; // Set the color for 'closed' status
    default:
      return 'gray'; // Set a default color for unknown statuses
  }
};
