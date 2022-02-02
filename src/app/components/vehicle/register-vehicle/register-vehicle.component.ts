import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ITranslator, TranslatorFactoryService } from '../../../services/translator-factory.service';
import { VehicleServiceAPIRequestBody } from '../../../models/vehicle';

@Component({
  selector: 'app-vehicle-register-vehicle',
  templateUrl: './register-vehicle.component.html',
  styleUrls: ['./register-vehicle.component.scss'],
})
export class RegisterVehicleComponent implements OnInit, OnDestroy {
  @Input()
  showTitle: boolean;

  @Output()
  public registerVehicle: EventEmitter<VehicleServiceAPIRequestBody> = new EventEmitter<VehicleServiceAPIRequestBody>();

  public t: ITranslator;
  public tGlobal: ITranslator;

  public vehicleRegistrationModel: VehicleServiceAPIRequestBody = {
    registrationNumber: null,
    countryCode: null,
  };

  constructor(
    private userService: UserService,
    translateProviderService: TranslatorFactoryService,
  ) {
    this.t = translateProviderService.create('components.vehicle');
    this.tGlobal = translateProviderService.create('global');
  }

  ngOnInit() {

  }

  ngOnDestroy() {
  }

  onCountryCodeChange($event) {

  }

  onRegistrationNumberChange($event) {

  }

  onRegisterVehicleSubmit(form) {
    console.info('register-vehicle.component -> onRegisterVehicleSubmit:'
      , '\nevent: ', form
      , '\nthis.vehicleRegistrationModel: ', this.vehicleRegistrationModel);
    this.registerVehicle.emit(this.vehicleRegistrationModel);
  }

}
