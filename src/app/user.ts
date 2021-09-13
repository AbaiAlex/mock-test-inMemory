export interface User {
  id: number;
  firstName: string;
  lastName: string;
  nationality: string;
  momsName: string;
  country?: string;
  registered?: boolean;
  gender?: 'Female' | 'Male' ;
  dateOfBirth?: any;
  number?: number;
  status?: 'Done' |'New'| 'In process';
}

export interface Nationality {
  name: 'British'|'Hungarian'|'German';
}

export interface Country {
  name: 'United Kingdom'|'Hungary'|'Germany',
}

export interface Gender {
  gender: 'Female' | 'Male' | 'Other';
}

export interface Status {
  status: 'Done' |'New'| 'In process';
}
