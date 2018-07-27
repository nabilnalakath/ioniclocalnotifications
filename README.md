# ioniclocalnotifications
An Ionic 3 Local Notifications Project with onclick Function.


This is sample project to schedule local notifications in an ionic 3 application.

You can find a form to accept input value and set date and time in the home.html file.

In home.ts the notification is scheduled inside the submit fucntion.

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


As you can see there is a data field in notifications to pass any hidden data while scheduling notifications so that you ca retrieve 
it if needed to perform any specific task when a particular notification is clicked.
This is done using the method inside the controller:

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


Happy Coding.
