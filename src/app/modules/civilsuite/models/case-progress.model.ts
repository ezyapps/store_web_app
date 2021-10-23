
export class CivilCaseProgress {
  id?: string;
  caseId?: string;
  isSFReceived?: boolean;
  sfReceiveDate?: Date;
  hasGovtInterest?: boolean;
  isSFSentToGPOffice?: boolean;
  dateSFSentToGPOffice?: Date;
  isGPOfficeReplyReceived?: boolean;
  dateReplyReceivedFromGPOffice?: Date;
  isSignedReplySentToGPOffice?: boolean;
  dateSignedReplySentToGPOffice?: Date;
  hearingDate?: Date;
  result?: number;
}
