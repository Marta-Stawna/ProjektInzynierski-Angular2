import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../common/groups.service';
import { LoginService } from '../../common/login.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  private groups = [];
  private first_name;
  private last_name;
  constructor(private groupsService: GroupsService, private userService: LoginService) { }

  ngOnInit() {
    this.userService.getUserData(sessionStorage.getItem('session')).subscribe(data => {
      this.first_name = data.first_name;
      this.last_name = data.last_name;
      this.loadGroups();
    });

  }

  removeItem(name) {
    this.groupsService.removeGroup(name, this.first_name,this.last_name).subscribe(success => this.loadGroups())
  }

  loadGroups() {
    this.groupsService.getCreatorGroups(this.first_name,this.last_name).subscribe(data => {this.groups = data; console.log(this.groups, 'gropus');},
    error => console.log(error))
  }

}