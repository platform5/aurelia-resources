import { EventAggregator } from 'aurelia-event-aggregator';
import { Container } from 'aurelia-framework';

let eventAggregator = Container.instance.get(EventAggregator);

export class CordovaHelpers {

  static ready: boolean = false;
  static device: any;
  static online: boolean = false;
  static networkType: string = 'unknown';

  static deviceReady() {
    return new Promise((resolve) => {
      document.addEventListener('deviceready', () => {
        CordovaHelpers.ready = true;

        for (let lifeCycleEvent of ['pause', 'resume', 'backbutton', 'menubutton', 'searchbutton', 'startcallbutton', 'endcallbutton', 'volumedownbutton', 'volumeupbutton']) {
          document.addEventListener(lifeCycleEvent, (event) => {
            eventAggregator.publish(`cordova:${lifeCycleEvent}`, event);
          }, false);
        }

        resolve();
      });
    });
  }

  static detectDevice() {
    if (!CordovaHelpers.ready) throw new Error('Cannot call detectDevice before deviceReady resolves');
    CordovaHelpers.device = (window as any).device;
    let htmltag = document.documentElement;
    htmltag.classList.add(`platform-${CordovaHelpers.device.platform}`);
  }

  static overwriteWindowOpenWithInAppBrowser() {
    if (!CordovaHelpers.ready) throw new Error('Cannot call overwriteWindowOpenWithInAppBrowser before deviceReady resolves');
    if (!CordovaHelpers.device) CordovaHelpers.detectDevice();   
    if (CordovaHelpers.device && CordovaHelpers.device.platform !== 'browser') {
      window.open = (window as any).cordova.InAppBrowser.open;
    }
  }

  static startOnlineObserver() {
    if (!CordovaHelpers.ready) throw new Error('Cannot call startOnlineObserver before deviceReady resolves');
    let connection = (navigator as any).connection;
    CordovaHelpers.online = connection.type !== 'none';
    document.addEventListener('online', () => {
      CordovaHelpers.online = true;
      eventAggregator.publish('is-online');
      setTimeout(() => {
        CordovaHelpers.updateNetworkType();
      }, 10);
    }, false);
    document.addEventListener('offline', () => {
      CordovaHelpers.online = false;
      eventAggregator.publish('is-offline');
      setTimeout(() => {
        CordovaHelpers.updateNetworkType();
      }, 10);
    }, false);
  };

  static updateNetworkType() {
    if (!CordovaHelpers.ready) throw new Error('Cannot call updateNetworkStatus before deviceReady resolves');
    let connection = (navigator as any).connection;
    CordovaHelpers.networkType = connection.type;
  };

  static setStatusBar(color: string) {
    if (!CordovaHelpers.ready) throw new Error('Cannot call setStatusBar before deviceReady resolves');
    let w = (window as any);
    if (!w.device) throw new Error('setStatusBar requires the device plugin');
    if (w.device.platform === 'browser') return;

    let sbStyle = 'default';
    let sbColor = '#fff';

    if (color === 'blue') {
      sbStyle = 'blackopaque';
      sbColor = '#007CBB'
    }

    if ((window as any).StatusBar) {
      let sb = (window as any).StatusBar;
      if (sbStyle === 'default') sb.styleDefault();
      if (sbStyle === 'blackopaque') sb.styleBlackOpaque();
      sb.backgroundColorByHexString(sbColor);
    }
  }

  static hideKeyobard() {
    if (!CordovaHelpers.ready) throw new Error('Cannot call hideKeyobard before deviceReady resolves');
    let w = (window as any);
    if (w.Keyboard) {
      w.Keyboard.hide();
      eventAggregator.publish('keyboard-changed');
    }
  }

  static showKeyobard() {
    if (!CordovaHelpers.ready) throw new Error('Cannot call showKeyobard before deviceReady resolves');
    let w = (window as any);
    if (w.Keyboard) {
      w.Keyboard.show();
      eventAggregator.publish('keyboard-changed');
    }
  }

  static hideKeyobardToolbar() {
    if (!CordovaHelpers.ready) throw new Error('Cannot call hideKeyobardToolbar before deviceReady resolves');
    let w = (window as any);
    if (w.Keyboard) {
      w.Keyboard.hideFormAccessoryBar(true, () => {
        eventAggregator.publish('keyboard-changed');
      });
    }
  }

