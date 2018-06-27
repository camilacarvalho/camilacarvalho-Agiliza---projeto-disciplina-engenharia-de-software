import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage';

let config_key_name = "config";

@Injectable()
export class ConfigProvider {

  constructor() {
    console.log('Hello ConfigProvider Provider');
  }

  // This method retrieve storage data.
  getConfigData(): any {
    return localStorage.getItem(config_key_name);
  }

  // Writes the storage data.
  setConfigData(show_slide?: boolean) {
    let config_show_slide: boolean;

    if (show_slide) {
      config_show_slide = show_slide;
    }

    localStorage.setItem(config_key_name, JSON.stringify(config_show_slide));
  }

}
