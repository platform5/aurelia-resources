import { EventAggregator } from 'aurelia-event-aggregator';
import { Container } from 'aurelia-framework';
import { NavigationInstruction } from 'aurelia-router';
import { getLogger, Logger } from 'aurelia-logging';

const criteria = {
	isElement: function (e: any) {
		return e instanceof HTMLElement;
	},
	hasClass: function (cls) {
		return function (e: any) {
			return criteria.isElement(e) && e.classList.contains(cls);
		}
	},
	hasTrackingInfo: function (e: any) {
		return criteria.isElement(e) &&
			e.hasAttribute('data-analytics-category') &&
			e.hasAttribute('data-analytics-action');
	},
	isOfType: function (e: any, type) {
		return criteria.isElement(e) && e.nodeName.toLowerCase() === type.toLowerCase();
	},
	isAnchor: function (e: any) {
		return criteria.isOfType(e, 'a');
	},
	isButton: function (e: any) {
		return criteria.isOfType(e, 'button');
	}
};

export class AnalyticsGoogle {

  private initialized: boolean = false;

  public enableNavigationTracking: boolean = false;
  public enableClickTracking: boolean = false;
  public enableEventTracking: boolean = false;

  public listenRouter: boolean = false;
  public anonymizeIp: boolean = false;

  private log: Logger = getLogger('analytics-google');

  init(id: string) {
    const script = document.createElement('script');
		script.text = `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){` +
			`(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),` +
			`m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)` +
			`})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');`;
    document.querySelector('body').appendChild(script);
    
    let _ga: any = () => {
      // @ts-ignore
			(ga.q = ga.q || []).push(arguments)
    };
    _ga.tmp = true;

		(window as any).ga = (window as any).ga || _ga;

    this.ga.l = +new Date;
    this.ga('create', id, 'auto');

    this.initialized = true;
  }

  get ga() {
    return (window as any).ga;
  }

  public start() {
    if (!this.initialized) {
      this.log.warn(`Please call 'init()' before calling 'start()'.`);
      return;
    }
    this.setListeners();
    this.attachClickTracker();
  }

  private setListeners() {
    let ea: EventAggregator = Container.instance.get(EventAggregator);
    ea.subscribe('router:navigation:success', (event: any) => {
      if (!this.listenRouter) return;
      let instruction: NavigationInstruction = event.instruction;
      this.trackPage(instruction.fragment + '?' + instruction.queryString, instruction.config.name)
      
    });
    ea.subscribe('analytics:navigation', (event: any) => {
      if (event instanceof NavigationInstruction) {
        this.trackPage(event.fragment + '?' + event.queryString, event.config.name)
      } else if (event.path) {
        this.trackPage(event.path, event.title);
      }
    });
    ea.subscribe('analytics:click', (event: any) => {
      if (event.category && event.action) {
        this.trackClick(event.category, event.action, event.label, event.value);
      }
    });
    ea.subscribe('analytics:event', (event: any) => {
      if (event.category && event.action) {
        this.trackClick(event.category, event.action, event.label, event.value);
      }
    });
  }

  private attachClickTracker() {
    document.querySelector('body').addEventListener('click', (event) => {
      if (!this.enableClickTracking) return;
      let el: any = event.target;
      let delegateTarget;
      do {
        if (!criteria.hasTrackingInfo(el))
          continue;
        delegateTarget = el;
        
        const tracking = {
          category: delegateTarget.getAttribute('data-analytics-category'),
          action: delegateTarget.getAttribute('data-analytics-action'),
          label: delegateTarget.getAttribute('data-analytics-label'),
          value: delegateTarget.getAttribute('data-analytics-value')
        };

        this.trackClick(tracking.category, tracking.action, tracking.label, tracking.value);

        return;
      } while ((el = el.parentNode));
    });
	}

  private trackClick(category: string, action: string, label?: string, value?: any) {
    if (!this.enableClickTracking) return;
    if (!this.initialized) {
      this.log.warn(`Please call 'init()' before calling 'start()'.`);
      return;
    }
		this.ga('send', 'event', category, action, label, value);
	}

	private trackPage(path, title) {
    if (!this.enableNavigationTracking) return;
		if (!this.initialized) {
			this.log.warn(`Please call 'init()' before calling 'start()'.`);
			return;
    }
    
		this.ga('set', {
			page: path,
			title: title,
			anonymizeIp: this.anonymizeIp
		});
		this.ga('send', 'pageview');
	}

}