  static showKeyobardToolbar() {
    if (!CordovaHelpers.ready) throw new Error('Cannot call showKeyobardToolbar before deviceReady resolves');
    let w = (window as any);
    if (w.Keyboard) {
      w.Keyboard.hideFormAccessoryBar(false, () => {
        eventAggregator.publish('keyboard-changed');
      });
    }
  }

  static keyboardHeight = 0;
  static observeKeyboardHeight() {
    window.addEventListener('keyboardDidHide', (data) => {
      // Describe your logic which will be run each time keyboard is closed.
      console.log('keyboardDidHide', data);
      CordovaHelpers.keyboardHeight = 0;
      eventAggregator.publish('keyboard-changed');
    });
    window.addEventListener('keyboardDidShow', (event: any) => {
      // Describe your logic which will be run each time keyboard is closed.
      console.log('keyboardDidShow ', event);
      CordovaHelpers.keyboardHeight = event.keyboardHeight;
      eventAggregator.publish('keyboard-changed');
    });
  }

  static isKeyboardVisible(): boolean | null {
    if (!CordovaHelpers.ready) throw new Error('Cannot call isKeyboardVisible before deviceReady resolves');
    let w = (window as any);
    if (w.Keyboard) {
      return w.Keyboard.isVisible;
    }
    return null;
  }

  static canUseContacts(): Promise<boolean | null> {
    if (!CordovaHelpers.ready) throw new Error('Cannot call canUseContacts before deviceReady resolves');
    let cordova = (window as any).cordova;
    if (!cordova || !cordova.plugins || !cordova.plugins.diagnostic) return Promise.resolve(false);
    
    return new Promise((resolve) => {
        cordova.plugins.diagnostic.isContactsAuthorized((authorized: boolean) => {
            // success
            resolve(authorized);
        }, () => {
            // error
            resolve(null);
        });
    });
  }

  static getContacts(search: string = '', fields: Array<any> = ['*']): Promise<Array<any>> {
    if (!CordovaHelpers.ready) throw new Error('Cannot call getContacts before deviceReady resolves');
    console.log('in getContacts');

    if ((navigator as any).contacts === undefined) {
        return Promise.resolve([]);
    }

    console.log('fields', fields);
    return new Promise((resolve) => {
        console.log('in promise');
    (navigator as any).contacts.find(fields, (contacts: Array<any>) => {
            // success
            console.log('contacts', contacts);
            resolve(contacts);
        }, (error: any) => {
            // error
            console.error(error);
            resolve([]);
        }, {
            multiple: true
        });
    });
  }


  /* ONE SIGNAL AREA */
  static enableOneSignalNotifications(appId: string) {
    if (!CordovaHelpers.ready) throw new Error('Cannot call enable before deviceReady resolves');
    // Enable to debug issues.
    (window as any).plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

    // Set your iOS Settings
    let iosSettings: any = {};
    iosSettings['kOSSettingsKeyAutoPrompt'] = false;
    iosSettings['kOSSettingsKeyInAppLaunchURL'] = false;
    
    let notificationOpenedCallback = function(jsonData: any) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };
  
    (window as any).plugins.OneSignal
      .startInit(appId)
      .iOSSettings(iosSettings)
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();
  }

  static oneSignalHasPrompt(): Promise<boolean> {
    if (!CordovaHelpers.ready) throw new Error('Cannot call hasPrompt before deviceReady resolves');
    console.log('in hasPrompt');
    console.log('plugin', (window as any).plugins.OneSignal);
    return new Promise((resolve) => {
      console.log('in promise');
      (window as any).plugins.OneSignal.getPermissionSubscriptionState(function(status: any) {
        console.log('back from getPermissionSubscriptionState', status);
        resolve(status.permissionStatus.hasPrompted); // Bool*/
      });
    });    
  }
  
  static oneSignalHasAccepted(): Promise<boolean> {
    if (!CordovaHelpers.ready) throw new Error('Cannot call hasAccepted before deviceReady resolves');
    return new Promise((resolve) => {
      (window as any).plugins.OneSignal.getPermissionSubscriptionState(function(status: any) {
        resolve(status.permissionStatus.status === 2); // Bool
      });
    });    
  }
}
