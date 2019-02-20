
export interface MessageState {
  data: string | object;
  timestamp: Date;
  type: string;
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
}

export default defaultState;
