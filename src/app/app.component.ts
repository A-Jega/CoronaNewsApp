import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Platform, IonRouterOutlet, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { NavigationBar } from '@ionic-native/navigation-bar/ngx';

import { HomePage } from './home/home.page';

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild(IonRouterOutlet, {static: false}) routerOutlet: IonRouterOutlet;
  rootPage: any;

  constructor(
    public storage: Storage,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navigationBar: NavigationBar,
    private alertController: AlertController,
    private router: Router,
  ) {
    this.platform.backButton.subscribeWithPriority(0, async () => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()){
        this.routerOutlet.pop();
      } else if (this.router.url === "/home"){
        const alert = await this.alertController.create({
          header: 'Sair',
          message: 'Deseja sair do aplicativo ?',
          buttons: [
            {
              text: 'Não',
              role: 'Não'
            },
            {
              text: 'Sim',
              handler: () => {
                navigator["app"].exitApp();
              }
            }
          ]
        });
        await alert.present();
      }
    });

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.rootPage = HomePage;

      const style = document.documentElement.style;
      if (window.AndroidNotch) {
        this.statusBar.styleDefault();
        this.statusBar.backgroundColorByHexString("#00000000");
        window.AndroidNotch.getInsetTop(px => {
          style.setProperty("--notch-inset-top", px + "px");
        }, (err) => {
          this.statusBar.styleDefault();
          this.statusBar.backgroundColorByHexString("#02c39a");
        });
      } else {
        this.statusBar.styleDefault();
        this.statusBar.backgroundColorByHexString("#02c39a");
      }
      this.navigationBar.hideNavigationBar().then(() => {
        console.log('success')
      }).catch(() => {
        console.log('error')
      });
      this.splashScreen.hide();
    });
  }
  ngOnInit() {
  }
}
