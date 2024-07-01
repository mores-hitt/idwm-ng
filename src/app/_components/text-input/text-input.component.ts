import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

/**
 * Represents a text input component.
 */
@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styles: [],
})
export class TextInputComponent implements ControlValueAccessor {
  /**
   * The label for the text input.
   */
  @Input() label: string = '';

  /**
   * The type of the text input.
   */
  @Input() type: string = 'text';

  /**
   * The placeholder text for the text input.
   */
  @Input() placeholder: string = '';

  /**
   * The error message to display when the input is required.
   */
  @Input() requiredMessage: string = '';

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  /**
   * Writes a new value to the text input.
   * @param _obj The new value to write.
   */
  writeValue(_obj: any): void {}

  /**
   * Registers a callback function to be called when the value of the text input changes.
   * @param _fn The callback function to register.
   */
  registerOnChange(_fn: any): void {}

  /**
   * Registers a callback function to be called when the text input is touched.
   * @param _fn The callback function to register.
   */
  registerOnTouched(_fn: any): void {}

  /**
   * Sets the disabled state of the text input.
   * @param _isDisabled Whether the text input should be disabled or not.
   */
  setDisabledState?(_isDisabled: boolean): void {}

  /**
   * Gets the FormControl instance associated with the text input.
   */
  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }
}
