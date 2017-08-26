var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Compiler, Component, NgModule, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { AppService } from '../../app/services/app.services';
import { IDomNode } from '../../app/entities/app.entities';
import { Parser } from '../../app/shared/parser.helpers';
var DynamicComponent = (function () {
    function DynamicComponent(compiler, service, parser) {
        this.compiler = compiler;
        this.service = service;
        this.parser = parser;
    }
    DynamicComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getDOMModel(this.path)
            .subscribe(function (response) {
            _this.jsonTemp = response;
            var dom = _this.parser.JsonToObject(response, IDomNode);
            _this.template = _this.parser.ObjectToHtml(dom);
            _this.addComponent(_this.template);
        });
    };
    DynamicComponent.prototype.addComponent = function (template) {
        var TemplateComponent = (function () {
            function TemplateComponent() {
            }
            TemplateComponent = __decorate([
                Component({ template: template })
            ], TemplateComponent);
            return TemplateComponent;
        }());
        var TemplateModule = (function () {
            function TemplateModule() {
            }
            TemplateModule = __decorate([
                NgModule({ declarations: [TemplateComponent] })
            ], TemplateModule);
            return TemplateModule;
        }());
        var mod = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
        var factory = mod.componentFactories.find(function (comp) {
            return comp.componentType === TemplateComponent;
        });
        var component = this.container.createComponent(factory);
    };
    __decorate([
        ViewChild('container', { read: ViewContainerRef }),
        __metadata("design:type", ViewContainerRef)
    ], DynamicComponent.prototype, "container", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DynamicComponent.prototype, "path", void 0);
    DynamicComponent = __decorate([
        Component({
            selector: 'template-component',
            template: "\n        <h1>\u0414\u0438\u043D\u0430\u043C\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0448\u0430\u0431\u043B\u043E\u043D :</h1>\n        <p>JSON \u043E\u0431\u044A\u0435\u043A\u0442 : {{jsonTemp | json}}</p>\n        <p>HTML \u0448\u0430\u0431\u043B\u043E\u043D: {{template}}</p>\n        <div #container></div>\n      "
        }),
        __metadata("design:paramtypes", [Compiler, AppService, Parser])
    ], DynamicComponent);
    return DynamicComponent;
}());
export { DynamicComponent };
//# sourceMappingURL=template.component.js.map