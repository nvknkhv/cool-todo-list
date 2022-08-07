class LSRequest {
  setItem(...args: any[]): Promise<any> {
    return this.__makeRequest(localStorage.setItem.bind(localStorage), ...args);
  }

  getItem(...args: any[]): Promise<any> {
    return this.__makeRequest(localStorage.getItem.bind(localStorage), ...args);
  }

  //очитстить все тикеты
  removeItem(...args: any[]): Promise<any> {
    return this.__makeRequest(
      localStorage.removeItem.bind(localStorage),
      ...args,
    );
  }

  __makeRequest(handler: any, ...args: any[]): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const response = handler(...args);
        resolve(response || { message: 'ok' });
      }, 500);
    });
  }
}

export default new LSRequest();
