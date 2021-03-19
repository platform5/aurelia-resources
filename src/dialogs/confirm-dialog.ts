export class  ConfirmDialog {

  public title: string;
  public text: string;

  public canActivate(params: any) {
    if (!params.title && !params.text) {
      throw new Error('Missing title or text');
    }
  }

  public activate(params: any) {
    this.title = params.title;
    this.text = params.text;
  }
  
}
