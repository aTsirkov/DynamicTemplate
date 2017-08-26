import { Compiler, Component, NgModule, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { AppService } from '../../app/services/app.services';

import { IDomNode } from '../../app/entities/app.entities';
import { Parser } from '../../app/shared/parser.helpers';

@Component({
    selector: 'template-component',
    template: `
        <h1>Динамический шаблон :</h1>
        <p>JSON объект : {{jsonTemp | json}}</p>
        <p>HTML шаблон: {{template}}</p>
        <div #container></div>
      `
})
export class DynamicComponent implements OnInit {
    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
    @Input() path: string;

    public jsonTemp: string;
    public template: string;

    constructor(private compiler: Compiler, private service: AppService, private parser: Parser) { }

    ngOnInit() {
        this.service.getDOMModel(this.path)
            .subscribe(response => {
                this.jsonTemp = response;
                let dom = this.parser.JsonToObject(response, IDomNode);
                this.template = this.parser.ObjectToHtml(dom);

                this.addComponent(this.template);
            });
    }

    private addComponent(template: string) {
        @Component({ template: template })
        class TemplateComponent { }

        @NgModule({ declarations: [TemplateComponent] })
        class TemplateModule { }

        const mod = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
        const factory = mod.componentFactories.find((comp) =>
            comp.componentType === TemplateComponent
        );
        const component = this.container.createComponent(factory);
    }

}