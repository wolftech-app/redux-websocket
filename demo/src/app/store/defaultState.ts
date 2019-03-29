
export interface MessageState {
  data: string | object;
  origin: string;
  timestamp: Date;
  type: 'OUTGOING' | 'INCOMING';
}

export interface State {
  connected: boolean;
  messages: MessageState[];
  url?: string;
}

const defaultState: State = {
  connected: false,
  messages: [],
  url: null,
};

export default defaultState;
