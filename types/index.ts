// src/types/index.ts or src/interfaces/index.ts
export interface CheckSize {
    id: number;
    name: string;
    angels?: Angel[];
  }
  
  export interface Angel {
    id: number;
    name: string;
    email?: string | null;
    company?: string | null;
    title?: string | null;
    checkSize?: string | null;
    details?: string | null;
    twitterPicture?: string | null;
    site?: string | null;
    twitterVerified?: boolean;
    hidden?: boolean;
    rank?: number;
    createdAt: Date;
    updatedAt: Date;
    checksize?: CheckSize | null;
    checksize_id?: number | null;
    checksize_label: string
  }