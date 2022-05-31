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
import { TaskCreatorComponent } from './components/task-creator/task-creator.component';
import { ContentCreatorComponent } from './components/content-creator/content-creator.component';
import { ContentListComponent } from './components/content-list/content-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskCreatorComponent,
    ContentCreatorComponent,
    TaskListComponent,
    ContentListComponent,
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
