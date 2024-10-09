import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly',
  templateUrl: './formly.component.html',
  styleUrl: './formly.component.scss'
})
export class FormlyComponent {
  // show = false;
  form: FormGroup;
  model: any = {};
  options = {
    formState: {
      mainModel: this.model
    }
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'sport',
      type: 'select',
      props: {
        label: 'Favorite sport',
        placeholder: '',
        options: [
          { value: 'football', label: 'Football' },
          { value: 'baseball', label: 'Baseball' },
          { value: 'basketball', label: 'Basketball' }
        ]
      }
    },
    {
      key: 'team',
      type: 'radio',
      props: {
        label: 'Favorite team:',
        options: [
          { value: 'saints', label: 'New Orleans Saints' },
          { value: 'bengals', label: 'Cincinatti Bengals' },
          { value: 'steelers', label: 'Pittsburgh Steelers' }
        ]
      },
      expressions: { hide: "model.sport !== 'football'" }
    },
    {
      key: 'team',
      type: 'radio',
      props: {
        label: 'Favorite team:',
        options: [
          { value: 'astros', label: 'Houston Astros' },
          { value: 'rangers', label: 'Texas Rangers' },
          { value: 'giants', label: 'San Francisco Giants' }
        ]
      },
      expressions: { hide: "model.sport !== 'baseball'" }
    },
    {
      key: 'team',
      type: 'radio',
      props: {
        label: 'Favorite team:',
        options: [
          { value: 'heat', label: 'Miami Heat' },
          { value: 'raptors', label: 'Toronto Raptors' },
          { value: 'mavs', label: 'Dallas Mavs' }
        ]
      },
      expressions: { hide: "model.sport !== 'basketball'" }
    },
    {
      key: 'checkbox',
      type: 'checkbox',
      props: {
        label: 'Checkbox'
      },
      expressions: {
        'props.change': (field: FormlyFieldConfig) => {
          console.log(field.formControl);
        }
      }
    },
    {
      key: 'input',
      type: 'input',
      props: {
        label: 'Input',
        required: true,
      },
      validation: {
        messages: {
          required: 'This is a required field.'
        }
      }
      // validators: {
      //   validation: [IpValidator]
      // }
    }
  ];

  constructor(fb: FormBuilder) {
    this.form = fb.group({});
  }

  toggle() {
    // this.show = !this.show;
    // this.fields[1].hideExpression = this.show;
    // console.log(this.model);
    this.model = {};
    // this.options.resetModel();
  }
}
