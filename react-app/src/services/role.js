export const parseRole = (role) => {
  switch (role) {
    case 'admin':
      return 'Administrator';
    case 'S':
      return 'Scheduler';
    case 'RN':
      return 'Nurse';
    case 'CNA':
      return 'Medical Health Aide';
    case 'PT':
      return 'Physical Therapist';
    case 'PTA':
      return 'Physical Therapist Assistant';
    case 'OT':
      return 'Occupational Therapist';
    case 'OTA':
      return 'Occupational Therapist Assistant';
    case 'ST':
      return 'Speech Therapist';
    case 'STA':
      return 'Speech Therapist Assistant';
    default:
      return 'N/A';
  }
};
