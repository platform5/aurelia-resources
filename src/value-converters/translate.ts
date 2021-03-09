import { valueConverter } from 'aurelia-binding';
import { Container, Aurelia, inject } from 'aurelia-framework';

// This valueConverter will be registered if no other t valueConverter are registered

@valueConverter('translate')
@inject(Container)
export class TranslateValueConverter {

  private tVC: any = null;

  constructor(private container: Container) {
    const aurelia = this.container.get(Aurelia);
    if (aurelia.resources.getValueConverter('t')) {
      this.tVC = aurelia.resources.getValueConverter('t');
    }
  }

  public toView(value: any) {
    if (this.tVC !== null && this.tVC.toView) {
      try {
        const translatedValue = this.tVC.toView(value);
        return translatedValue;
      } catch (error) {
        // ignore
      }
    }
    return value;
  }
}
