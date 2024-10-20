import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../model/Task';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, TitleCasePipe, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  taskArr:Task []=[]
  newtaskArr: Task []=[]
  taskObj :Task = new Task()
  date:Date = new Date()
 
  ngOnInit(): void {
      const localData = localStorage.getItem('taskList')
      if(localData!=null){
        this.taskArr = JSON.parse(localData);
      }
      this.showAll()
  }

  onSave(){
    const isLocalPresent= localStorage.getItem('taskList')
    let maxId: number = 0
    if(isLocalPresent != null){
      const oldArr = JSON.parse(isLocalPresent)
      for(let item of oldArr){
        if(item.id > maxId){
          maxId = item.id
        }
      }
      this.taskObj.id = maxId + 1
      oldArr.push(this.taskObj);
      this.taskArr = oldArr
      localStorage.setItem('taskList',JSON.stringify(oldArr))
    }else{
      const newArr = []
      this.taskObj.id = 1
      newArr.push(this.taskObj)
      this.taskArr = newArr
      localStorage.setItem('taskList',JSON.stringify(newArr))
    }
    this.taskObj = new Task();
    this.showAll()
  }

  onDelete(item:Task) {
    const isPermit = confirm("Are you sure want's to delete?")
    const currentRecord = this.taskArr.findIndex((m)=>m.id === item.id )
    if(isPermit){
      this.taskArr.splice(currentRecord,1)
      localStorage.setItem('taskList',JSON.stringify(this.taskArr))

    }
  }

  onCheck(item:Task){
    const currentRecord = this.taskArr.find((m)=>m.id === item.id)
    if(currentRecord != undefined){
      currentRecord.status = !currentRecord.status
    }
    localStorage.setItem('taskList',JSON.stringify(this.taskArr))
  }
  
  currElement = document.getElementsByClassName('nav-link')

  showAll(){
    this.currElement[0].classList.add('active')
    this.currElement[1].classList.remove('active')
    this.currElement[2].classList.remove('active')
    const filteredArr = this.taskArr
    this.newtaskArr = filteredArr
  }
  showActive(){
    this.currElement[1].classList.add('active')
    this.currElement[2].classList.remove('active')
    this.currElement[0].classList.remove('active')
    const filteredArr = this.taskArr.filter((item)=>item.status === true)
    this.newtaskArr = filteredArr
  }
  showCompleted(){
    this.currElement[2].classList.add('active')
    this.currElement[1].classList.remove('active')
    this.currElement[0].classList.remove('active')
    const filteredArr = this.taskArr.filter((item)=>item.status === false)
    this.newtaskArr = filteredArr
  }


    
  
  
}

