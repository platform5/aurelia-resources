// https://www.w3schools.com/howto/howto_js_rangeslider.asp
import { customElement, bindable } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { observable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArProgressTheme } from './ar-progress-theme';
import { getLogger, Logger } from 'aurelia-logging';

@inject(Element, StyleEngine)
@customElement('ar-progress')
export class ArProgress implements UxComponent {

  private log: Logger;

  @bindable public theme: ArProgressTheme;
  @bindable public value: number = 0;
  @bindable public label: string = '';

  @bindable public type: string = 'circle'; // circle, line
  @bindable public finePosition: string = 'ext';
  @bindable public width: string = '100%';
  @bindable public animate: boolean = true;

  private fineStrokeWidth: number = 4;
  private largeStrokeWidth: number = 4;

  private finePath: HTMLElement;
  private largePath: HTMLElement;
  private svgWidth: number = 100;
  private increment: number = 2;
  private timeout: number = 20;
  private fineArc: string = ''; // arc of the fine line
  private largeArc: string = ''; // arc of the progress
  private _value = 0;
  private elementWidth: number = 0;
  private fontSize: string = '40px'; // will be calculated automatically according to element width
  private lineFontSize: string = '12px'; // will be calculated automatically according to element height

  private handleResize: EventListener;
  private animating: boolean | any = false;

  constructor(public element: HTMLElement, public styleEngine: StyleEngine) {
    this.log = getLogger('ar-progress');
    this.handleResize = e => {
      this.elementWidth = this.element.offsetWidth;
      this.fontSize = `${this.elementWidth * 0.35}px`;
    };
  }

  public bind() {
    const element = this.element;
    this.valueChanged();
    this.themeChanged(this.theme);
  }

  public attached() {
    this.handleResize(null);
    window.addEventListener('resize', this.handleResize);
    this.setFineArc();
    this.typeChanged();
    setTimeout(() => {
      this.typeChanged();
    }, 100);
  }

  public detached() {
    window.removeEventListener('resize', this.handleResize);
  }

  public widthChanged() {
    this.handleResize(null);
  }

  public finePositionChanged() {
      this.setFineArc();
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'ar-progress';
    }

    if (newValue == null || newValue.largeStrokeWidth == null) {
      this.largeStrokeWidth = 4;
    } else {
      // adjust stroke width to theme
      this.largeStrokeWidth = newValue.largeStrokeWidth;
    }

    if (newValue == null || newValue.fineStrokeWidth == null) {
      this.fineStrokeWidth = 1;
    } else {
      // adjust stroke width to theme
      this.fineStrokeWidth = newValue.fineStrokeWidth;
    }

    this.styleEngine.applyTheme(newValue, this.element);
    this.setFineArc();
    this.updateLargeArc();
  }

  public valueChanged() {
    this.value = Math.round(this.value);
    if (!this.animate) {
      this._value = this.value;
      if (!this.largePath) {
        // wait 250ms to allow the view to be ready to have a value change in path arc
        setTimeout(() => {
          this.updateLargeArc();
        }, 250);
      } else {
        // if this.largePath exists it means the view is ready
        this.updateLargeArc();
      }
      return;
    }
    this.startAnimation();
  }

  public animateChanged() {
    if (this.animate) {
      this._value = 0;
      this.startAnimation();
    }
  }

  public typeChanged() {
    if (this.type === 'line') {
      // calculate font size
      let firstDiv = this.element.getElementsByTagName('div')[0];
      if (!firstDiv && this.type === 'line') {
          setTimeout(() => {this.typeChanged()}, 50);
          return;
      }
      let secondDiv = firstDiv.getElementsByTagName('div')[0];
      if (!secondDiv && this.type === 'line') {
        setTimeout(() => {this.typeChanged()}, 50);
        return;
    }
      let height = secondDiv.offsetHeight;
      this.lineFontSize = `${height * 0.55}px`;
    } else if (this.type === 'circle') {
      setTimeout(() => {
        this.setFineArc();
        this.updateLargeArc();
      }, 200);
    }
  }

  private setFineArc() {
    let angle = 360;
    // setting the default radius to place it at the ext of the large circle
    let radius = this.svgWidth / 2 - this.fineStrokeWidth / 2;
    if (this.finePosition === 'center') {
      radius = this.svgWidth / 2 - this.largeStrokeWidth / 2;
    } else if (this.finePosition === 'int') {
      radius = this.svgWidth / 2 - this.largeStrokeWidth + this.fineStrokeWidth / 2;
    }
    this.fineArc = this.describeArc(this.svgWidth / 2, this.svgWidth / 2, radius, 0, angle);
    if (this.finePath) this.finePath.setAttribute('d', this.fineArc);
  }


  private startAnimation() {
    if (this.animating) return;
    this.animating = setInterval(() => {
      if (this._value == this.value){
        clearInterval(this.animating);
        this.animating = null;
      }
      if (this._value > this.value) this._value = Math.max(this._value - this.increment, this.value);
      if (this._value < this.value) this._value = Math.min(this._value + this.increment, this.value);
      this.updateLargeArc();
    }, this.timeout);
  }

  private updateLargeArc() {
    let angle = this._value / 100 * 360;
    this.largeArc = this.describeArc(this.svgWidth / 2, this.svgWidth / 2, this.svgWidth / 2 - this.largeStrokeWidth / 2, 0, angle);
    if (this.largePath) this.largePath.setAttribute('d', this.largeArc);
  }

  private polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    let angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    let xy = {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };

    xy.x = Math.floor(xy.x * 100) / 100;
    xy.y = Math.floor(xy.y * 100) / 100;

    return xy;
  }

  private describeArc(x, y, radius, startAngle, endAngle){

    var start = this.polarToCartesian(x, y, radius, endAngle);
    var end = this.polarToCartesian(x, y, radius, startAngle);

    var arcSweep = endAngle - startAngle <= 180 ? '0' : '1';

    var d = [
        'M', start.x, start.y,
        'A', radius, radius, 0, arcSweep, 0, end.x, end.y
    ].join(' ');

    return d;
  }

}

function stopEvent(e: Event) {
  e.stopPropagation();
}
