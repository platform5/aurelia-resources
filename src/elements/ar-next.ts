import { EventAggregator } from 'aurelia-event-aggregator';
import { StringHelpers } from '../helpers/string';
import { inject, bindable, Container, TaskQueue } from 'aurelia-framework';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArNextTheme } from './ar-next-theme';
import { Logger, getLogger } from 'aurelia-logging';

@inject(Element, StyleEngine, EventAggregator)
export class ArNext implements UxComponent {

  @bindable theme: ArNextTheme;
  @bindable defaultItemId: string = ''; // todo: allow this setting to define a "reset" screen position
  transitionDuration: string; // in ms

  constructor(public element: HTMLElement, private styleEngine: StyleEngine, private eventAggregator: EventAggregator){
  }

  public bind() {
    this.themeChanged(this.theme);
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'ar-next';
    }

    this.styleEngine.applyTheme(newValue, this.element);
    this.setTransitionDuration();
  }

  private setTransitionDuration() {
    let currentTheme = this.theme;
    if (currentTheme && currentTheme.animationDuration) {
      if (currentTheme.animationDuration.substr(-2) === 'ms') {
        this.transitionDuration = parseInt(currentTheme.animationDuration, 10).toString();
      } else if (currentTheme.animationDuration.substr(-1) === 's') {
        let td = parseInt(currentTheme.animationDuration, 10) * 1000
        this.transitionDuration = td.toString();
      }
    } else {
      this.transitionDuration = '400';
    }
  }

  attached() {
    if (!this.element.id) this.element.id = StringHelpers.randomString();
    let items = this.element.getElementsByTagName('AR-NEXT-ITEM');
    for (let index = 0; index < items.length; index++) {
      if (index === 0) { items[index].classList.add('current'); }
      if (index !== 0) { items[index].classList.add('next'); }
    }
    this.eventAggregator.subscribe('ar-next', (data: any) => {
      if (data.id && this.element.id !== data.id) return;
      if (!data.itemId) return;
      let direction: 'prev' | 'next' = (data.direction === 'prev') ? 'prev' : 'next';
      moveTo(data.itemId, direction);
    });
  }

  autoNext() {
    let currentItem = this.element.querySelector('ar-next-item.current');
    if (currentItem && currentItem instanceof HTMLElement) autoNext(currentItem);
  }

  autoPrev() {
    let currentItem = this.element.querySelector('ar-next-item.current');
    if (currentItem && currentItem instanceof HTMLElement) autoPrev(currentItem);
  }

  autoFirst() {
    autoFirst(this.element);
  }

  autoLast() {
    autoLast(this.element);
  }

  to(elementId: string) {
    moveTo(elementId, 'auto');
  }

  nextTo(elementId: string) {
    moveTo(elementId, 'next');
  }

  prevTo(elementId: string) {
    moveTo(elementId, 'prev');
  }

  reset(id: string = '') {
    let item: HTMLElement;
    if (!id && this.defaultItemId) id = this.defaultItemId;
    else if (!id) {
      let items = this.element.getElementsByTagName('AR-NEXT-ITEM');
      if (items && items.length) {
        let item = items[0];
        if (item.id) {
          id = item.id;
        }
      }
    }

    if (id) {
      item = document.getElementById(id);
    } else {
      let items = this.element.getElementsByTagName('AR-NEXT-ITEM');
      if (items && items.length) {
        item = (items[0] as HTMLElement);
      }
    }

    if (item) {
      let items = this.element.getElementsByTagName('AR-NEXT-ITEM')
      for (let index = 0; index < items.length; index++) {
        items[index].classList.remove('current');
        items[index].classList.remove('prev');
        items[index].classList.add('next');
      }
      item.classList.remove('next');
      item.classList.add('current');
    }
  }
}

@inject(Element)
export class ArNextCustomAttribute {

  value: string;
  constructor(private element: Element){
    this.element = element;
  }

  attached() {
    this.element.addEventListener('click', () => {
      moveTo(this.value, 'next');
    }, false)
  }

}

@inject(Element)
export class ArPrevCustomAttribute {

  value: string;
  constructor(private element: Element){
    this.element = element;
  }

  attached() {
    this.element.addEventListener('click', () => {
      moveTo(this.value, 'prev');
    }, false)
  }

}

@inject(Element)
export class ArBackCustomAttribute {

  value: string;
  constructor(private element: Element){
    this.element.addEventListener('click', () => {
      let axNext = document.getElementById(this.value);
      if (!axNext) return;
      let path = axNext.getAttribute('data-path');
      if (!path) return;
      let items = path.split('.');
      if (!items || items.length === 0) return;
      let lastItem = items.pop() || '';
      path = items.join('.');
      axNext.setAttribute('data-path', path);
      moveTo(lastItem, 'prev');
    });
  }
}

@inject(Element)
export class ArAutoNextCustomAttribute {

  constructor(private element: Element){
    this.element.addEventListener('click', () => {
      let arNextItem = this.element.closest('ar-next-item');
      if (arNextItem && arNextItem instanceof HTMLElement) autoNext(arNextItem);
    });
  }
}

@inject(Element)
export class ArAutoPrevCustomAttribute {

  constructor(private element: Element){
    this.element.addEventListener('click', () => {
      let arNextItem = this.element.closest('ar-next-item');
      if (arNextItem && arNextItem instanceof HTMLElement) autoPrev(arNextItem);
    });
  }
}

