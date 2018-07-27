import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  data = { title: '', description: '', date: '', time: '' };
  constructor(public navCtrl: NavController, private localNotifications: LocalNotifications, public navParams: NavParams, public platform: Platform,
    public alertCtrl: AlertController) 
    {

    let onclickObservable = this.localNotifications.on("click");
    onclickObservable.subscribe((notification) => 
    {
      let alert = this.alertCtrl.create({
        title: 'hidden data is',
        subTitle:notification.data.id,
      });
      alert.present();
      console.log(notification.data);
    });

  }

  
  submit() 
  {
    console.log(this.data);
    var date = new Date(this.data.date + " " + this.data.time);
    var title = this.data.title;
    var text = this.data.description;
    console.log(date);

    
    this.localNotifications.schedule({
      title: title,
      text: text,
      trigger: {at: date},
      data: { id: 'My hidden message this is' },
      led: 'FF0000',
      sound: this.setSound()
    });

    
   
  
    let alert = this.alertCtrl.create({
      title: 'Congratulation!',
      subTitle: 'Notification setup successfully at ' + date,
      buttons: ['OK']
    });
    alert.present();
    this.data = { title: '', description: '', date: '', time: '' };
  }

  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/Rooster.mp3'
    } else {
      return 'file://assets/sounds/Rooster.caf'
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
