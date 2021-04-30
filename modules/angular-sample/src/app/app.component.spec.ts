import {AppComponent} from './app.component';
import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {KarmaUrlResolver} from "../test/karma-url-resolver";
import {UrlResolver} from "@angular/compiler";
import {By} from "@angular/platform-browser";

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>
    let app: AppComponent

    beforeEach(waitForAsync(() => {
        TestBed.configureCompiler({
            providers: [
                {provide: UrlResolver, useClass: KarmaUrlResolver, deps: []},
            ]
        });

        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(AppComponent);
            app = fixture.debugElement.componentInstance;
        });
    }));

    it('should be able to instantiate the component', () => {
        expect(app).toBeTruthy();
    })

    it('should render params', () => {
        app.params = {
            portletElementId: 'testElementId',
            portletNamespace: 'testNamespace',
            configuration: {
                portletInstance: {},
                system: {}
            },
            contextPath: 'testContextPath'
        }

        fixture.detectChanges();

        assertElementTextContent(
            '.portlet-namespace > .value', 'testNamespace');

        assertElementTextContent(
            '.context-path > .value', 'testContextPath');

        assertElementTextContent(
            '.portlet-element-id > .value', 'testElementId');
    })

    function assertElementTextContent(selector: string, textContent: string) {
        let element = fixture.debugElement.query(By.css(selector));
        expect(element.nativeElement.textContent).toEqual(textContent);
    }
});