@inject(Element)
export class ArAutoFirstCustomAttribute {

  constructor(private element: Element){
    this.element.addEventListener('click', () => {
      let arNextItem = this.element.closest('ar-next-item');
      if (!arNextItem) return;
      let arNext = this.element.closest('ar-next');
      if (!arNext) return;
      let item = arNext.querySelector('ar-next-item');
      if (!item || !item.id) return;
      moveTo(item.id, 'prev');
    });
  }
}

@inject(Element)
export class ArAutoLastCustomAttribute {

  constructor(private element: Element){
    this.element.addEventListener('click', () => {
      let arNextItem = this.element.closest('ar-next-item');
      if (!arNextItem) return;
      let arNext = this.element.closest('ar-next');
      if (!arNext) return;
      let items = arNext.querySelectorAll('ar-next-item');
      if (!items.length) return;
      let item = items.item(items.length - 1);
      if (!item || !item.id) return;
      moveTo(item.id, 'next');
    });
  }
}


function moveTo(id: string, direction: 'prev' | 'next' | 'auto') {
  let eventAggregator = Container.instance.get(EventAggregator);
  // get all required elements
  let nextItem = document.getElementById(id);
  if (nextItem && nextItem.classList.contains('current')) return; // item is already current
  if (!nextItem) throw new Error('Cannot find next item: ' + id);
  const arNext = findArNext(nextItem);
  if (!arNext) throw new Error('Cannot find ar-next parent element');
  let currentItem = arNext.querySelector('.current');
  let path = arNext.getAttribute('data-path') || '';

  if (direction === 'auto') {
    // check if nextItem is after currentItem in the DOM
    let dir: 'prev' | 'next' = 'prev';
    let testElement = currentItem.nextElementSibling;
    while(testElement && dir === 'prev') {
      if (testElement.id === id) dir = 'next';
      testElement = testElement.nextElementSibling;
    }
    direction = dir;
  }

  if (direction === 'next') {
    let items = path.split('.');
    if (items[0] === '') items.shift();
    items.push(currentItem.id);
    path = items.join('.');
  } else {
    let items = path.split('.');
    items.pop();
    path = items.join('.');
  }
  arNext.setAttribute('data-path', path);
  let oppositeDirection = (direction === 'next') ? 'prev' : 'next';
  // setup classes before starting animation
  nextItem.classList.add(direction);
  nextItem.classList.remove(oppositeDirection);
  // enable animation
  (Container.instance.get(TaskQueue) as TaskQueue).queueTask(() => {
    currentItem.classList.add('animate');
    nextItem.classList.add('animate');
    // start animation
    currentItem.classList.add(oppositeDirection);
    currentItem.classList.remove('current');
    nextItem.classList.remove(direction);
    nextItem.classList.add('current');
  });
  // measure transition duration
  let duration = arNext.classList.toString().replace(/^(.*)transition-duration-([0-9]*)(.*)$/, '$2');
  // inform application about this move
  eventAggregator.publish('ar-next-move', {
    id: arNext.id,
    prevItemId: currentItem.id,
    nextItemId: nextItem.id,
    direction: direction,
    duration: duration
  });
  // disable animation when finished
  setTimeout(() => {
    if (currentItem) currentItem.classList.remove('animate');
    if (nextItem) nextItem.classList.remove('animate');
  }, parseInt(duration, 10) + 20);
}

function autoNext(currentItem: HTMLElement) {
  let arNext = currentItem.closest('ar-next');
  if (!arNext) return;
  let items = arNext.querySelectorAll('ar-next-item');
  let getNext = false;
  let foundNextElement: Element | null = null;
  for (let index = 0; index < items.length; index++) {
    let item = items.item(index);
    if (item === currentItem || item.id === currentItem.id) {
      getNext = true;
      continue;
    }
    if (getNext) {
      foundNextElement = item;
      break;
    }
  }
  if (!foundNextElement || !foundNextElement.id) return;
  moveTo(foundNextElement.id, 'next');
}

function autoPrev(currentItem: HTMLElement) {
  let arNext = currentItem.closest('ar-next');
  if (!arNext) return;
  let items = arNext.querySelectorAll('ar-next-item');
  let potentialPrevElement: Element | null = null;
  let foundPrevElement: Element | null = null;
  for (let index = 0; index < items.length; index++) {
    let item = items.item(index);
    if (item === currentItem || item.id === currentItem.id) {
      foundPrevElement = potentialPrevElement
      break;
    }
    potentialPrevElement = item;
  }
  if (!foundPrevElement || !foundPrevElement.id) return;
  moveTo(foundPrevElement.id, 'prev');
}

function autoFirst(arNext: HTMLElement) {
  let item = arNext.querySelector('ar-next-item');
  if (!item || !item.id) return;
  moveTo(item.id, 'prev');
}

function autoLast(arNext: HTMLElement) {
  let items = arNext.querySelectorAll('ar-next-item');
  if (!items.length) return;
  let item = items.item(items.length - 1);
  if (!item || !item.id) return;
  moveTo(item.id, 'next');
}

function findArNext(item: HTMLElement | null): HTMLElement | null {
  let element = item;
  if (element === null) return null;
  while (element.tagName !== 'BODY' && element.tagName !== 'AR-NEXT') {
    element = element.parentElement;
    if (element === null) return null;
  }
  if (element.tagName === 'AR-NEXT') return element;
  return null;
}
