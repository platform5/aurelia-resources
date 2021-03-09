import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { ArVideoTheme } from './ar-video-theme';

@inject(Element, StyleEngine)
@customElement('ar-video')
export class ArVideo implements UxComponent {
  @bindable public theme: ArVideoTheme;
  @bindable public url: string = '';
  @bindable public ratio: number = 16 / 9;
  @bindable public autoPlay: boolean = false; // TODO

  private provider: string = 'none';
  private videoId: string = '';

  constructor(
    public element: HTMLElement,
    private styleEngine: StyleEngine) { }

  public bind() {
    this.themeChanged(this.theme);
    this.urlChanged();
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'ar-video';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public urlChanged() {
    this.detectProvider();
  }

  public detectProvider() {
    if (!this.url) {
      this.provider = 'none';
      return;
    }
    if (this.url.indexOf('youtube.com') !== -1) {
      this.videoId = this.youtubeVideoId(this.url);
      if (!this.videoId) {
        this.provider = 'unkown';
      } else {
        this.provider = 'youtube';
      }
    } else if (this.url.indexOf('vimeo.com') !== -1) {
      this.videoId = this.vimeoVideoId(this.url);
      if (!this.videoId) {
        this.provider = 'unkown';
      } else {
        this.provider = 'vimeo';
      }
    } else {
      this.url = 'unkown';
    }
  }

  public youtubeVideoId(youtubeUrl) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = youtubeUrl.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return '';
    }
  }

  public vimeoVideoId(vimeoUrl) {
    var regExp = /^.*(staffpicks\/|vimeo\.com\/)([^#\&\?\/]*).*/;
    var match = vimeoUrl.match(regExp);

    if (match && (match[2].length == 8 || match[2].length == 9)) {
        return match[2];
    } else {
        return '';
    }
  }
}
