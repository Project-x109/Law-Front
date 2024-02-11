import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
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
export const StatusRadio = ({ status, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <RadioGroup row value={status} onChange={handleChange}>
      <FormControlLabel value="pending" control={<Radio />} label="Pending" />
      <FormControlLabel value="active" control={<Radio />} label="Active" />
      <FormControlLabel value="blocked" control={<Radio />} label="Blocked" />
    </RadioGroup>
  );
};

export const StatusRadioIssue = ({ status, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <RadioGroup row value={status} onChange={handleChange}>
      <FormControlLabel value="pending" control={<Radio />} label="Pending" />
      <FormControlLabel value="processing" control={<Radio />} label="Processing" />
      <FormControlLabel value="closed" control={<Radio />} label="Closed" />
    </RadioGroup>
  );
};

export const getRandomColor = () => {
  const colors = ['success', 'error', 'warning', 'info', 'primary', 'secondary'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex] || 'info';
};
