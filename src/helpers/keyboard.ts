export class KeybordHelper {

  public keydowns: {[key: string]: boolean} = {};
  public codedowns: {[key: string]: boolean} = {};
  public listeningKeys: string[] = [
    'Shift',
    'Control',
    'Meta',
    'Alt',
  ];
  public listeningCodes: string[] = [
    'ShiftLeft',
    'ShiftRight',
    'ControlLeft',
    'ControlRight',
    'MetaLeft',
    'MetaRight',
    'AltLeft',
    'AltRight',
  ];

  public start() {
    document.addEventListener('keydown', this);
    document.addEventListener('keyup', this);
  }

  public dispose() {
    document.removeEventListener('keydown', this);
    document.removeEventListener('keyup', this);
  }

  public handleEvent(event: KeyboardEvent) {
    if (this.listeningKeys.includes(event.key)) {
      this.keydowns[event.key] = event.type === 'keydown';
    }
    if (this.listeningCodes.includes(event.code)) {
      this.codedowns[event.code] = event.type === 'keydown';
    }
  }
  
}
