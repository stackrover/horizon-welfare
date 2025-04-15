export class Package {
  id: number;
  project_id: number;
  title: string;
  subscription_rate: string;
  status: string;
  original: any;

  constructor(data: any = {}) {
    this.id = data.id || null;
    this.project_id = data.project_id || null;
    this.title = data?.project?.title || "";
    this.subscription_rate = data.subscription_rate || "";
    this.status = data.status || "";

    this.original = {
      project_id: this.project_id ? this.project_id.toString() : "",
      subscription_rate: this.subscription_rate
        ? +this.subscription_rate.toString()
        : 0,
      status: this.status,
    };
  }

  getOriginal() {
    return this.original;
  }
}
