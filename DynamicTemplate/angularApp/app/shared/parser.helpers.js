var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.ObjectToHtml = function (node) {
        var openTag = node.tag ? '<' + node.tag : '';
        var closeTag = node.tag ? '</' + node.tag + '>' : '';
        var text = node.text ? node.text : '';
        var attrs = this.getAttributes(node.attributes);
        var res = this.getNodeContent(node.content);
        if (node.tag) {
            if (node.tag === 'input') {
                openTag = openTag + ' ' + attrs + '/>';
                closeTag = '';
            }
            else {
                if (attrs !== '') {
                    attrs = ' ' + attrs;
                }
                openTag = openTag + attrs + '>';
            }
        }
        return openTag + text + res + closeTag;
    };
    Parser.prototype.getAttributes = function (attr) {
        var attrs;
        if (attr) {
            Object.keys(attr).forEach(function (key) {
                attrs = attrs ? attrs + ' ' : '';
                attrs = attrs + key + '="' + attr[key] + '"';
            });
        }
        attrs = attrs ? attrs : '';
        return attrs;
    };
    Parser.prototype.getNodeContent = function (node) {
        var _this = this;
        var res = '';
        if (node && node instanceof Array) {
            node.forEach(function (n) {
                res = res + _this.ObjectToHtml(n);
            });
        }
        return res;
    };
    Parser.prototype.JsonToObject = function (jsonObject, Constructor) {
        var _this = this;
        if (!Constructor || !Constructor.prototype.__propertyTypes__ || !jsonObject || typeof jsonObject !== 'object') {
            return jsonObject;
        }
        var instance = new Constructor();
        Object.keys(Constructor.prototype.__propertyTypes__).forEach(function (propertyKey) {
            var PropertyType = Constructor.prototype.__propertyTypes__[propertyKey];
            instance[propertyKey] = _this.JsonToObject(jsonObject[propertyKey], PropertyType);
        });
        return instance;
    };
    Parser = __decorate([
        Injectable()
    ], Parser);
    return Parser;
}());
export { Parser };
//# sourceMappingURL=parser.helpers.js.map