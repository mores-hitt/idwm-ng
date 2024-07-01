import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';

/**
 * Represents a select input component.
 */
@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styles: [],
})
export class SelectInputComponent implements ControlValueAccessor {
  /**
   * The label for the select input.
   */
  @Input() label: string = '';

  /**
   * The placeholder for the select input.
   */
  @Input() placeholder: string = '';

  /**
   * The options for the select input.
   */
  @Input() options: { value: any; text: string }[] = [];

  /**
   * The required message for the select input.
   */
  @Input() requiredMessage: string = '';

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  /**
   * Writes a new value to the select input.
   * @param _obj The new value to be written.
   */
  writeValue(_obj: any): void {}

  /**
   * Registers a callback function to be called when the select input value changes.
   * @param _fn The callback function to be registered.
   */
  registerOnChange(_fn: any): void {}

  /**
   * Registers a callback function to be called when the select input is touched.
   * @param _fn The callback function to be registered.
   */
  registerOnTouched(_fn: any): void {}

  /**
   * Sets the disabled state of the select input.
   * @param _isDisabled The disabled state to be set.
   */
  setDisabledState?(_isDisabled: boolean): void {}

  /**
   * Gets the form control associated with the select input.
   */
  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }
}
