import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, en_US, NZ_ICONS, } from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';


const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
// initialize the icons of this ui framework
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

// use English
registerLocaleData(en);


@NgModule({
  imports: [
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons }
  ],
  exports: [
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class ShareModule { }
