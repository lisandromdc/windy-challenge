// constants
import { BACKEND_API } from '~/constants/constants';
import type { MenuItem, Order } from '~/types/models';

type ResponseGet = {
  menu: MenuItem[];
  'orders/lastOrder': Order;
};
type ResponseGetById = {
  orders: Order;
};
type ResponsePost = {
  menu: MenuItem[];
  orders: Order;
};

export const api = {
  async get<T extends keyof ResponseGet>(endpoint: T): Promise<ResponseGet[T]> {
    return await connectApi(endpoint, 'GET');
  },
  async getById<T extends keyof ResponseGetById>(endpoint: T, id: number): Promise<ResponseGetById[T]> {
    return await connectApi(`${endpoint}/${id}`, 'GET');
  },
  async post<T extends keyof ResponsePost>(endpoint: T, payload: any): Promise<ResponsePost[T]> {
    return await connectApi(endpoint, 'POST', payload);
  },  
}
async function connectApi(endpoint: string, method: 'GET' | 'POST', payload?: any) {
  try {
    const url = `${BACKEND_API}/${endpoint}`;
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    if (method === 'POST' && payload) {
      options.body = JSON.stringify(payload);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching the API:', error);
  }
}
