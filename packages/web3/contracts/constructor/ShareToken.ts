export default {
  name: process.env.TOKEN_NAME,
  symbol: process.env.TOKEN_SYMBOL,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  meetingRoom: require("../../store/contract/MeetingRoom.json").address,
};
