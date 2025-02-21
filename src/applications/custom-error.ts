  export class ApiError extends Error {
    public readonly url: string;

    public readonly status: number

    public readonly title: string
  
    public readonly timestamp: string
  
    public constructor(message: string, status: number, url: string, title: string){
      super(message);
      this.status = status;
      this.title = title
      this.url = url;
      this.timestamp = new Date().toISOString();
    }
  }
