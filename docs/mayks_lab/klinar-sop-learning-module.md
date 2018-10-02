---
title: 'Klinar SOP e-learning Module'
sidebarDepth: 3
---

# Klinar SOP e-learning Module

[Live Demo]() -
Project's most recent state. 

**MVP** (Minimum Viable Product) muust be ready until monday.

**Abstract**

Klinar (Klinik Araştırma) Şirketi için e-learning modulü projesinin hikayesi.

## Credits

## Content

[[toc]]

## Planning

First of all, we need to determine the necessary technology requirements. Also, we should make a brain-storm to find out what
this project might include in the end. After doing all of these, we will draw a route that we will follow. This method will enable us to
work in a more efficient manner. Beside of that, we will have a clear map or route, you name it, which will show us the big picture; project's 
overall schema. So, let's start ot discover.

- [ ] side drawer's tiles have levels. (app shell) for example: 

  <!-- - Heading 1
    - Subheading 1.1
    - Subheading 1.2
  - Heading 2
    - Subheading 2.1
    - Subheading 2.2 -->

- [ ] adjust font-size (feature)

- [ ] responsive design / mobil uyumlu

- [ ] user permissions.
- [ ] WYSIWYG Editor. (Tam olarak aradigim editoru buldum!!!) [https://surmon-china.github.io/vue-quill-editor/](https://surmon-china.github.io/vue-quill-editor/)
  - [ ] HTML Preview
- [ ] Question creator.
  - [ ] Question pool. (feature)
  - [ ] Adjust minimum score limit (feature)
- [ ] Module creator.
- [ ] Course creator.
- [ ] Exams
  - [ ] Module Exam (small amount of questions e.g. 3-5 questions)
  - [ ] General exam (An exam that contains all the passed topics)
  - [ ] Pagination.
  - [ ] keep time.
- [ ] Progress top bar
- [ ] Choose UI Library (better to use Vueitfy since we already have ... I don't sometimes it feels way too slow... Actually it is pretty fast. The only downside of this library that it hasn't got taste. I need to re-design it. )
- [ ] Tag: How much time it will probably take. Like in Medium. It's a very tiny detail but it shines. 
- [ ] Dynamic routes. **!important** 
  - [ ] Paths must be hashed. So that you can control overall routing more flexible.
  * base_url/home
  * base_url/new_course
  * base_url/c/:course_name
  * base_url/c/sop-for-beginners/learn/:module_name
  * base_url/c/sop-for-beginners/learn/title-one/lecture/124ljh1234lj1
  * base_url/c/sop-for-beginners/create/title-one/lecture/124ljh1234lj1/questions?index=2
  * base_url/c/sop-for-beginners/learn/title-one/lecture/:lecture_id
  * base_url/c/sop-for-beginners/learn/title-one/lecture/124ljh1234lj1
  * base_url/c/sop-for-beginners/learn/title-one/lecture/124ljh1234lj1/questions?index=3
  * base_url/c/sop-for-beginners/learn/title-one/questions?index=32
- [ ] A temporary back-end solution for development. 
  * (Firebase is the most powerful and also most rapid choice it seems)
  * Or Flask, since it's easy to start with. But then we won't be able to serve it live.


  falan filan...

My future self is telling me something, and I try to decode what he is saying. It's not obvious that he tells
but if you listen to it you can start to tell/sing with him.

O zamanlar kütüphaneler vardı. Mesela parça kütüphaneleri. Bu kütüphanelerden gidip istediğiniz parçaları alır gerekli yerlerde işe koşardınız. 
Bu, o zamanlar, insanlara oldukça vakit kazandırdı. Hele ki kullandığın diğer araçlarla uyum içinde çalışan bir kütüphanen varsa deyme keyfine. 