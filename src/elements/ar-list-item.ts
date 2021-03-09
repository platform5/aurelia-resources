import { customElement, bindable, containerless } from 'aurelia-templating';

//@containerless
@customElement('ar-list-item')
export class ArListItem {
  //@bindable public theme = null;
  @bindable public collapsed: boolean = true;


  @bindable toggleOnIcon: boolean = false;
  @bindable toggleOnContent: boolean = false;
  @bindable toggleOnActions: boolean = true;

  clickOnIcon() {
    if (this.toggleOnIcon) return this.toggleCollapsed();
  }

  clickOnContent() {
    if (this.toggleOnContent) return this.toggleCollapsed();
  }

  clickOnActions() {
    if (this.toggleOnActions) return this.toggleCollapsed();
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

}
