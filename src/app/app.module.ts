import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ToastrModule } from 'ngx-toastr';
import { TOASTR_CONFIG } from './_core/constants/constants';
import { SliceTextPipe } from './_core/pipes/slice-text.pipe';
import { SearchChatPipe } from './_core/pipes/search-chat.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatsComponent } from './main/chats/chats.component';
import { ChatComponent } from './main/chat/chat.component';
import { EmptyChatComponent } from './main/empty-chat/empty-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatsComponent,
    ChatComponent,
    SliceTextPipe,
    SearchChatPipe,
    EmptyChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule,
    ToastrModule.forRoot(TOASTR_CONFIG),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
