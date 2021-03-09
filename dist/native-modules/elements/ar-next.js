var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { EventAggregator } from 'aurelia-event-aggregator';
import { StringHelpers } from '../helpers/string';
import { inject, bindable, Container, TaskQueue } from 'aurelia-framework';
import { StyleEngine } from '@aurelia-ux/core';
var ArNext = /** @class */ (function () {
    function ArNext(element, styleEngine, eventAggregator) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.eventAggregator = eventAggregator;
        this.defaultItemId = ''; // todo: allow this setting to define a "reset" screen position
    }
    ArNext.prototype.bind = function () {
        this.themeChanged(this.theme);
    };
    ArNext.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'ar-next';
        }
        this.styleEngine.applyTheme(newValue, this.element);
        this.setTransitionDuration();
    };
    ArNext.prototype.setTransitionDuration = function () {
        var currentTheme = this.theme;
        if (currentTheme && currentTheme.animationDuration) {
            if (currentTheme.animationDuration.substr(-2) === 'ms') {
                this.transitionDuration = parseInt(currentTheme.animationDuration, 10).toString();
            }
            else if (currentTheme.animationDuration.substr(-1) === 's') {
                var td = parseInt(currentTheme.animationDuration, 10) * 1000;
                this.transitionDuration = td.toString();
            }
        }
        else {
            this.transitionDuration = '400';
        }
    };
    ArNext.prototype.attached = function () {
        var _this = this;
        if (!this.element.id)
            this.element.id = StringHelpers.randomString();
        var items = this.element.getElementsByTagName('AR-NEXT-ITEM');
        for (var index = 0; index < items.length; index++) {
            if (index === 0) {
                items[index].classList.add('current');
            }
            if (index !== 0) {
                items[index].classList.add('next');
            }
        }
        this.eventAggregator.subscribe('ar-next', function (data) {
            if (data.id && _this.element.id !== data.id)
                return;
            if (!data.itemId)
                return;
            var direction = (data.direction === 'prev') ? 'prev' : 'next';
            moveTo(data.itemId, direction);
        });
    };
    ArNext.prototype.autoNext = function () {
        var currentItem = this.element.querySelector('ar-next-item.current');
        if (currentItem && currentItem instanceof HTMLElement)
            autoNext(currentItem);
    };
    ArNext.prototype.autoPrev = function () {
        var currentItem = this.element.querySelector('ar-next-item.current');
        if (currentItem && currentItem instanceof HTMLElement)
            autoPrev(currentItem);
    };
    ArNext.prototype.autoFirst = function () {
        autoFirst(this.element);
    };
    ArNext.prototype.autoLast = function () {
        autoLast(this.element);
    };
    ArNext.prototype.to = function (elementId) {
        moveTo(elementId, 'auto');
    };
    ArNext.prototype.nextTo = function (elementId) {
        moveTo(elementId, 'next');
    };
    ArNext.prototype.prevTo = function (elementId) {
        moveTo(elementId, 'prev');
    };
    ArNext.prototype.reset = function (id) {
        if (id === void 0) { id = ''; }
        var item;
        if (!id && this.defaultItemId)
            id = this.defaultItemId;
        else if (!id) {
            var items = this.element.getElementsByTagName('AR-NEXT-ITEM');
            if (items && items.length) {
                var item_1 = items[0];
                if (item_1.id) {
                    id = item_1.id;
                }
            }
        }
        if (id) {
            item = document.getElementById(id);
        }
        else {
            var items = this.element.getElementsByTagName('AR-NEXT-ITEM');
            if (items && items.length) {
                item = items[0];
            }
        }
        if (item) {
            var items = this.element.getElementsByTagName('AR-NEXT-ITEM');
            for (var index = 0; index < items.length; index++) {
                items[index].classList.remove('current');
                items[index].classList.remove('prev');
                items[index].classList.add('next');
            }
            item.classList.remove('next');
            item.classList.add('current');
        }
    };
    __decorate([
        bindable
    ], ArNext.prototype, "theme", void 0);
    __decorate([
        bindable
    ], ArNext.prototype, "defaultItemId", void 0);
    ArNext = __decorate([
        inject(Element, StyleEngine, EventAggregator)
    ], ArNext);
    return ArNext;
}());
export { ArNext };
var ArNextCustomAttribute = /** @class */ (function () {
    function ArNextCustomAttribute(element) {
        this.element = element;
        this.element = element;
    }
    ArNextCustomAttribute.prototype.attached = function () {
        var _this = this;
        this.element.addEventListener('click', function () {
            moveTo(_this.value, 'next');
        }, false);
    };
    ArNextCustomAttribute = __decorate([
        inject(Element)
    ], ArNextCustomAttribute);
    return ArNextCustomAttribute;
}());
export { ArNextCustomAttribute };
var ArPrevCustomAttribute = /** @class */ (function () {
    function ArPrevCustomAttribute(element) {
        this.element = element;
        this.element = element;
    }
    ArPrevCustomAttribute.prototype.attached = function () {
        var _this = this;
        this.element.addEventListener('click', function () {
            moveTo(_this.value, 'prev');
        }, false);
    };
    ArPrevCustomAttribute = __decorate([
        inject(Element)
    ], ArPrevCustomAttribute);
    return ArPrevCustomAttribute;
}());
export { ArPrevCustomAttribute };
var ArBackCustomAttribute = /** @class */ (function () {
    function ArBackCustomAttribute(element) {
        var _this = this;
        this.element = element;
        this.element.addEventListener('click', function () {
            var axNext = document.getElementById(_this.value);
            if (!axNext)
                return;
            var path = axNext.getAttribute('data-path');
            if (!path)
                return;
            var items = path.split('.');
            if (!items || items.length === 0)
                return;
            var lastItem = items.pop() || '';
            path = items.join('.');
            axNext.setAttribute('data-path', path);
            moveTo(lastItem, 'prev');
        });
    }
    ArBackCustomAttribute = __decorate([
        inject(Element)
    ], ArBackCustomAttribute);
    return ArBackCustomAttribute;
}());
export { ArBackCustomAttribute };
var ArAutoNextCustomAttribute = /** @class */ (function () {
    function ArAutoNextCustomAttribute(element) {
        var _this = this;
        this.element = element;
        this.element.addEventListener('click', function () {
            var arNextItem = _this.element.closest('ar-next-item');
            if (arNextItem && arNextItem instanceof HTMLElement)
                autoNext(arNextItem);
        });
    }
    ArAutoNextCustomAttribute = __decorate([
        inject(Element)
    ], ArAutoNextCustomAttribute);
    return ArAutoNextCustomAttribute;
}());
export { ArAutoNextCustomAttribute };
var ArAutoPrevCustomAttribute = /** @class */ (function () {
    function ArAutoPrevCustomAttribute(element) {
        var _this = this;
        this.element = element;
        this.element.addEventListener('click', function () {
            var arNextItem = _this.element.closest('ar-next-item');
            if (arNextItem && arNextItem instanceof HTMLElement)
                autoPrev(arNextItem);
        });
    }
    ArAutoPrevCustomAttribute = __decorate([
        inject(Element)
    ], ArAutoPrevCustomAttribute);
    return ArAutoPrevCustomAttribute;
}());
export { ArAutoPrevCustomAttribute };
var ArAutoFirstCustomAttribute = /** @class */ (function () {
    function ArAutoFirstCustomAttribute(element) {
        var _this = this;
        this.element = element;
        this.element.addEventListener('click', function () {
            var arNextItem = _this.element.closest('ar-next-item');
            if (!arNextItem)
                return;
            var arNext = _this.element.closest('ar-next');
            if (!arNext)
                return;
            var item = arNext.querySelector('ar-next-item');
            if (!item || !item.id)
                return;
            moveTo(item.id, 'prev');
        });
    }
    ArAutoFirstCustomAttribute = __decorate([
        inject(Element)
    ], ArAutoFirstCustomAttribute);
    return ArAutoFirstCustomAttribute;
}());
export { ArAutoFirstCustomAttribute };
var ArAutoLastCustomAttribute = /** @class */ (function () {
    function ArAutoLastCustomAttribute(element) {
        var _this = this;
        this.element = element;
        this.element.addEventListener('click', function () {
            var arNextItem = _this.element.closest('ar-next-item');
            if (!arNextItem)
                return;
            var arNext = _this.element.closest('ar-next');
            if (!arNext)
                return;
            var items = arNext.querySelectorAll('ar-next-item');
            if (!items.length)
                return;
            var item = items.item(items.length - 1);
            if (!item || !item.id)
                return;
            moveTo(item.id, 'next');
        });
    }
    ArAutoLastCustomAttribute = __decorate([
        inject(Element)
    ], ArAutoLastCustomAttribute);
    return ArAutoLastCustomAttribute;
}());
export { ArAutoLastCustomAttribute };
function moveTo(id, direction) {
    var eventAggregator = Container.instance.get(EventAggregator);
    // get all required elements
    var nextItem = document.getElementById(id);
    if (nextItem && nextItem.classList.contains('current'))
        return; // item is already current
    if (!nextItem)
        throw new Error('Cannot find next item: ' + id);
    var arNext = findArNext(nextItem);
    if (!arNext)
        throw new Error('Cannot find ar-next parent element');
    var currentItem = arNext.querySelector('.current');
    var path = arNext.getAttribute('data-path') || '';
    if (direction === 'auto') {
        // check if nextItem is after currentItem in the DOM
        var dir = 'prev';
        var testElement = currentItem.nextElementSibling;
        while (testElement && dir === 'prev') {
            if (testElement.id === id)
                dir = 'next';
            testElement = testElement.nextElementSibling;
        }
        direction = dir;
    }
    if (direction === 'next') {
        var items = path.split('.');
        if (items[0] === '')
            items.shift();
        items.push(currentItem.id);
        path = items.join('.');
    }
    else {
        var items = path.split('.');
        items.pop();
        path = items.join('.');
    }
    arNext.setAttribute('data-path', path);
    var oppositeDirection = (direction === 'next') ? 'prev' : 'next';
    // setup classes before starting animation
    nextItem.classList.add(direction);
    nextItem.classList.remove(oppositeDirection);
    // enable animation
    Container.instance.get(TaskQueue).queueTask(function () {
        currentItem.classList.add('animate');
        nextItem.classList.add('animate');
        // start animation
        currentItem.classList.add(oppositeDirection);
        currentItem.classList.remove('current');
        nextItem.classList.remove(direction);
        nextItem.classList.add('current');
    });
    // measure transition duration
    var duration = arNext.classList.toString().replace(/^(.*)transition-duration-([0-9]*)(.*)$/, '$2');
    // inform application about this move
    eventAggregator.publish('ar-next-move', {
        id: arNext.id,
        prevItemId: currentItem.id,
        nextItemId: nextItem.id,
        direction: direction,
        duration: duration
    });
    // disable animation when finished
    setTimeout(function () {
        if (currentItem)
            currentItem.classList.remove('animate');
        if (nextItem)
            nextItem.classList.remove('animate');
    }, parseInt(duration, 10) + 20);
}
function autoNext(currentItem) {
    var arNext = currentItem.closest('ar-next');
    if (!arNext)
        return;
    var items = arNext.querySelectorAll('ar-next-item');
    var getNext = false;
    var foundNextElement = null;
    for (var index = 0; index < items.length; index++) {
        var item = items.item(index);
        if (item === currentItem || item.id === currentItem.id) {
            getNext = true;
            continue;
        }
        if (getNext) {
            foundNextElement = item;
            break;
        }
    }
    if (!foundNextElement || !foundNextElement.id)
        return;
    moveTo(foundNextElement.id, 'next');
}
function autoPrev(currentItem) {
    var arNext = currentItem.closest('ar-next');
    if (!arNext)
        return;
    var items = arNext.querySelectorAll('ar-next-item');
    var potentialPrevElement = null;
    var foundPrevElement = null;
    for (var index = 0; index < items.length; index++) {
        var item = items.item(index);
        if (item === currentItem || item.id === currentItem.id) {
            foundPrevElement = potentialPrevElement;
            break;
        }
        potentialPrevElement = item;
    }
    if (!foundPrevElement || !foundPrevElement.id)
        return;
    moveTo(foundPrevElement.id, 'prev');
}
function autoFirst(arNext) {
    var item = arNext.querySelector('ar-next-item');
    if (!item || !item.id)
        return;
    moveTo(item.id, 'prev');
}
function autoLast(arNext) {
    var items = arNext.querySelectorAll('ar-next-item');
    if (!items.length)
        return;
    var item = items.item(items.length - 1);
    if (!item || !item.id)
        return;
    moveTo(item.id, 'next');
}
function findArNext(item) {
    var element = item;
    if (element === null)
        return null;
    while (element.tagName !== 'BODY' && element.tagName !== 'AR-NEXT') {
        element = element.parentElement;
        if (element === null)
            return null;
    }
    if (element.tagName === 'AR-NEXT')
        return element;
    return null;
}
