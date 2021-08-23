import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { FirstVisitComponent } from './first-visit/first-visit.component';
import { NewsSourcesComponent } from './news-sources/news-sources.component';
import { AddSourceComponent } from './add-source/add-source.component';
import { UpdateSourceComponent } from './update-source/update-source.component';
import { CategoriesComponent } from './categories/categories.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import { ApolloProvider } from '@apollo/client';
import { LoginVerificationComponent } from './login-verification/login-verification.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DetailsComponent,
    FirstVisitComponent,
    NewsSourcesComponent,
    AddSourceComponent,
    UpdateSourceComponent,
    CategoriesComponent,
    UpdateCategoryComponent,
    CreateCategoryComponent,
    LoginVerificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'',component:LoginComponent},
      {path:'register',component:RegisterComponent},
      {path:'home',component:HomeComponent},
      {path: 'details/:id',component: DetailsComponent},
      {path: 'firstVisit', component: FirstVisitComponent},
      {path: 'newsSources', component: NewsSourcesComponent},
      {path: 'addSource',component: AddSourceComponent},
      {path: 'updateSource/:id',component:UpdateSourceComponent},
      {path: 'categories', component:CategoriesComponent},
      {path: 'updateCategory/:id', component: UpdateCategoryComponent},
      {path: 'createCategory', component: CreateCategoryComponent},
      {path: 'loginVerification', component: LoginVerificationComponent}
    ])
  ],
  providers: [
    HttpClient,
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httplink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httplink.create({
            headers: new HttpHeaders(
              {
                Authorization: localStorage.getItem("token"),
                ContentType: 'application/json' 
              }
            ),
            uri: 'https://localhost:5002/graphql'
          })
        }
      },
      deps: [HttpLink],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
