import { Component } from '@angular/core';


import { DynamicComponent } from '../app/components/template.component';

@Component({
    selector: 'my-app',
    template: '<template-component path="assets/model.json"></template-component>'
})
export class AppComponent {
    constructor() { }

}