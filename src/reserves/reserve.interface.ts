export interface Reserve {
  id?: number;
  userId: number;
  roomId: number;
  hotelId: number;
  date: Date;
  status: string;
  active: boolean;
}
