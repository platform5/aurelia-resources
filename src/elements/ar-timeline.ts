// https://www.w3schools.com/howto/howto_css_timeline.asp
// https://webdesign.tutsplus.com/tutorials/building-a-vertical-timeline-with-css-and-a-touch-of-javascript--cms-26528
import { customElement, bindable, children } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { observable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArTimelineTheme } from './ar-timeline-theme';
import { ArTimelineItem } from './ar-timeline-item';
import { getLogger, Logger } from 'aurelia-logging';
import * as moment from 'moment';

@inject(Element, StyleEngine)
@customElement('ar-timeline')
export class ArTimeline implements UxComponent {

  private log: Logger;

  @bindable public theme: ArTimelineTheme;
  @bindable public colors: string = 'primary-white'; // primary-accent, accent-white, primary-app, accent-app
  @bindable public autoOrder: boolean = true;
  @bindable public order: 'asc' | 'desc' = 'asc';
  @bindable public placeUndatedItemAtThe: string = 'end';
  @bindable public positionning: 'alt' | 'all-left' | 'all-right' | 'manual' | 'auto' = 'alt'; // all-left, all-right, manual
  @bindable public limit: number = -1;
  
  @children('ar-timeline-item') private items: Array<ArTimelineItem> = [];
  private handleResize: EventListener;

  constructor(private element: HTMLElement, public styleEngine: StyleEngine) {
    this.log = getLogger('ar-timeline');
    this.handleResize = e => {
      
    };
  }

  public bind() {
    this.themeChanged(this.theme);
  }

  public attached() {
    this.handleResize(null);
    window.addEventListener('resize', this.handleResize);
    this.autoOrderChanged();
    this.colorsChanged();
    this.positionningChanged();
  }

  public detached() {
    window.removeEventListener('resize', this.handleResize);
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'ar-timeline';
    }
  }

  public colorsChanged() {

  }

  public itemsChanged() {
    this.autoOrderChanged();
  }

  public orderChanged() {
    this.autoOrderChanged();
  }
  
  public placeUndatedItemAtTheChanged() {
    this.autoOrderChanged();
  }

  public autoOrderChanged() {
    // by giving this method a small timeout
    // it allows the items to run the fixing script
    // for the date
    if (!this.items || this.items.length === 0) return;
    if (this.autoOrder) {
      let itemTimes: Array<any> = [];
      for (let item of this.items) {
        if (item.date && item.date instanceof Date) itemTimes.push(item.date.getTime());
      }
      itemTimes.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });
      if (this.order === 'desc') {
        itemTimes.reverse();
      }
      for (let item of this.items) {
        if (item.date && item.date instanceof Date) item.order = itemTimes.indexOf(item.date.getTime());
        else if (this.placeUndatedItemAtThe === 'beginning') item.order = 0;
        else item.order = this.items.length;
        item.hidden = (this.limit === -1) ? false : item.order > this.limit - 1;
      }
    } else {
      let index = 0;
      for (let item of this.items) {
        index++;
        item.hidden = (this.limit === -1) ? false : index > this.limit;
        item.order = null;
      }
    }
    this.positionningChanged();
  }


  public positionningChanged() {
    if (this.positionning === 'manual' || this.positionning === 'auto') {
      return;
    }
    if (this.positionning === 'all-right') {
      for (let item of this.items || []) item.position = 'right';
      return;
    }
    if (this.positionning === 'all-left') {
      for (let item of this.items || []) item.position = 'left';
      return;
    }
    let itemsToOrder: Array<ArTimelineItem> = [];
    for (let item of this.items || []) {
      itemsToOrder.push(item);
    }
    itemsToOrder.sort((a, b) => {
      if (a.order < b.order) return -1;
      else if (a.order > b.order) return 1;
      return 0;
    });
    let position = 'left';
    for (let item of itemsToOrder || []) {
      item.position = position;
      if (position === 'left') position = 'right';
      else if (position === 'right') position = 'left';
    }
  }
}

function stopEvent(e: Event) {
  e.stopPropagation();
}
