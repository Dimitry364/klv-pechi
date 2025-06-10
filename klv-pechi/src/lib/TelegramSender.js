class TelegramForm {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  async _checkResponse(res) {
    if (res.ok) return res.json();
    throw new Error(`HTTP ${res.status}`);
  }

  async _request({ text }) {
    return fetch(this.baseUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        chat_id: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'HTML',
      }),
    }).then(this._checkResponse);
  }

  async sendMessage(message) {
    return this._request({ text: message });
  }
}

// Экземпляр
export const telegramSender = new TelegramForm({
  baseUrl: `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage`,
  headers: { 'Content-Type': 'application/json' },
});
