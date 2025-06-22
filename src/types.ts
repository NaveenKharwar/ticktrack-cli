export interface TicketLogEntry {
  ticketUrl: string;
  tags: string[];
  comment?: string;
  otherTasks?: string;
}

export interface AppEnd {
  GOOGLE_SHEET_ID: string;
}