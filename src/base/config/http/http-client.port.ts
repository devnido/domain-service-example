export type HttpHeaders = Record<string, string>

export interface HttpResponse<T> {
  data: T
  status: number
  headers: HttpHeaders
}

export interface HttpClientPort {
  get<T>(url: string, headers?: HttpHeaders, params?: object): Promise<HttpResponse<T>>
  post<T>(url: string, body: object | null, headers?: HttpHeaders, params?: object): Promise<HttpResponse<T>>
  put<T>(url: string, body: object | null, headers?: HttpHeaders, params?: object): Promise<HttpResponse<T>>
  patch<T>(url: string, body: object | null, headers?: HttpHeaders, params?: object): Promise<HttpResponse<T>>
  delete<T>(url: string, headers?: HttpHeaders, params?: object): Promise<HttpResponse<T>>
}
