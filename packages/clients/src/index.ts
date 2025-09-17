import fetch from 'cross-fetch';

type HttpMethod = 'GET' | 'POST';

export interface ClientOptions {
  baseUrl: string;
  apiKey?: string;
}

export class EchoClient {
  private readonly baseUrl: string;
  private readonly apiKey?: string;

  constructor(options: ClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, '');
    this.apiKey = options.apiKey;
  }

  async ping(): Promise<string> {
    const response = await this.request('GET', '/health');
    return response.status;
  }

  async request(method: HttpMethod, path: string, body?: unknown): Promise<{ status: string; data: unknown }>
  {
    const url = `${this.baseUrl}${path}`;
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (this.apiKey) {
      headers.Authorization = `Bearer ${this.apiKey}`;
    }

    const res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });

    const data = await res.json().catch(() => ({}));
    return { status: res.ok ? 'ok' : 'error', data };
  }
}
