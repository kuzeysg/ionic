import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker }                  from '@ionic-native/image-picker';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  libraryImages: any[] = [];
  registerForm: FormGroup;
  image: string = 'assets/images/logo.png';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,
    private imagePicker: ImagePicker,
    private camera: Camera,
    private formBuilder: FormBuilder) {

      this.registerForm = this.formBuilder.group({
        firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
        telnum: ['', [Validators.required, Validators.pattern]],
        email: ['',[Validators.required, Validators.email]]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  dismiss(){
    this.viewCtrl.dismiss(true);
  }

  getPicture(){
    const options: CameraOptions = {
      quality: 100,
      targetHeight:100,
      targetWidth: 100,
      correctOrientation: true,
      allowEdit: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.Direction.FRONT
    };
    
    this.camera.getPicture(options)
      .then((imageData) => {
        this.image = imageData;
      },
      (err) => { console.log('Error Obtaning picture');
      });
  }

  getFromLibrary(){
    let options = {
      maximumImagesCount: 8,
      width: 500,
      height: 500,
      quality: 75
    }
  
    this.imagePicker.getPictures(options).then(
      file_uris => {
        this.libraryImages = file_uris;
      },
      err => console.log('uh oh')
    );
  }

  onSubmit(){
    console.log(this.registerForm.value);
    this.dismiss();
  }

}
