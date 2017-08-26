import { Injectable } from '@angular/core';
import { IDomNode } from '../../app/entities/app.entities';

@Injectable()
export class Parser {
    ObjectToHtml(node: IDomNode): string {
        let openTag = node.tag ? '<' + node.tag : '';
        let closeTag = node.tag ? '</' + node.tag + '>' : '';
        let text = node.text ? node.text : '';

        let attrs = this.getAttributes(node.attributes);

        let res = this.getNodeContent(node.content);

        if (node.tag) {
            if (node.tag === 'input') {
                openTag = openTag + ' ' + attrs + '/>';
                closeTag = '';
            }
            else {
                if (attrs !== '') { attrs = ' ' + attrs; }
                openTag = openTag + attrs + '>';
            }
        }

        return openTag + text + res + closeTag;
    }

    private getAttributes(attr: {[key: string]: string}): string {
        let attrs: string;
        if (attr) {
            Object.keys(attr).forEach(key => {
                attrs = attrs ? attrs + ' ' : '';
                attrs = attrs + key + '="' + attr[key] + '"';
            });
        }
        attrs = attrs ? attrs : '';
        return attrs;
    }

    private getNodeContent(node: IDomNode[]): string {
        let res = '';
        if (node && node instanceof Array) {
            node.forEach(n => {
                res = res + this.ObjectToHtml(n);
            });
        }
        return res;
    }

    JsonToObject<T>(jsonObject: any, Constructor: { new (): T }): T {
        if (!Constructor || !Constructor.prototype.__propertyTypes__ || !jsonObject || typeof jsonObject !== 'object') {
            return jsonObject;
        }

        let instance: any = new Constructor();
        Object.keys(Constructor.prototype.__propertyTypes__).forEach(propertyKey => {
            let PropertyType = Constructor.prototype.__propertyTypes__[propertyKey];
            instance[propertyKey] = this.JsonToObject(jsonObject[propertyKey], PropertyType);
        });

        return instance;
    }
}