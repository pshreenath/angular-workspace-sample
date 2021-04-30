import {UrlResolver} from "@angular/compiler";

declare const Liferay: any;

export class KarmaUrlResolver implements UrlResolver {
    resolve(baseUrl: string, url: string): string {
        const baseLiferayUrl = `${Liferay.ThemeDisplay.getPathContext()}/o/angular-sample/`
        if (url.startsWith(baseLiferayUrl)) {
            let componentTemplateUrl = url.replace(baseLiferayUrl, '');

            return `/base/assets/${componentTemplateUrl}`;
        }

        return url;
    }
}