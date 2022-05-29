import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ShareModule } from './module/share.module';
import { NgDragDropModule } from 'ng-drag-drop';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { TaskListComponent } from './components/task-list/task-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskListComponent,
  ],
  imports: [
    BrowserModule,
    IconsProviderModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ShareModule,
    NgDragDropModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
