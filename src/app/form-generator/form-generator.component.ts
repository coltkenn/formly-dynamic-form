import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { jsonValidator } from '../validators/json.validator';

@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrl: './form-generator.component.scss'
})
export class FormGeneratorComponent {
  fb: FormBuilder = inject(FormBuilder);

  // show: boolean = false;
  form: FormGroup;
  model: any = {
    multi_option_field_values: [null]
  };
  options = {
    formState: {
      mainModel: this.model
    }
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'field_key',
      type: 'input',
      props: {
        label: 'Field Key',
        description: 'Key to identify the field on the form.',
        required: true
      },
      className: 'custom-class'
    },
    {
      key: 'field_type',
      type: 'select',
      props: {
        label: 'Field type',
        placeholder: '',
        required: true,
        options: [
          { value: 'select', label: 'Select (Dropdown)' },
          { value: 'radio', label: 'Radio' },
          { value: 'checkbox', label: 'Checkbox' },
          { value: 'multicheckbox', label: 'Multi Checkbox' },
          { value: 'input', label: 'Text Input' },
          { value: 'textarea', label: 'Text Area' },
          { value: 'slider', label: 'Slider' },
          { value: 'toggle', label: 'Toggle' }
        ]
      }
    },
    {
      key: 'multi_option_field_values',
      type: 'repeat',
      props: {
        addText: 'Add option',
        label: 'Select/Radio/Checkbox values',
      },
      fieldArray: {
        type: 'input',
        props: {
          label: 'Value'
        }
      },
      expressions: {
        // hide: "formState.mainModel.field_type !== 'select'",
        hide: (field: FormlyFieldConfig) => {
          return !(field.options?.formState.mainModel.field_type === 'select' ||
                    field.options?.formState.mainModel.field_type === 'radio' ||
                    field.options?.formState.mainModel.field_type === 'multicheckbox'
          );
        }
      }
    },
    {
      key: 'field_label',
      type: 'input',
      props: {
        label: 'Field Label',
        description: 'The field label.',
        required: true
      },
      expressions: { hide: "!model.field_type" }
    },
    {
      key: 'field_placeholder',
      type: 'input',
      props: {
        label: 'Field placeholder',
        description: 'Placeholder text for the field.'
      },
      expressions: { hide: "!model.field_type" }
    },
    {
      key: 'field_description',
      type: 'input',
      props: {
        label: 'Field description',
        description: 'A description of the field.'
      },
      expressions: { hide: "!model.field_type" }
    },
    {
      key: 'field_required',
      type: 'checkbox',
      props: {
        label: 'Required',
        description: 'If the field is a required field.',
      },
      defaultValue: false,
      expressions: { hide: "!model.field_type" }
    },
    {
      key: 'field_expressions',
      type: 'textarea',
      props: {
        label: 'Field expressions',
        description: 'Expression JSON object that dynamically changes the field\'s properties.',
        placeholder: '{ "hide": "!model.field_type" }',
        autosize: true
      },
      expressions: {
        hide: "!model.field_type"
      },
      validators: {
        valid_json: {
          expression: (c: AbstractControl) => jsonValidator(c),
          message: 'Invalid JSON string.'
        }
      }
    }
  ];

  formPreview: FormGroup;
  previewModel: any = {};
  previewOptions = {
    formState: {
      mainModel: this.previewModel
    }
  };
  previewFields: FormlyFieldConfig[] = [];
  previewFieldsJson: any;

  constructor() {
    this.form = this.fb.group({});
    this.formPreview = this.fb.group({});
  }

  // reset(): void {
  //   this.model = {
  //     multi_option_field_values: [null]
  //   };
    // this.previewModel = {};
  // }

  addFieldToForm(): void {
    const field: FormlyFieldConfig = {
      key: this.form.controls['field_key'].value,
      type: this.form.controls['field_type'].value,
      props: {
        label: this.form.controls['field_label'].value,
        description: this.form.controls['field_description'].value,
        placeholder: this.form.controls['field_placeholder'].value,
        required: this.form.controls['field_required'].value,
        options: this.form.controls['multi_option_field_values']?.value.map((item: any, index: any) => {
          return { value: index, label: item };
        })
      },
      expressions: this.parsedJSONObject(this.form.controls['field_expressions'].value)
    }

    this.previewFields.push(field);
    this.formPreview = this.fb.group({});

    this.previewFieldsJson = JSON.parse(JSON.stringify(this.previewFields));

    this.form.reset();
  }

  generateForm(): void {

  }

  private parsedJSONObject(val: string): any {
    if (val) {
      try {
        return JSON.parse(val);
      } catch (err) {
        console.warn(err);
      }
    } else {
      return {};
    }
  }

  // toggle(): void {
  //   this.show = !this.show;
  // }
}
