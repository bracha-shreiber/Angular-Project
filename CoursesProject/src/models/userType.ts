import { Course } from "./courseType";

export class User{
    constructor(
public email:string,
public password:string,
public id:number,
public name:string,
public role: 'student' | 'teacher',
public courses:Course[]
    ){}
}