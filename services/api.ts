// services/api.ts
export const BASE_URL = 'http://192.168.8.43/fidemed';

export type LoginResult = {
  success: boolean;
  role?: 'student' | 'staff' | 'nurse';
  user?: { id?: string; email?: string };
  token?: string;
  error?: string;
  // allow other backend fields if needed
  [key: string]: unknown;
};

async function parseJsonSafe<T = any>(res: Response): Promise<T> {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : ({} as T);
  } catch {
    // if backend returns invalid JSON, surface the text for easier debugging
    throw new Error(`Invalid JSON response: ${text}`);
  }
}

export const api = {
  login: async (email: string, password: string): Promise<LoginResult> => {
    const res = await fetch(`${BASE_URL}/login.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const body = await parseJsonSafe<{ error?: string }>(res).catch(() => ({} as { error?: string }));
      return { success: false, error: body.error ?? `HTTP ${res.status}` };
    }

    const body = await parseJsonSafe<LoginResult>(res);
    return body;
  },

  register: async (
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<{ success: boolean; error?: string }> => {
    const res = await fetch(`${BASE_URL}/register.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });
    const body = await parseJsonSafe(res);
    return body;
  },

  sendAlert: async (data: Record<string, unknown>) => {
    const res = await fetch(`${BASE_URL}/send_alert.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return parseJsonSafe(res);
  },

  getAlerts: async () => {
    const res = await fetch(`${BASE_URL}/get_alerts.php`);
    return parseJsonSafe(res);
  },

  updateStatus: async (id: string | number, status: string) => {
    const res = await fetch(`${BASE_URL}/update_status.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    return parseJsonSafe(res);
  },

  sendMessage: async (alertId: string | number, senderRole: string, message: string) => {
    const res = await fetch(`${BASE_URL}/send_message.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alertId, senderRole, message }),
    });
    return parseJsonSafe(res);
  },

  getMessages: async (alertId: string | number) => {
    const res = await fetch(`${BASE_URL}/get_messages.php?alertId=${alertId}`);
    return parseJsonSafe(res);
  },
};
