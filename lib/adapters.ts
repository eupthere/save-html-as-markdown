import type { Adapter, Message, SendMessage, OnMessage } from 'comctx';

export class RuntimeAdapter implements Adapter {
  sendMessage: SendMessage = async (message) => {
    await browser.runtime.sendMessage(message).catch((error: Error) => {
      // Popup may be closed — safe to ignore
      if (error.message.includes('Receiving end does not exist')) return;
      throw error;
    });
  };

  onMessage: OnMessage = (callback) => {
    const handler = (message?: Partial<Message>) => callback(message);
    browser.runtime.onMessage.addListener(handler);
    return () => browser.runtime.onMessage.removeListener(handler);
  };
}

export class TabAdapter implements Adapter {
  private tabId: number;

  constructor(tabId: number) {
    this.tabId = tabId;
  }

  sendMessage: SendMessage = (message) => {
    browser.tabs.sendMessage(this.tabId, message);
  };

  onMessage: OnMessage = (callback) => {
    const handler = (message?: Partial<Message>) => callback(message);
    browser.runtime.onMessage.addListener(handler);
    return () => browser.runtime.onMessage.removeListener(handler);
  };
}
