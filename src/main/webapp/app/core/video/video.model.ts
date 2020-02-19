export interface IVideo {
  id?: any;
  video?: File;
  path?: string;
}

export class Video implements IVideo {
  constructor(public id?: any, public video?: File, public path?: string) {
    this.id = id ? id : null;
    this.video = video ? video : null;
    this.path = path ? path : null;
  }
}
