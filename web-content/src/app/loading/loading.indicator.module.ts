import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {LoadingIndicatorComponent} from "./loading.indicator.component";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        CommonModule,
    ],
    exports: [LoadingIndicatorComponent],
    declarations: [LoadingIndicatorComponent],
    bootstrap: [],
    providers: []
})
export class LoadingIndicatorModule {
}
