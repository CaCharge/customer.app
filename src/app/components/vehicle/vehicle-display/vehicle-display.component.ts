import { Component, OnInit, ChangeDetectorRef, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ITranslator, TranslatorFactoryService } from '../../../services/translator-factory.service';
import { RegisterVehiclesAPIRequestBody, Vehicle } from '../../../models/vehicle';

@Component({
  selector: 'app-vehicle-vehicle-display',
  templateUrl: './vehicle-display.component.html',
  styleUrls: ['./vehicle-display.component.scss'],
})
export class VehicleDisplayComponent implements OnInit, OnDestroy {
  @Input()
  public vehicle: Vehicle;

  @Output()
  public removeVehicle: EventEmitter<Vehicle> = new EventEmitter<Vehicle>();

  // private isExpandedView = false;

  public t: ITranslator;

  constructor(private userService: UserService,
              translateProviderService: TranslatorFactoryService,
              private cdr: ChangeDetectorRef) {
    this.t = translateProviderService.create('components.vehicle');
  }

  ngOnInit() {

  }

  ngOnDestroy() {
  }

  onRemoveVehicleButtonClick() {
    console.info('vehicle-display.component -> onRemoveVehicleButtonClick:'
      , '\nthis.vehicle: ', this.vehicle );
    this.removeVehicle.emit(this.vehicle);
  }
}