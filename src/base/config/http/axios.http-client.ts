import { AxiosInstance } from 'axios'
import axios from 'axios'
import { EnvConfigService } from '../env/env-config.service'

export type HttpHeaders = Record<string, string>

export interface HttpResponse<T> {
  data: T
  status: number
  headers: HttpHeaders
}

export class AxiosHttpClient {
  private http: AxiosInstance

  constructor(envConfigService: EnvConfigService) {
    this.http = axios.create({
      baseURL: envConfigService.externalServiceApiUrl,
    })
  }

  async get<T>(url: string, headers?: HttpHeaders | undefined, params?: object | undefined): Promise<HttpResponse<T>> {
    const response = await this.http.get<T>(url, { headers, params })
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as HttpHeaders,
    }
  }

  async post<T>(
    url: string,
    body: object | null,
    headers?: HttpHeaders | undefined,
    params?: object | undefined,
  ): Promise<HttpResponse<T>> {
    const response = await this.http.post<T>(url, body, { headers, params })
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as HttpHeaders,
    }
  }

  async patch<T>(
    url: string,
    body: object | null,
    headers?: HttpHeaders | undefined,
    params?: object | undefined,
  ): Promise<HttpResponse<T>> {
    const response = await this.http.patch<T>(url, body, { headers, params })

    return {
      data: response.data,
      status: response.status,
      headers: response.headers as HttpHeaders,
    }
  }

  async put<T>(
    url: string,
    body: object | null,
    headers?: HttpHeaders | undefined,
    params?: object | undefined,
  ): Promise<HttpResponse<T>> {
    const response = await this.http.put<T>(url, body, { headers, params })
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as HttpHeaders,
    }
  }

  async delete<T>(url: string, headers?: HttpHeaders | undefined, params?: object | undefined): Promise<HttpResponse<T>> {
    const response = await this.http.delete<T>(url, { headers, params })
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as HttpHeaders,
    }
  }
}
